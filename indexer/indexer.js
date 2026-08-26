import fs from "fs";
import * as KeetaNet from "@keetanetwork/keetanet-client";

const client =
    KeetaNet.Client.fromNetwork("main");

const stateFile =
    "indexer/state.json";

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

let discoveredAccounts;

let discoveredTransfers;
async function processHistoryEntry(entry) {
    const blocks =
        entry.voteStaple.blocks;

const newestBlock =
    blocks[blocks.length - 1];

    for (const block of blocks) {
        const sender =
            block.account
                ?.publicKeyString
                ?.toString?.();

        if (sender) {
           discoveredAccounts.add(sender);
        }

        for (const operation of block.operations) {
            const recipient =
                operation.to
                    ?.publicKeyString
                    ?.toString?.();

            if (recipient) {
                discoveredAccounts.add(recipient);
            }

            if (
                operation.token &&
                operation.amount
            ) {
                discoveredTransfers++;
            }
        }
    }

state.accountsFound =
    discoveredAccounts.size;

state.discoveredAccounts =
    [...discoveredAccounts];

state.transfersFound =
    discoveredTransfers;

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
        discoveredAccounts: [],
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
discoveredAccounts =
    new Set(
        state.discoveredAccounts || []
    );

discoveredTransfers =
    state.transfersFound || 0;

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

const batchesToIndex = 5;

for (
    let batchNumber = 1;
    batchNumber <= batchesToIndex;
    batchNumber++
) {
    console.log(
        `Indexing batch ${batchNumber} of ${batchesToIndex}...`
    );

   const historyFound =
    await testHistoryFetch();

if (!historyFound) {
    console.log(
        "Indexer reached the end of history."
    );

    break;
}
}