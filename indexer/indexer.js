import fs from "fs";
import { DatabaseSync } from "node:sqlite";
import * as KeetaNet from "@keetanetwork/keetanet-client";

const client =
    KeetaNet.Client.fromNetwork("main");

const stateFile =
    "indexer/state.json";

    const databaseFile =
    "./indexer/keetascan.db";

    const databaseAlreadyExisted =
    fs.existsSync(databaseFile);

const database =
    new DatabaseSync(databaseFile);

    database.exec(`
    CREATE TABLE IF NOT EXISTS blocks (
        hash TEXT PRIMARY KEY,
        timestamp TEXT,
        operation_count INTEGER
    )
`);
database.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
        address TEXT PRIMARY KEY,
        first_seen_timestamp TEXT NOT NULL
    )
`);
database.exec(`
    CREATE TABLE IF NOT EXISTS transfers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        block_hash TEXT NOT NULL,
        operation_index INTEGER NOT NULL,
        sender TEXT,
        recipient TEXT,
        token TEXT,
        amount TEXT,
        timestamp TEXT NOT NULL,
        UNIQUE(block_hash, operation_index)
    )
`);

database.exec(`
    CREATE INDEX IF NOT EXISTS
        blocks_by_timestamp
    ON blocks(timestamp);

    CREATE INDEX IF NOT EXISTS
        transfers_by_timestamp
    ON transfers(timestamp);

    CREATE INDEX IF NOT EXISTS
        transfers_by_sender
    ON transfers(sender);

    CREATE INDEX IF NOT EXISTS
        transfers_by_recipient
    ON transfers(recipient);

    CREATE INDEX IF NOT EXISTS
        transfers_by_token
    ON transfers(token);
