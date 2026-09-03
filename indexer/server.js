import http from "node:http";
import { DatabaseSync } from "node:sqlite";

const database =
    new DatabaseSync(
        "./indexer/keetascan.db",
        {
            readOnly: true
        }
    );

database.exec(`
    PRAGMA busy_timeout = 5000;
`);

const port = 3000;

const marketCache = new Map();

const marketCacheDuration = 60 * 1000;

function isAllowedLocalOrigin(origin) {
    if (!origin) {
        return false;
    }

    try {
        const parsedOrigin =
            new URL(origin);

        return (
            (
                parsedOrigin.hostname === "localhost" ||
                parsedOrigin.hostname === "127.0.0.1"
            ) &&
            (
                parsedOrigin.protocol === "http:" ||
                parsedOrigin.protocol === "https:"
            )
        );
    } catch {
        return false;
    }
}

function sendJson(
    response,
    statusCode,
    data
) {
    const headers = {
        "Content-Type":
            "application/json; charset=utf-8",
        "Cache-Control":
            "no-store",
        "X-Content-Type-Options":
            "nosniff",
        "Referrer-Policy":
            "no-referrer",
        "Content-Security-Policy":
            "default-src 'none'; frame-ancestors 'none'"
    };

    if (response.keetaViewAllowedOrigin) {
        headers["Access-Control-Allow-Origin"] =
            response.keetaViewAllowedOrigin;
        headers.Vary = "Origin";
    }

    response.writeHead(
        statusCode,
        headers
    );

    response.end(
        JSON.stringify(data)
    );
}

