import http from "node:http";
import { DatabaseSync } from "node:sqlite";

const database =
    new DatabaseSync(
        "./indexer/keetascan.db",
        {
            readOnly: true
        }
    );

const port = 3000;

function sendJson(
    response,
    statusCode,
    data
) {
    response.writeHead(
        statusCode,
        {
            "Content-Type":
                "application/json",
            "Access-Control-Allow-Origin":
                "*"
        }
    );

    response.end(
        JSON.stringify(data)
    );
}

const server =
    http.createServer(
        (request, response) => {
            const url =
                new URL(
                    request.url,
                    `http://${request.headers.host}`
                );

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
                        LIMIT 8
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
                        LIMIT 8
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
                        LIMIT 8
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
                        LIMIT 8
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
    () => {
        console.log(
            `KeetaScan API running at http://localhost:${port}`
        );
    }
);