`);

const insertBlock =
    database.prepare(`
        INSERT OR REPLACE INTO blocks (
            hash,
            timestamp,
            operation_count
        )
        VALUES (?, ?, ?)
    `);

    const insertAccount =
    database.prepare(`
        INSERT INTO accounts (
    address,
    first_seen_timestamp
)
VALUES (?, ?)
ON CONFLICT(address) DO UPDATE SET
    first_seen_timestamp = MIN(
        accounts.first_seen_timestamp,
        excluded.first_seen_timestamp
    )
    `);

    const insertTransfer =
    database.prepare(`
        INSERT OR REPLACE INTO transfers (
            block_hash,
            operation_index,
            sender,
            recipient,
            token,
            amount,
            timestamp
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const countAccounts =
    database.prepare(`
        SELECT COUNT(*) AS total
        FROM accounts
    `);

const countTransfers =
    database.prepare(`
        SELECT COUNT(*) AS total
        FROM transfers
    `);

console.log("KeetaView Indexer starting...");

async function testConnection() {
    const status =
        await client.getNetworkStatus();

    const blockCounts =
        status.map(
            node => node.ledger.blockCount
        );

    const latestBlock =
        Math.max(...blockCounts);

    console.log(
        "Keeta latest block:",
        latestBlock
    );

    console.log(
        "KeetaView indexed through:",
        state.lastIndexedBlockHash
    );
}
async function testHistoryFetch() {
    const batchStart =
        performance.now();

   const history =
    await client.getHistory(
        null,
        {
            startBlocksHash:
            state.historyCursor ||
            undefined,
            depth: 100
        }
    );
    if (history.length === 0) {
    console.log(
        "No more history entries."
    );

    return false;
}
       const lastVoteStaple =
    history[history.length - 1].voteStaple;

    const nextHistoryCursor =
    lastVoteStaple.blocksHash.toString();

    state.historyCursor =
    nextHistoryCursor;

console.log(
    "Next history cursor:",
    nextHistoryCursor
);

for (const entry of history) {
    await processHistoryEntry(entry);
}

fs.writeFileSync(
    stateFile,
    JSON.stringify(state, null, 2)
);

console.log(
    "Indexer progress saved."
);
console.log(
    "History entries:",
    history.length
);

console.log(
    "Accounts discovered:",
    state.accountsFound
);
console.log(
    "Transfers discovered:",
    state.transfersFound
);
const batchEnd =
    performance.now();

console.log(
    "Batch time:",
    `${((batchEnd - batchStart) / 1000).toFixed(2)} seconds`
);
return true;
}


async function refreshLatestHistory() {
    const refreshStart =
        performance.now();

    const history =
        await client.getHistory(
            null,
            {
                depth: 100
            }
        );

    if (history.length === 0) {
        console.log(
            "No latest history entries were returned."
        );

        return false;
    }

    const orderedHistory =
        [...history].sort(
            (first, second) =>
                first.voteStaple.timestamp() -
                second.voteStaple.timestamp()
        );

    for (const entry of orderedHistory) {
        await processHistoryEntry(entry);
    }

    const newestEntry =
        orderedHistory[
            orderedHistory.length - 1
        ];

    const newestBlocks =
        newestEntry.voteStaple.blocks;

    const newestBlock =
        newestBlocks[
            newestBlocks.length - 1
        ];

    if (newestBlock?.hash) {
        state.lastIndexedBlockHash =
            newestBlock.hash.toString();
    }

    state.lastTipRefreshAt =
        new Date().toISOString();

    fs.writeFileSync(
        stateFile,
        JSON.stringify(state, null, 2)
    );

    console.log(
        "Latest network history refreshed.",
        {
            entries: history.length,
            latestTimestamp:
                newestEntry.voteStaple
                    .timestamp()
                    .toISOString(),
            milliseconds:
                Math.round(
                    performance.now() -
                    refreshStart
                )
        }
    );

    return true;
}

async function processHistoryEntry(entry) {
    const blocks =
        entry.voteStaple.blocks;

const newestBlock =
    blocks[blocks.length - 1];

    const timestamp =
    entry.voteStaple
        .timestamp()
        .toISOString();

    for (const block of blocks) {

           insertBlock.run(
        block.hash.toString(),
        timestamp,
        block.operations.length
    );
        const sender =
            block.account
                ?.publicKeyString
                ?.toString?.();

        if (sender) {
           

           insertAccount.run(
                sender,
                timestamp
            );
        }

       for (
    const [operationIndex, operation]
    of block.operations.entries()
) {
            const recipient =
                operation.to
                    ?.publicKeyString
                    ?.toString?.();

                    const token =
    operation.token
        ?.publicKeyString
        ?.toString?.();

            if (recipient) {
                

                insertAccount.run(
                    recipient,
                    timestamp
                );
            }

           if (
    token &&
    operation.amount &&
    block.hash
) {
    insertTransfer.run(
        block.hash.toString(),
        operationIndex,
        sender || null,
        recipient || null,
        token,
        operation.amount.toString(),
        timestamp
    );

}
        }
    }

state.accountsFound =
    Number(
        countAccounts.get().total
    );

delete state.discoveredAccounts;

state.transfersFound =
    Number(
        countTransfers.get().total
    );

    if (newestBlock?.hash) {
    state.lastIndexedBlockHash =
        newestBlock.hash.toString();
}
}

let state;

if (fs.existsSync(stateFile)) {
    state =
        JSON.parse(
            fs.readFileSync(
                stateFile,
                "utf8"
            )
        );

    console.log(
        "Existing indexer state loaded."
    );
} else {
    state = {
        historyCursor: null,
        lastIndexedBlockHash: null,
        accountsFound: 0,
        transfersFound: 0
    };

    console.log(
    "Indexer totals:",
    {
        accountsFound:
            state.accountsFound,
        transfersFound:
            state.transfersFound
    }
);

}

    if (!databaseAlreadyExisted) {
    console.log(
        "New database detected. Resetting index position."
    );

    state.historyCursor = null;
    state.lastIndexedBlockHash = null;
    state.accountsFound = 0;
    state.transfersFound = 0;

}

fs.writeFileSync(
    stateFile,
    JSON.stringify(state, null, 2)
);

console.log(
    "Indexer state saved."
);
console.log(
    "Indexer totals:",
    {
        accountsFound:
            state.accountsFound,
        transfersFound:
            state.transfersFound
    }
);

await testConnection();

const watchMode =
    process.argv.includes("--watch");

const requestedBatchCount =
    Number(
        process.argv.find(
            (argument) =>
                /^\d+$/.test(argument)
        )
    );

const batchesToIndex =
    Number.isInteger(requestedBatchCount) &&
    requestedBatchCount > 0
        ? requestedBatchCount
        : 5;

await refreshLatestHistory();

for (
    let batchNumber = 1;
    batchNumber <= batchesToIndex;
    batchNumber++
) {
    console.log(
        `Backfilling batch ${batchNumber} of ${batchesToIndex}...`
    );

    const historyFound =
        await testHistoryFetch();

    if (!historyFound) {
        console.log(
            "Indexer reached the end of historical data."
        );

        break;
    }
}

if (watchMode) {
    const refreshInterval =
        60 * 1000;

    console.log(
        "Live indexer is watching for new history every 60 seconds."
    );

    while (true) {
        await new Promise(
            (resolve) =>
                setTimeout(
                    resolve,
                    refreshInterval
                )
        );

        try {
            await refreshLatestHistory();
        } catch (error) {
            console.error(
                "Latest history refresh failed:",
                error
            );
        }
    }
}

database.close();
process.exit(0);
