const client =
    KeetaNet.Client.fromNetwork("main");

function loadDiscoveredAccounts() {
    const saved =
        localStorage.getItem(
            "keetascan_discovered_accounts"
        );

    return saved
        ? JSON.parse(saved)
        : [];
}

function saveDiscoveredAccounts(accounts) {
    localStorage.setItem(
        "keetascan_discovered_accounts",
        JSON.stringify(accounts)
    );

}
    async function discoverMoreAccounts() {
    try {
        const history =
            await client.getHistory(
                null,
                { depth: 250 }
            );

        const discovered =
            new Set(
                loadDiscoveredAccounts()
            );

        history
            .flatMap(
                (entry) =>
                    entry.voteStaple.blocks
            )
            .forEach((block) => {
                const sender =
                    block.account
                        ?.publicKeyString
                        ?.toString?.();

                if (sender) {
                    discovered.add(sender);
                }

                block.operations.forEach(
                    (operation) => {
                        const recipient =
                            operation.to
                                ?.publicKeyString
                                ?.toString?.();

                        if (recipient) {
                            discovered.add(
                                recipient
                            );
                        }
                    }
                );
            });

        const accountList =
            [...discovered];

        saveDiscoveredAccounts(
            accountList
        );

        console.log(
            "Deep discovery remembered:",
            accountList.length
        );
    } catch (error) {
        console.warn(
            "Deep account discovery failed:",
            error
        );
    }
}
async function loadAnalytics() {
    try {
        const history =
            await client.getHistory(null, { depth: 50});

        const blocks =
            history
                .flatMap((entry) => entry.voteStaple.blocks)
                .sort((a, b) => b.date - a.date);

function loadKtaBalanceCache() {
    const saved =
        localStorage.getItem(
            "keetascan_kta_balances"
        );

    return saved
        ? JSON.parse(saved)
        : {};
}

function saveKtaBalanceCache(cache) {
    localStorage.setItem(
        "keetascan_kta_balances",
        JSON.stringify(cache)
    );
}
                const loadedBlocks =
    document.getElementById("analyticsBlocks");

const loadedOperations =
    document.getElementById("analyticsOperations");

const uniqueSenders =
    document.getElementById("uniqueSenders");

const uniqueRecipients =
    document.getElementById("uniqueRecipients");

    let operationCount = 0;

const senderSet = new Set();

const recipientSet = new Set();

const senderCounts = {};

const recipientCounts = {};

const operationCounts = {};

const activityByMinute = {};

const transfers = [];

const whaleVolumes = {};

const whaleTransfers = [];

const richAccounts = [];

const possibleTrades = [];

blocks.forEach((block) => {

    operationCount += block.operations.length;
const blockDate =
    new Date(block.date);

const minuteLabel =
    blockDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

activityByMinute[minuteLabel] =
    (activityByMinute[minuteLabel] || 0) +
    block.operations.length;

    const sender =
        block.account?.publicKeyString?.toString();

    if (sender) {
        senderSet.add(sender);
    }

    if (sender) {
        senderCounts[sender] =
            (senderCounts[sender] || 0) + 1;
    }
const sendOperations =
    block.operations.filter((operation) => {
        const type =
            operation.constructor.name.replace(
                "src_client_BlockOperation",
                ""
            );

        return type === "SEND";
    });

    block.operations.forEach((operation) => {

        const recipient =
            operation.to?.publicKeyString?.toString() ||
            "Not available";

        if (recipient !== "Not available") {
            recipientSet.add(recipient);

            recipientCounts[recipient] =
                (recipientCounts[recipient] || 0) + 1;
        }
if (sender !== "Not available") {
    richAccounts.push(sender);
}

if (recipient !== "Not available") {
    richAccounts.push(recipient);
}
        const operationType =
            operation.constructor.name.replace(
                "src_client_BlockOperation",
                ""
            );
        operationCounts[operationType] =
            (operationCounts[operationType] || 0) + 1;

if (operation.amount && operation.token) {
    transfers.push({
        amount: BigInt(operation.amount),
        token: operation.token,
        blockHash: block.hash.toString(),
        date: block.date,
        sender:
            block.account?.publicKeyString?.toString?.() ||
            "Not available",
        recipient:
            operation.to?.publicKeyString?.toString?.() ||
            "Not available"
    });
    possibleTrades.push({
    from:
        block.account?.publicKeyString?.toString?.() ||
        "Not available",

    to:
        operation.to?.publicKeyString?.toString?.() ||
        "Not available",

    token:
        operation.token?.publicKeyString?.toString?.(),

    amount:
        BigInt(operation.amount),

    date:
        block.date,

    blockHash:
        block.hash.toString()
});
    const transferAmount =
    BigInt(operation.amount);

const sender =
    block.account?.publicKeyString?.toString?.() ||
    "Not available";

const recipient =
    operation.to?.publicKeyString?.toString?.() ||
    "Not available";

if (
    operationType === "SEND" &&
    sender !== "Not available" &&
    recipient !== "Not available"
) {
    whaleTransfers.push({
        amount: transferAmount,
        token: operation.token,
        sender: sender,
        recipient: recipient,
        date: block.date,
        blockHash: block.hash.toString()
    });
}

if (sender !== "Not available") {
    whaleVolumes[sender] =
        (whaleVolumes[sender] || 0n) +
        transferAmount;
}

if (recipient !== "Not available") {
    whaleVolumes[recipient] =
        (whaleVolumes[recipient] || 0n) +
        transferAmount;
}
}
    });

});
const activityGrowthChart =
    document.getElementById("activityGrowthChart");

const activityEntries =
    Object.entries(activityByMinute);

const largestActivityCount =
    Math.max(
        ...activityEntries.map(([, count]) => count),
        1
    );

activityGrowthChart.innerHTML = "";

activityEntries.forEach(([time, count]) => {
    const barHeight =
        (count / largestActivityCount) * 100;

    const column =
        document.createElement("div");

    column.className =
        "growth-column";

    column.innerHTML = `
        <div class="growth-value">${count}</div>

        <div class="growth-bar-area">
            <div
                class="growth-bar"
                style="height: ${barHeight}%"
            ></div>
        </div>

        <div class="growth-label">${time}</div>
    `;

    activityGrowthChart.appendChild(column);
});
loadedBlocks.textContent =
    blocks.length.toLocaleString();

loadedOperations.textContent =
    operationCount.toLocaleString();

uniqueSenders.textContent =
    senderSet.size.toLocaleString();

uniqueRecipients.textContent =
    recipientSet.size.toLocaleString();

    const topSenders =
    document.getElementById("topSenders");

const topRecipients =
    document.getElementById("topRecipients");

const operationTypes =
    document.getElementById("operationTypes");

    const sortedSenders =
    Object.entries(senderCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

const sortedRecipients =
    Object.entries(recipientCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

const sortedOperationTypes =
    Object.entries(operationCounts)
        .sort((a, b) => b[1] - a[1]);

        topSenders.innerHTML = "";

sortedSenders.forEach(([sender, count]) => {
    const row =
        document.createElement("div");

    row.className = "analytics-row";

    row.innerHTML = `
        <a href="address.html?address=${encodeURIComponent(sender)}">
            ${sender.slice(0, 14)}...${sender.slice(-6)}
        </a>

        <span>${count} blocks</span>
    `;

    topSenders.appendChild(row);
});

topRecipients.innerHTML = "";

sortedRecipients.forEach(([recipient, count]) => {
    const row =
        document.createElement("div");

    row.className = "analytics-row";

    row.innerHTML = `
        <a href="address.html?address=${encodeURIComponent(recipient)}">
            ${recipient.slice(0, 14)}...${recipient.slice(-6)}
        </a>

        <span>${count} operations</span>
    `;

    topRecipients.appendChild(row);
});

operationTypes.innerHTML = "";

const largestOperationCount =
    sortedOperationTypes[0]?.[1] || 1;

sortedOperationTypes.forEach(([type, count]) => {
    const percentage =
        (count / largestOperationCount) * 100;

    const row =
        document.createElement("div");

    row.className =
        "operation-analytics-row";

    row.innerHTML = `
        <span>${type}</span>

        <div class="operation-bar-track">
            <div
                class="operation-bar-fill"
                style="width: ${percentage}%"
            ></div>
        </div>

        <strong>${count}</strong>
    `;

    operationTypes.appendChild(row);
});

const largestTransfers =
    document.getElementById("largestTransfers");

const sortedTransfers =
    transfers
        .sort((a, b) => {
            if (a.amount === b.amount) {
                return 0;
            }

            return a.amount > b.amount ? -1 : 1;
        })
        .slice(0, 10);

largestTransfers.innerHTML = "";

for (const transfer of sortedTransfers) {
    let tokenName = "";
    let formattedAmount =
        transfer.amount.toString();

    try {
        const tokenInfo =
            await client.getAccountInfo(transfer.token);

        tokenName =
            tokenInfo?.info?.name || "";

        if (tokenInfo?.info?.metadata) {
            const metadata =
                JSON.parse(
                    atob(tokenInfo.info.metadata)
                );

            formattedAmount =
                formatTokenAmount(
                    transfer.amount,
                    metadata.decimalPlaces
                );
        }
    } catch (error) {
        console.warn(
            "Unable to load transfer token:",
            error
        );
    }

    const row =
        document.createElement("div");

    row.className =
        "largest-transfer-row";

    row.innerHTML = `
        <div>
            <strong>
                ${formattedAmount} ${tokenName}
            </strong>

            <span>
                ${timeAgo(transfer.date)}
            </span>
        </div>

        <div>
            ${transfer.sender === "Not available"
                ? "Not available"
                : `${transfer.sender.slice(0, 12)}...${transfer.sender.slice(-6)}`
            }

            →

            ${transfer.recipient === "Not available"
                ? "Not available"
                : `${transfer.recipient.slice(0, 12)}...${transfer.recipient.slice(-6)}`
            }
        </div>
    `;

    row.addEventListener("click", () => {
        window.location.href =
            `block.html?hash=${encodeURIComponent(
                transfer.blockHash
            )}`;
    });

    largestTransfers.appendChild(row);
}
const avgOperations =
    document.getElementById("avgOperations");

const avgTransfer =
    document.getElementById("avgTransfer");

const largestTransfer =
    document.getElementById("largestTransfer");

const activityScore =
    document.getElementById("activityScore");

    const averageOperationsPerBlock =
    blocks.length > 0
        ? operationCount / blocks.length
        : 0;

const tokenNameCache = new Map();
const ktaDivisor = 10n ** 18n;
     const ktaTransfersForGrowth = [];

for (const transfer of transfers) {
    const tokenKey =
        transfer.token.publicKeyString.toString();

    let tokenName =
        tokenNameCache.get(tokenKey);

    if (!tokenName) {
        const tokenInfo =
            await client.getAccountInfo(
                transfer.token
            );

        tokenName =
            tokenInfo?.info?.name || "";

        tokenNameCache.set(
            tokenKey,
            tokenName
        );
    }

    if (tokenName === "KTA") {
        ktaTransfersForGrowth.push(
            BigInt(transfer.amount)
        );
    }
}

let totalKtaTransferAmount = 0n;

ktaTransfersForGrowth.forEach((amount) => {
    totalKtaTransferAmount += amount;
});

const averageTransferRaw =
    ktaTransfersForGrowth.length > 0
        ? totalKtaTransferAmount /
          BigInt(ktaTransfersForGrowth.length)
        : 0n;

const largestTransferRaw =
    ktaTransfersForGrowth.length > 0
        ? ktaTransfersForGrowth.reduce(
            (largest, amount) =>
                amount > largest
                    ? amount
                    : largest,
            0n
        )
        : 0n;

        avgOperations.textContent =
    averageOperationsPerBlock.toFixed(2);

avgTransfer.textContent =
    formatKta(averageTransferRaw);

largestTransfer.textContent =
    formatKta(largestTransferRaw);

    let scoreLabel = "Low";

if (averageOperationsPerBlock >= 3) {
    scoreLabel = "High";
} else if (averageOperationsPerBlock >= 1.5) {
    scoreLabel = "Moderate";
}

activityScore.textContent =
    scoreLabel;

    const whaleList =
    document.getElementById("whaleList");
const ktaWhaleTransfers = [];

for (const transfer of whaleTransfers) {
    const tokenKey =
        transfer.token.publicKeyString.toString();

    let tokenName =
        tokenNameCache.get(tokenKey);

    if (!tokenName) {
        const tokenInfo =
            await client.getAccountInfo(
                transfer.token
            );

        tokenName =
            tokenInfo?.info?.name || "";

        tokenNameCache.set(
            tokenKey,
            tokenName
        );
    }

    if (tokenName === "KTA") {
        ktaWhaleTransfers.push(transfer);
    }
}

const largestWhaleTransfers =
    ktaWhaleTransfers
        .sort((a, b) => {
            if (a.amount === b.amount) {
                return 0;
            }

            return a.amount > b.amount ? -1 : 1;
        })
        .slice(0, 10);

whaleList.innerHTML = "";


largestWhaleTransfers.forEach((transfer, index) => {
    const row =
        document.createElement("div");

    row.className = "whale-row";

    const shortSender =
        `${transfer.sender.slice(0, 14)}...${transfer.sender.slice(-6)}`;

    const shortRecipient =
        `${transfer.recipient.slice(0, 14)}...${transfer.recipient.slice(-6)}`;

    const whole =
        transfer.amount / ktaDivisor;

    const remainder =
        transfer.amount % ktaDivisor;

    const decimal =
        remainder
            .toString()
            .padStart(18, "0")
            .slice(0, 4);

    const readableAmount =
        `${whole.toLocaleString()}.${decimal} KTA`;

    row.innerHTML = `
        <span class="whale-rank">
            #${index + 1}
        </span>

        <a href="address.html?address=${encodeURIComponent(transfer.sender)}">
            ${shortSender}
        </a>

        <span>→</span>

        <a href="address.html?address=${encodeURIComponent(transfer.recipient)}">
            ${shortRecipient}
        </a>

        <strong>
            ${readableAmount}
        </strong>
    `;

    whaleList.appendChild(row);
});
const previouslyDiscovered =
    loadDiscoveredAccounts();
const matchedTrades = [];

for (let i = 0; i < possibleTrades.length; i++) {
    const first = possibleTrades[i];

    for (let j = i + 1; j < possibleTrades.length; j++) {
        const second = possibleTrades[j];

        const oppositeDirection =
            first.from === second.to &&
            first.to === second.from;

        const differentTokens =
            first.token !== second.token;

        const firstTime =
    new Date(first.date).getTime();

const secondTime =
    new Date(second.date).getTime();

const timeDifference =
    Math.abs(firstTime - secondTime);

const withinTradeWindow =
    timeDifference <= 5 * 60 * 1000;
       if (
    oppositeDirection &&
    differentTokens &&
    withinTradeWindow
) {
            matchedTrades.push({
                first,
                second
            });
        }
    }
}

console.log(
    "POSSIBLE MATCHED TRADES:",
    matchedTrades
);
console.log(
    "FIRST 5 MATCHED TRADES:",
    matchedTrades.slice(0, 5)
);
console.log(
    "FIRST 5 TRADE TOKENS:",
    matchedTrades.slice(0, 5).map((trade) => ({
        firstToken:
            tokenNameCache.get(trade.first.token) ||
            trade.first.token,

        firstAmount:
            trade.first.amount.toString(),

        secondToken:
            tokenNameCache.get(trade.second.token) ||
            trade.second.token,

        secondAmount:
            trade.second.amount.toString()
    }))
);
const ktaTradeCandidates =
    matchedTrades.filter((trade) => {
        const firstTokenName =
            tokenNameCache.get(
                trade.first.token
            );

        const secondTokenName =
            tokenNameCache.get(
                trade.second.token
            );

        return (
            firstTokenName === "KTA" ||
            secondTokenName === "KTA"
        );
    });

console.log(
    "KTA TRADE CANDIDATES:",
    ktaTradeCandidates
);
const uniqueKtaTradesMap = new Map();

ktaTradeCandidates.forEach((trade) => {
    const wallets = [
        trade.first.from,
        trade.first.to
    ].sort();

    const tokens = [
        trade.first.token,
        trade.second.token
    ].sort();

    const firstTime =
        new Date(trade.first.date).getTime();

    const secondTime =
        new Date(trade.second.date).getTime();

    const tradeTime =
        Math.min(firstTime, secondTime);

    const timeBucket =
        Math.floor(tradeTime / (60 * 1000));

    const key =
        `${wallets[0]}|${wallets[1]}|${tokens[0]}|${tokens[1]}|${timeBucket}`;

    if (!uniqueKtaTradesMap.has(key)) {
        uniqueKtaTradesMap.set(
            key,
            trade
        );
    }
});

const uniqueKtaTrades =
    [...uniqueKtaTradesMap.values()];

console.log(
    "UNIQUE KTA TRADES:",
    uniqueKtaTrades
);
const classifiedKtaTrades =
    uniqueKtaTrades.map((trade) => {
        const firstTokenName =
            tokenNameCache.get(
                trade.first.token
            );

        const secondTokenName =
            tokenNameCache.get(
                trade.second.token
            );

        const ktaTransfer =
            firstTokenName === "KTA"
                ? trade.first
                : trade.second;

        const otherTransfer =
            firstTokenName === "KTA"
                ? trade.second
                : trade.first;

        const otherToken =
            firstTokenName === "KTA"
                ? secondTokenName
                : firstTokenName;

        return {
            ktaAmount:
                ktaTransfer.amount,

            ktaSeller:
                ktaTransfer.from,

            ktaBuyer:
                ktaTransfer.to,

            otherToken:
                otherToken,

            otherAmount:
                otherTransfer.amount,

            date:
                ktaTransfer.date,

            blockHash:
                ktaTransfer.blockHash
        };
    });
console.log(
    "CLASSIFIED KTA TRADES:",
    classifiedKtaTrades
);
const recentKtaTrades =
    [...classifiedKtaTrades]
        .sort((a, b) => {
            if (a.ktaAmount > b.ktaAmount) {
                return -1;
            }

            if (a.ktaAmount < b.ktaAmount) {
                return 1;
            }

            return 0;
        })
        .slice(0, 10);
const recentKtaTradesList =
    document.getElementById("recentKtaTrades");

recentKtaTradesList.innerHTML = "";

const tradeTokenInfoCache = new Map();

for (let index = 0; index < recentKtaTrades.length; index++) {
    const trade = recentKtaTrades[index];
       
    const row =
    document.createElement("div");

    row.className =
        "recent-kta-trade-row";

    const shortBuyer =
        `${trade.ktaBuyer.slice(0, 14)}...${trade.ktaBuyer.slice(-6)}`;

    const shortSeller =
        `${trade.ktaSeller.slice(0, 14)}...${trade.ktaSeller.slice(-6)}`;

    const readableKtaAmount =
        formatKta(trade.ktaAmount);

let readableOtherAmount =
    trade.otherAmount.toString();

try {
    const otherTokenEntry =
        possibleTrades.find((item) =>
            tokenNameCache.get(item.token) ===
            trade.otherToken
        );
let otherTokenInfo = null;
    if (otherTokenEntry) {
        otherTokenInfo =
    tradeTokenInfoCache.get(
        trade.otherToken
    );

if (!otherTokenInfo) {
    otherTokenInfo =
        await client.getAccountInfo(
            otherTokenEntry.token
        );

    tradeTokenInfoCache.set(
        trade.otherToken,
        otherTokenInfo
    );
}

        if (otherTokenInfo?.info?.metadata) {
            const metadata =
                JSON.parse(
                    atob(
                        otherTokenInfo.info.metadata
                    )
                );

            readableOtherAmount =
                formatTokenAmount(
                    trade.otherAmount,
                    metadata.decimalPlaces
                );
        }
    }
} catch (error) {
    console.warn(
        "Unable to format trade token:",
        trade.otherToken,
        error
    );
}

const tradeTime =
    new Date(trade.date);

const secondsAgo =
    Math.floor(
        (Date.now() - tradeTime.getTime()) / 1000
    );

let timeAgo = "";

if (secondsAgo < 60) {
    timeAgo =
        `${secondsAgo} sec ago`;
} else if (secondsAgo < 3600) {
    timeAgo =
        `${Math.floor(secondsAgo / 60)} min ago`;
} else if (secondsAgo < 86400) {
    timeAgo =
        `${Math.floor(secondsAgo / 3600)} hr ago`;
} else {
    timeAgo =
        `${Math.floor(secondsAgo / 86400)} days ago`;
}
    row.innerHTML = `
        <span class="trade-rank">
            #${index + 1}
        </span>

        <strong>
            ${readableKtaAmount}
        </strong>

        <span>
            Buyer:
            <a href="address.html?address=${encodeURIComponent(trade.ktaBuyer)}">
                ${shortBuyer}
            </a>
        </span>

        <span>
            Seller:
            <a href="address.html?address=${encodeURIComponent(trade.ktaSeller)}">
                ${shortSeller}
            </a>
        </span>

        <span>
    ${readableOtherAmount}
    ${trade.otherToken}
</span>

<span>
    ${timeAgo}
</span>
    `;

    recentKtaTradesList.appendChild(row);
}
console.log(
    "TOP 10 KTA TRADES:",
    recentKtaTrades
);
const uniqueRichAccounts =
    [
        ...new Set([
            ...previouslyDiscovered,
            ...richAccounts
        ])
    ];

saveDiscoveredAccounts(
    uniqueRichAccounts
);

console.log(
    "Total remembered accounts:",
    uniqueRichAccounts.length
);
const ktaHolders = [];
const ktaBalanceCache =
    loadKtaBalanceCache();
const batchSize = 5;
for (
    let i = 0;
    i < uniqueRichAccounts.length;
    i += batchSize
) {
    const batch =
        uniqueRichAccounts.slice(
            i,
            i + batchSize
        );

    const batchResults =
        await Promise.all(
           batch.map(async (wallet) => {
    try {
       const cachedEntry =
    ktaBalanceCache[wallet];

const cacheMaxAge =
    5 * 60 * 1000;

if (
    cachedEntry &&
    Date.now() - cachedEntry.updatedAt < cacheMaxAge
) {
    return {
        wallet: wallet,
        balance: BigInt(
            cachedEntry.balance
        )
    };
}
        const accountInfo =
            await client.getAccountInfo(wallet);

                    for (const balance of accountInfo.balances) {
                        const tokenKey =
                            balance.token.publicKeyString.toString();

                        let tokenName =
                            tokenNameCache.get(tokenKey);

                        if (!tokenName) {
                            const tokenInfo =
                                await client.getAccountInfo(
                                    balance.token
                                );

                            tokenName =
                                tokenInfo?.info?.name || "";

                            tokenNameCache.set(
                                tokenKey,
                                tokenName
                            );
                        }

                        if (tokenName === "KTA") {
    const rawBalance =
        BigInt(balance.balance);

   ktaBalanceCache[wallet] = {
    balance: rawBalance.toString(),
    updatedAt: Date.now()
};

    return {
        wallet: wallet,
        balance: rawBalance
    };
}
                    }

                    return null;

                } catch (error) {
                    console.warn(
                        "Unable to scan wallet:",
                        wallet
                    );

                    return null;
                }
            })
        );

    batchResults.forEach((result) => {
        if (result) {
            ktaHolders.push(result);
        }
    });

    console.log(
        `Scanned ${Math.min(
            i + batchSize,
            uniqueRichAccounts.length
        )} / ${uniqueRichAccounts.length}`
    );
}
saveKtaBalanceCache(
    ktaBalanceCache
);
console.log("KTA holders found:", ktaHolders);

const topKtaHolders =
    ktaHolders
        .sort((a, b) => {
            if (a.balance === b.balance) {
                return 0;
            }

            return a.balance > b.balance ? -1 : 1;
        })
        .slice(0, 20);

console.log(
    "Top 20 KTA holders:",
    topKtaHolders
);
const ktaDecimals = 18n;

function formatKta(rawBalance) {
    const whole = rawBalance / ktaDivisor;
    const remainder = rawBalance % ktaDivisor;

    const decimal =
        remainder
            .toString()
            .padStart(18, "0")
            .slice(0, 4);

    return (
        whole.toLocaleString() +
        "." +
        decimal +
        " KTA"
    );
}

const richList =
    document.getElementById("richList");

richList.innerHTML = "";

topKtaHolders.forEach((holder, index) => {
    const row =
        document.createElement("div");

    row.className = "whale-row";

    const shortWallet =
        `${holder.wallet.slice(0, 14)}...${holder.wallet.slice(-6)}`;

    row.innerHTML = `
        <span class="whale-rank">
            #${index + 1}
        </span>

        <a href="address.html?address=${encodeURIComponent(holder.wallet)}">
            ${shortWallet}
        </a>

        <strong>
            ${formatKta(holder.balance)}
        </strong>
    `;

    richList.appendChild(row);
});

    } catch (error) {
        console.error(
            "Error loading analytics:",
            error
        );
    }
}

loadAnalytics();  
discoverMoreAccounts();