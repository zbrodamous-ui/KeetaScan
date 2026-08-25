const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

let lastActivitySignature = "";

function formatTokenAmount(amount, decimals) {
    const rawAmount = BigInt(amount);
    const divisor = 10n ** BigInt(decimals);

    const wholePart = rawAmount / divisor;
    const fractionalPart = rawAmount % divisor;

    const fractionalText =
        fractionalPart
            .toString()
            .padStart(decimals, "0")
            .replace(/0+$/, "");

    return fractionalText
        ? `${wholePart}.${fractionalText}`
        : wholePart.toString();
}

searchButton.addEventListener("click", function () {
    const searchText = searchInput.value.trim();

    console.log("Search:", searchText);

    if (searchText === "") {
        console.log("Please enter something to search.");
        return;
    }

   if (searchText.startsWith("keeta_")) {

    window.location.href =
        `address.html?address=${encodeURIComponent(searchText)}`;

    return;
}   // <-- This brace is missing

// Existing dropdown logic can stay below for now.
if (searchType.value === "transaction") {
        window.location.href =
            `transaction.html?search=${encodeURIComponent(searchText)}`;
    } else if (searchType.value === "address") {
        window.location.href =
            `address.html?address=${encodeURIComponent(searchText)}`;
    } else if (searchType.value === "block") {
        window.location.href =
            `block.html?hash=${encodeURIComponent(searchText)}`;
    } else if (searchType.value === "asset") {
        window.location.href =
            `asset.html?asset=${encodeURIComponent(searchText)}`;
    }
});
 


console.log("Keeta SDK:", KeetaNet);

const client = KeetaNet.Client.fromNetwork("main");
function loadKnownAssets() {
    const saved =
        localStorage.getItem(
            "keetascan_known_assets"
        );

    return saved
        ? JSON.parse(saved)
        : [];
}

function saveKnownAssets(assets) {
    localStorage.setItem(
        "keetascan_known_assets",
        JSON.stringify(assets)
    );
}
function loadLastAssetScan() {
    return localStorage.getItem(
        "keetascan_last_asset_scan"
    );
}

function saveLastAssetScan(blockHash) {
    localStorage.setItem(
        "keetascan_last_asset_scan",
        blockHash
    );
}
let previousTransactionCount = null;
let previousTransactionTime = null;

console.log("Keeta Client:", client);

console.log(client);

client.getVersion()
    .then((version) => {
        console.log("Keeta Network Version:", version);
    })
    .catch((error) => {
        console.error("Keeta connection error:", error);
    });

