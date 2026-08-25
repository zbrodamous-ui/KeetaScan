const client = KeetaNet.Client.fromNetwork("main");

const transactionsPageList =
    document.getElementById("transactionsPageList");
const previousPageButton =
    document.getElementById("previousPage");

const nextPageButton =
    document.getElementById("nextPage");

const pageNumber =
    document.getElementById("pageNumber");

const rowsPerPage = 20;

let currentPage = 1;
let allTransactions = [];


async function loadTransactionsPage() {
    try {
        transactionsPageList.textContent =
            "Loading transactions...";

const history =
    await client.getHistory(null, { depth: 250 });

const latestBlocks =
    history
        .flatMap((entry) => entry.voteStaple.blocks)
        .sort((a, b) => b.date - a.date);
const tokenInfoCache = new Map();

transactionsPageList.innerHTML = "";
allTransactions = [];

for (const block of latestBlocks) {
    for (
        let operationIndex = 0;
        operationIndex < block.operations.length;
        operationIndex++
    ) {
        const operation =
            block.operations[operationIndex];

        let tokenInfo = null;

        let formattedAmount =
            operation.amount?.toString() || "Not available";

        let tokenName = "";

       if (operation.token) {
    const tokenKey =
        operation.token.publicKeyString.toString();

    tokenInfo =
        tokenInfoCache.get(tokenKey);

    if (!tokenInfo) {
        tokenInfo =
            await client.getAccountInfo(
                operation.token
            );

        tokenInfoCache.set(
            tokenKey,
            tokenInfo
        );
    }

            if (tokenInfo?.info?.metadata) {
                const metadata =
                    JSON.parse(atob(tokenInfo.info.metadata));

                formattedAmount =
                    formatTokenAmount(
                        operation.amount,
                        metadata.decimalPlaces
                    );

                tokenName =
                    tokenInfo.info.name || "";
            }
        }

        const operationType =
            operation.constructor.name.replace(
                "src_client_BlockOperation",
                ""
            );

        const sender =
            block.account?.publicKeyString?.toString?.() ||
            "Not available";

        const recipient =
            operation.to?.publicKeyString?.toString?.() ||
            "Not available";

        const shortSender =
            sender === "Not available"
                ? sender
                : `${sender.slice(0, 12)}...${sender.slice(-6)}`;

        const shortRecipient =
            recipient === "Not available"
                ? recipient
                : `${recipient.slice(0, 12)}...${recipient.slice(-6)}`;

        const transactionRow =
            document.createElement("div");

        transactionRow.className =
            "activity-row transaction-row";

        transactionRow.innerHTML = `
            <span>
                <a href="block.html?hash=${encodeURIComponent(
                    block.hash.toString()
                )}">
                    ${block.hash.toString().slice(0, 8)}...
                </a>
            </span>

            <span>${timeAgo(block.date)}</span>

            <span>${operationType}</span>

            <span>
                ${
                    sender !== "Not available"
                        ? `<a href="address.html?address=${encodeURIComponent(sender)}">
                               ${shortSender}
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
                `transaction.html?block=${encodeURIComponent(
                    block.hash.toString()
                )}&operation=${operationIndex}`;
        });
allTransactions.push({
    date: new Date(block.date).getTime(),
    row: transactionRow
});
renderCurrentPage();
allTransactions.sort((a, b) => b.date - a.date);

    }
}

} catch (error) {
    console.error(
        "Error loading transactions page:",
        error
    );

        transactionsPageList.textContent =
        "Unable to load transactions.";
    }
}

loadTransactionsPage();

function renderCurrentPage() {
    transactionsPageList.innerHTML = "";

    const startIndex =
        (currentPage - 1) * rowsPerPage;

    const endIndex =
        startIndex + rowsPerPage;

    const visibleRows =
        allTransactions.slice(startIndex, endIndex);
        
visibleRows.forEach((item) => {
    transactionsPageList.appendChild(item.row);
});

    pageNumber.textContent =
        `Page ${currentPage}`;

    previousPageButton.disabled =
        currentPage === 1;

    nextPageButton.disabled =
        endIndex >= allTransactions.length;
}
previousPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        renderCurrentPage();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

nextPageButton.addEventListener("click", () => {
    const totalPages =
        Math.ceil(allTransactions.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage += 1;
        renderCurrentPage();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});  
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