const server =
    http.createServer(
        async (request, response) => {
            const requestOrigin =
                request.headers.origin;

            response.keetaViewAllowedOrigin =
                isAllowedLocalOrigin(
                    requestOrigin
                )
                    ? requestOrigin
                    : null;

            const url =
                new URL(
                    request.url,
                    "http://127.0.0.1"
                );

            if (
                request.method === "GET" &&
                url.pathname === "/api/market"
            ) {
                const requestedRange =
                    url.searchParams.get(
                        "range"
                    ) || "1d";

                const rangeSettings = {
                    "1h": {
                        days: 1,
                        duration:
                            60 * 60 * 1000
                    },
                    "1d": {
                        days: 1,
                        duration:
                            24 * 60 * 60 * 1000
                    },
                    "1w": {
                        days: 7,
                        duration:
                            7 * 24 * 60 * 60 * 1000
                    },
                    "1m": {
                        days: 30,
                        duration:
                            30 * 24 * 60 * 60 * 1000
                    }
                };

                const range =
                    rangeSettings[
                        requestedRange
                    ]
                        ? requestedRange
                        : "1d";

                const settings =
                    rangeSettings[range];

                const supportedCurrencies = [
                    "usd",
                    "eur",
                    "gbp",
                    "cad",
                    "aud",
                    "jpy"
                ];

                const requestedCurrency =
                    url.searchParams.get(
                        "currency"
                    )?.toLowerCase() || "usd";

                const currency =
                    supportedCurrencies.includes(
                        requestedCurrency
                    )
                        ? requestedCurrency
                        : "usd";

                const cacheKey =
                    `${range}:${currency}`;

                const cached =
                    marketCache.get(cacheKey);

                if (
                    cached?.data &&
                    Date.now() <
                        cached.expiresAt
                ) {
                    sendJson(
                        response,
                        200,
                        cached.data
                    );

                    return;
                }

                try {
                    const [
                        coinResponse,
                        chartResponse
                    ] = await Promise.all([
                        fetch(
                            "https://api.coingecko.com/api/v3/coins/keeta?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
                        ),
                        fetch(
                            `https://api.coingecko.com/api/v3/coins/keeta/market_chart?vs_currency=${currency}&days=${settings.days}`
                        )
                    ]);

                    if (
                        !coinResponse.ok ||
                        !chartResponse.ok
                    ) {
                        throw new Error(
                            "CoinGecko did not return KTA market data."
                        );
                    }

                    const coin =
                        await coinResponse.json();

                    const chart =
                        await chartResponse.json();

                    const market =
                        coin.market_data || {};

                    const cutoff =
                        Date.now() -
                        settings.duration;

                    const prices =
                        Array.isArray(
                            chart.prices
                        )
                            ? chart.prices.filter(
                                (point) =>
                                    Number(
                                        point?.[0]
                                    ) >= cutoff
                            )
                            : [];

                    const volumes =
                        Array.isArray(
                            chart.total_volumes
                        )
                            ? chart.total_volumes.filter(
                                (point) =>
                                    Number(
                                        point?.[0]
                                    ) >= cutoff
                            )
                            : [];

                    const marketData = {
                        range,
                        currency,
                        price:
                            market.current_price?.[currency] ??
                            null,
                        priceChange24h:
                            market.price_change_percentage_24h ??
                            null,
                        marketCap:
                            market.market_cap?.[currency] ??
                            null,
                        volume24h:
                            market.total_volume?.[currency] ??
                            null,
                        circulatingSupply:
                            market.circulating_supply ??
                            null,
                        allTimeHigh:
                            market.ath?.[currency] ??
                            null,
                        prices,
                        volumes,
                        updatedAt:
                            coin.last_updated ||
                            new Date().toISOString(),
                        source:
                            "CoinGecko"
                    };

                    marketCache.set(
                        cacheKey,
                        {
                            data:
                                marketData,
                            expiresAt:
                                Date.now() +
                                marketCacheDuration
                        }
                    );

                    sendJson(
                        response,
                        200,
                        marketData
                    );
                } catch (error) {
                    console.error(
                        "Market data error:",
                        error
                    );

                    sendJson(
                        response,
                        502,
                        {
                            error:
                                "KTA market data is temporarily unavailable."
                        }
                    );
                }

                return;
            }

            if (
                request.method === "GET" &&
                url.pathname === "/api/blocks"
            ) {
                const requestedLimit =
                    Number(
                        url.searchParams.get(
                            "limit"
                        )
                    );

                const limit =
                    Number.isInteger(
                        requestedLimit
                    ) &&
                    requestedLimit > 0
                        ? Math.min(
                            requestedLimit,
                            100
                        )
                        : 10;

                        const requestedOffset =
    Number(
        url.searchParams.get(
            "offset"
        )
    );

const offset =
    Number.isInteger(
        requestedOffset
    ) &&
    requestedOffset >= 0
        ? requestedOffset
        : 0;

                const blocks =
                    database.prepare(`
                        SELECT
                            hash,
                            timestamp,
                            operation_count
                        FROM blocks
                       ORDER BY timestamp DESC
                            LIMIT ?
                            OFFSET ?
                            `).all(
                                limit,
                                offset
                            );

                sendJson(
                    response,
                    200,
                    blocks
                );

                return;
            }

            if (
                request.method === "GET" &&
                url.pathname === "/api/transaction"
            ) {
                const blockHash =
                    url.searchParams.get("block");

                const operationIndex =
                    Number(
                        url.searchParams.get(
                            "operation"
                        )
                    );

                if (
                    !blockHash ||
                    !Number.isInteger(operationIndex) ||
                    operationIndex < 0
                ) {
                    sendJson(
                        response,
                        400,
                        {
                            error:
                                "A block hash and operation index are required."
                        }
                    );

                    return;
                }

                const transfer =
                    database.prepare(`
                        SELECT
                            block_hash,
                            operation_index,
                            sender,
                            recipient,
                            token,
                            amount,
                            timestamp
                        FROM transfers
                        WHERE block_hash = ?
                          AND operation_index = ?
                        LIMIT 1
                    `).get(
                        blockHash,
                        operationIndex
                    );

                if (!transfer) {
                    sendJson(
                        response,
                        404,
                        {
                            error:
                                "Indexed transaction not found."
                        }
                    );

                    return;
                }

                sendJson(
                    response,
                    200,
                    transfer
                );

                return;
            }

            if (
    request.method === "GET" &&
    url.pathname === "/api/transfers"
) {
    const requestedLimit =
        Number(
            url.searchParams.get(
                "limit"
            )
        );

    const limit =
        Number.isInteger(
            requestedLimit
        ) &&
        requestedLimit > 0
            ? Math.min(
                requestedLimit,
                100
            )
            : 10;

    const address =
        url.searchParams.get(
            "address"
        );

    const transfers =
        address
            ? database.prepare(`
                SELECT
                    block_hash,
                    operation_index,
                    sender,
                    recipient,
                    token,
                    amount,
                    timestamp
                FROM transfers
                WHERE sender = ?
                   OR recipient = ?
                ORDER BY timestamp DESC
                LIMIT ?
            `).all(
                address,
                address,
                limit
            )
            : database.prepare(`
                SELECT
                    block_hash,
                    operation_index,
                    sender,
                    recipient,
                    token,
                    amount,
                    timestamp
                FROM transfers
                ORDER BY timestamp DESC
                LIMIT ?
            `).all(limit);

    sendJson(
        response,
        200,
        transfers
    );

    return;
}

if (
    request.method === "GET" &&
    url.pathname === "/api/accounts"
) {
    const requestedLimit =
        Number(
            url.searchParams.get(
                "limit"
            )
        );

    const limit =
        Number.isInteger(
            requestedLimit
        ) &&
        requestedLimit > 0
            ? Math.min(
                requestedLimit,
                100
            )
            : 10;

    const requestedOffset =
        Number(
            url.searchParams.get(
                "offset"
            )
        );

    const offset =
        Number.isInteger(
            requestedOffset
        ) &&
        requestedOffset >= 0
            ? requestedOffset
            : 0;

    const accounts =
        database.prepare(`
            SELECT
                address,
                first_seen_timestamp
            FROM accounts
            ORDER BY first_seen_timestamp DESC
            LIMIT ?
            OFFSET ?
        `).all(
            limit,
            offset
        );

    sendJson(
        response,
        200,
        accounts
    );

    return;
}
            if (
                request.method === "GET" &&
                url.pathname === "/api/analytics"
            ) {
                const blockSummary =
                    database.prepare(`
                        SELECT
                            COUNT(*) AS blocks,
                            COALESCE(
                                SUM(operation_count),
                                0
                            ) AS operations,
                            COALESCE(
                                AVG(operation_count),
                                0
                            ) AS average_operations,
                            MIN(timestamp) AS first_timestamp,
                            MAX(timestamp) AS latest_timestamp
                        FROM blocks
                    `).get();

                const accountTotal =
                    database.prepare(`
                        SELECT COUNT(*) AS total
                        FROM accounts
                    `).get().total;

                const transferTotal =
                    database.prepare(`
                        SELECT COUNT(*) AS total
                        FROM transfers
                    `).get().total;

                const topSenders =
                    database.prepare(`
                        SELECT
                            sender AS address,
                            COUNT(*) AS total
                        FROM transfers
                        WHERE sender IS NOT NULL
                        GROUP BY sender
                        ORDER BY total DESC
                        LIMIT 100
                    `).all();

                const topRecipients =
                    database.prepare(`
                        SELECT
                            recipient AS address,
                            COUNT(*) AS total
                        FROM transfers
                        WHERE recipient IS NOT NULL
                        GROUP BY recipient
                        ORDER BY total DESC
                        LIMIT 100
                    `).all();

                const tokenActivity =
                    database.prepare(`
                        SELECT
                            token,
                            COUNT(*) AS transfers
                        FROM transfers
                        WHERE token IS NOT NULL
                        GROUP BY token
                        ORDER BY transfers DESC
                        LIMIT 100
                    `).all();

                const activityNewestFirst =
                    database.prepare(`
                        SELECT
                            substr(timestamp, 1, 10) AS day,
                            COUNT(*) AS transfers
                        FROM transfers
                        GROUP BY day
                        ORDER BY day DESC
                        LIMIT 14
                    `).all();

                const recentTransfers =
                    database.prepare(`
                        SELECT
                            block_hash,
                            operation_index,
                            sender,
                            recipient,
                            token,
                            amount,
                            timestamp
                        FROM transfers
                        ORDER BY timestamp DESC
                        LIMIT 100
                    `).all();

                sendJson(
                    response,
                    200,
                    {
                        summary: {
                            blocks:
                                blockSummary.blocks,
                            operations:
                                blockSummary.operations,
                            transfers:
                                transferTotal,
                            accounts:
                                accountTotal,
                            averageOperations:
                                Number(
                                    blockSummary
                                        .average_operations
                                ),
                            firstTimestamp:
                                blockSummary
                                    .first_timestamp,
                            latestTimestamp:
                                blockSummary
                                    .latest_timestamp
                        },
                        activity:
                            activityNewestFirst
                                .reverse(),
                        topSenders,
                        topRecipients,
                        tokenActivity,
                        recentTransfers
                    }
                );

                return;
            }

            if (
                request.method === "GET" &&
                url.pathname === "/api/status"
            ) {
                const blocks =
                    database.prepare(`
                        SELECT COUNT(*) AS total
                        FROM blocks
                    `).get().total;

                const accounts =
                    database.prepare(`
                        SELECT COUNT(*) AS total
                        FROM accounts
                    `).get().total;

                const transfers =
                    database.prepare(`
                        SELECT COUNT(*) AS total
                        FROM transfers
                    `).get().total;

                sendJson(
                    response,
                    200,
                    {
                        blocks,
                        accounts,
                        transfers
                    }
                );

                return;
            }

            sendJson(
                response,
                404,
                {
                    error:
                        "Route not found"
                }
            );
        }
    );

server.listen(
    port,
    "127.0.0.1",
    () => {
        console.log(
            `KeetaView API running at http://127.0.0.1:${port}`
        );
    }
);