function updateNetworkStatus() {
    client.getNetworkStatus()
        .then((status) => {
            console.log("NETWORK STATUS FOR ASSETS:", status);

        const onlineRepresentatives = status.filter((representative) => {
            return representative.online === true;
        });

        const bestRepresentative = onlineRepresentatives.reduce(
            (currentBest, representative) => {

                if (
                    !currentBest ||
                    representative.ledger.blockCount >
                    currentBest.ledger.blockCount
                ) {
                    return representative;
                }

                return currentBest;
            },
            null
        );

        const ledger = bestRepresentative.ledger;
const currentTransactionCount =
    Number(ledger.transactionCount);
const currentTransactionTime =
    Date.now();

if (
    previousTransactionCount !== null &&
    previousTransactionTime !== null
) {
    const transactionDifference =
        currentTransactionCount -
        previousTransactionCount;

    const secondsDifference =
        (currentTransactionTime -
            previousTransactionTime) / 1000;

    const tps =
        secondsDifference > 0
            ? transactionDifference /
              secondsDifference
            : 0;

    document.getElementById(
        "networkTPS"
    ).textContent =
        tps.toFixed(2);
}

previousTransactionCount =
    currentTransactionCount;

previousTransactionTime =
    currentTransactionTime;

        console.log("Best Representative:", bestRepresentative);

        document.getElementById("latestBlock").textContent =
            ledger.blockCount.toLocaleString();

        document.getElementById("totalTransactions").textContent =
            ledger.transactionCount.toLocaleString();
    })
    .catch((error) => {
        console.error("Status Error:", error);
    });
}
async function discoverMoreAssets() {
    try {
        const history =
            await client.getHistory(
                null,
                { depth: 50 }
            );

        const knownAssets =
            new Set(
                loadKnownAssets()
            );

        const discoveryBlocks =
    history
        .flatMap(
            (entry) =>
                entry.voteStaple.blocks
        )
        .sort(
            (a, b) =>
                b.date - a.date
        );

const lastAssetScan =
    loadLastAssetScan();

for (const block of discoveryBlocks) {
    const blockHash =
        block.hash.toString();

    if (
        lastAssetScan &&
        blockHash === lastAssetScan
    ) {
        break;
    }

    block.operations.forEach(
        (operation) => {
            if (operation.token) {
                knownAssets.add(
                    operation.token
                        .publicKeyString
                        .toString()
                );
            }
        }
    );
}

if (discoveryBlocks.length > 0) {
    saveLastAssetScan(
        discoveryBlocks[0]
            .hash
            .toString()
    );
}
        const knownAssetList =
            [...knownAssets];

        saveKnownAssets(
            knownAssetList
        );

        document.getElementById(
            "totalAssets"
        ).textContent =
            knownAssetList.length
                .toLocaleString();

        console.log(
            "Known assets discovered:",
            knownAssetList.length
        );
    } catch (error) {
        console.warn(
            "Asset discovery failed:",
            error
        );
    }
}
async function updateLatestBlocks() {
    try {
        const history = await client.getHistory(null, { depth: 3 });
       
        const latestBlocks = history
            .flatMap((entry) => entry.voteStaple.blocks)
            .sort((a, b) => b.date - a.date)
            .slice(0, 3);
            const knownAssets =
    new Set(
        loadKnownAssets()
    );

latestBlocks.forEach((block) => {
    block.operations.forEach((operation) => {
        if (operation.token) {
            knownAssets.add(
                operation.token.publicKeyString.toString()
            );
        }
    });
});

const knownAssetList =
    [...knownAssets];

saveKnownAssets(
    knownAssetList
);

document.getElementById(
    "totalAssets"
).textContent =
    knownAssetList.length.toLocaleString();

if (latestBlocks.length >= 2) {
    const newestBlock =
        latestBlocks[0];

    const oldestBlock =
        latestBlocks[latestBlocks.length - 1];

    const totalOperations =
        latestBlocks.reduce(
            (total, block) =>
                total + block.operations.length,
            0
        );

    const elapsedSeconds =
        (
            new Date(newestBlock.date).getTime() -
            new Date(oldestBlock.date).getTime()
        ) / 1000;

    const recentTPS =
        elapsedSeconds > 0
            ? totalOperations / elapsedSeconds
            : 0;

    document.getElementById(
        "networkTPS"
    ).textContent =
        recentTPS.toFixed(2);
}

const activitySignature =
    latestBlocks
        .map((block) => block.hash.toString())
        .join("|");

if (activitySignature === lastActivitySignature) {
    return;
}

lastActivitySignature = activitySignature;

       const latestActivityList =
   document.getElementById("latestActivityList");

latestActivityList.innerHTML = "";

        latestBlocks.forEach((block) => {
            

           
     block.operations.forEach(async (operation, operationIndex) => {
    let tokenInfo = null;
    let formattedAmount =
        operation.amount?.toString() || "Not available";
    let tokenName = "";

  if (operation.token) {
    tokenInfo =
        await client.getAccountInfo(operation.token);

    if (tokenInfo?.info?.metadata) {
        const metadata =
            JSON.parse(atob(tokenInfo.info.metadata));

        formattedAmount =
            formatTokenAmount(
                operation.amount,
                metadata.decimalPlaces ?? 18
            );
    }

    tokenName =
        tokenInfo?.info?.name || "";

    if (
        operation.amount &&
        formattedAmount === operation.amount.toString()
    ) {
        formattedAmount =
            formatTokenAmount(
                operation.amount,
                18
            );
    }
}
if (
    formattedAmount !== "Not available" &&
    formattedAmount.includes(".")
) {
    const numericAmount =
        Number(formattedAmount);

    if (!Number.isNaN(numericAmount)) {
        formattedAmount =
            numericAmount.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 6
            });
    }
}
    const transactionRow =
        document.createElement("div");

transactionRow.className =
    "activity-row transaction-row";

    const operationType =
        operation.constructor.name
            .replace("src_client_BlockOperation", "");

    const recipient =
        operation.to?.publicKeyString?.toString?.() ||
        "Not available";

const shortRecipient =
    recipient === "Not available"
        ? recipient
        : `${recipient.slice(0, 14)}...${recipient.slice(-6)}`;
    transactionRow.innerHTML = `
    <span>
    <a href="block.html?hash=${encodeURIComponent(block.hash.toString())}">
        ${block.hash.toString().slice(0, 8)}...
    </a>
</span>

    <span>${timeAgo(block.date)}</span>

    <span>${operationType}</span>

    <span>
    ${
        block.account?.publicKeyString?.toString?.()
            ? `<a href="address.html?address=${encodeURIComponent(
                  block.account.publicKeyString.toString()
              )}">
                  ${block.account.publicKeyString.toString().slice(0, 12)}...
               </a>`
            : "Not available"
    }
</span>
   <span>
${
    recipient !== "Not available"
        ? `<a href="address.html?address=${encodeURIComponent(recipient)}">
                ${shortRecipient}
           </a>`
        : "Not available"
}
</span>

    <span>${formattedAmount} ${tokenName}</span>
`;
    transactionRow.addEventListener("click", () => {
        window.location.href =
            `transaction.html?block=${encodeURIComponent(block.hash.toString())}&operation=${operationIndex}`;
    });

   latestActivityList.appendChild(transactionRow);
});
        });
    } catch (error) {
        console.error("History Error:", error);
    }
}

updateNetworkStatus();

setInterval(updateNetworkStatus, 5000);

updateLatestBlocks();

discoverMoreAssets();
setInterval(
    discoverMoreAssets,
    60 * 1000
);
setInterval(updateLatestBlocks, 1000);

function timeAgo(timestamp) {

    const seconds =
        Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

    if (seconds < 60) {
        return `${seconds} sec ago`;
    }

    const minutes =
        Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours =
        Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days =
        Math.floor(hours / 24);

    return `${days} day${days === 1 ? "" : "s"} ago`;
}
