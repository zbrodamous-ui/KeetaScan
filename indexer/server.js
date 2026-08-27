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

    const accounts =
        database.prepare(`
            SELECT
                address,
                first_seen_timestamp
            FROM accounts
            ORDER BY first_seen_timestamp DESC
            LIMIT ?
        `).all(limit);

    sendJson(
        response,
        200,
        accounts
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