const client = KeetaNet.Client.fromNetwork("main");

const transactionsPageList =
    document.getElementById("transactionsPageList");
const previousPageButton =
    document.getElementById("previousPage");
const nextPageButton =
    document.getElementById("nextPage");
const pageNumber =
    document.getElementById("pageNumber");
const transactionFilter =
    document.getElementById("transactionFilter");
const transactionResultCount =
    document.getElementById("transactionResultCount");

const rowsPerPage = 20;
const tokenInfoCache = new Map();

let currentPage = 1;
let allTransactions = [];
let filteredTransactions = [];

function shortValue(value, start = 12, end = 6) {
    if (!value || value === "Not available") {
        return value || "Not available";
    }

    return formatKeetaIdentifier(value, start, end);
}

function transactionUrl(transfer) {
    return (
        `transaction.html?block=${encodeURIComponent(transfer.block_hash)}` +
        `&operation=${transfer.operation_index}`
    );
}

function formatTokenAmount(amount, decimals) {
    const rawAmount = BigInt(amount);
    const safeDecimals = Math.max(0, Number(decimals || 0));
    const divisor = 10n ** BigInt(safeDecimals);
    const wholePart = rawAmount / divisor;
    const fractionalPart = rawAmount % divisor;
    const fractionalText = fractionalPart
        .toString()
        .padStart(safeDecimals, "0")
        .replace(/0+$/, "");

    return fractionalText
        ? `${wholePart.toLocaleString()}.${fractionalText}`
        : wholePart.toLocaleString();
}

async function getTokenDisplay(tokenAddress, rawAmount) {
    if (!tokenAddress) {
        return {
            amount: BigInt(rawAmount).toLocaleString(),
            name: "Unknown"
        };
    }

    let tokenInfo = tokenInfoCache.get(tokenAddress);

    if (!tokenInfo) {
        const tokenAccount =
            KeetaNet.lib.Account.fromPublicKeyString(tokenAddress);

        tokenInfo =
            client.getAccountInfo(tokenAccount);

        tokenInfoCache.set(
            tokenAddress,
            tokenInfo
        );
    }

    tokenInfo = await tokenInfo;

    tokenInfoCache.set(
        tokenAddress,
        tokenInfo
    );

    let decimalPlaces = 0;

    try {
        if (tokenInfo?.info?.metadata) {
            const metadata = JSON.parse(atob(tokenInfo.info.metadata));
            decimalPlaces = Number(metadata.decimalPlaces || 0);
        }
    } catch (error) {
        console.warn("Unreadable token metadata:", tokenAddress);
    }

    return {
        amount: formatTokenAmount(rawAmount, decimalPlaces),
        name: tokenInfo?.info?.name || shortValue(tokenAddress, 8, 6)
    };
}

function createAddressLink(address) {
    if (!address || address === "Not available") {
        const unavailable = document.createElement("span");
        unavailable.textContent = "Not available";
        return unavailable;
    }

    const link = document.createElement("a");
    link.href = `address.html?address=${encodeURIComponent(address)}`;
    link.textContent = shortValue(address);
    link.title = address;
    link.addEventListener("click", (event) => event.stopPropagation());
    return link;
}

function createTransactionRow(transfer) {
    const row = document.createElement("div");
    row.className = "transaction-directory-row";
    row.tabIndex = 0;
    row.setAttribute("role", "link");
    row.setAttribute(
        "aria-label",
        `Open transaction from block ${transfer.block_hash}`
    );

    const blockLink = document.createElement("a");
    blockLink.className = "transaction-directory-block";
    blockLink.href =
        `block.html?hash=${encodeURIComponent(transfer.block_hash)}`;
    blockLink.textContent = shortValue(transfer.block_hash);
    blockLink.title = transfer.block_hash;
    blockLink.addEventListener("click", (event) => event.stopPropagation());

    const age = document.createElement("span");
    age.className = "transaction-directory-age";
    age.textContent = timeAgo(new Date(transfer.timestamp));

    const sender = document.createElement("span");
    sender.className = "transaction-directory-address";
    sender.appendChild(createAddressLink(transfer.sender));

    const recipient = document.createElement("span");
    recipient.className = "transaction-directory-address";
    recipient.appendChild(createAddressLink(transfer.recipient));

    const amount = document.createElement("span");
    amount.className = "transaction-directory-amount";
    amount.textContent =
        `${transfer.displayAmount} ${transfer.tokenName}`;

    row.append(blockLink, age, sender, recipient, amount);

    const openTransaction = () => {
        window.location.assign(transactionUrl(transfer));
    };

    row.addEventListener("click", openTransaction);
    row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openTransaction();
        }
    });

    return row;
}

function renderCurrentPage() {
    transactionsPageList.innerHTML = "";

    const totalResults = filteredTransactions.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / rowsPerPage));

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalResults);
    const visibleTransactions =
        filteredTransactions.slice(startIndex, endIndex);

    if (visibleTransactions.length === 0) {
        const empty = document.createElement("p");
        empty.className = "transactions-empty";
        empty.textContent = allTransactions.length
            ? "No loaded transactions match that filter."
            : "No indexed transactions are available.";
        transactionsPageList.appendChild(empty);
    } else {
        visibleTransactions.forEach((transfer) => {
            transactionsPageList.appendChild(createTransactionRow(transfer));
        });
    }

    transactionResultCount.textContent = totalResults
        ? `${(startIndex + 1).toLocaleString()}–${endIndex.toLocaleString()} of ${totalResults.toLocaleString()} loaded`
        : "0 transactions";

    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
    previousPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage >= totalPages;
}

function filterTransactions() {
    const query = transactionFilter.value.trim().toLowerCase();

    filteredTransactions = query
        ? allTransactions.filter((transfer) =>
            [
                transfer.block_hash,
                transfer.sender,
                transfer.recipient,
                transfer.token,
                transfer.tokenName
            ].some((value) =>
                String(value || "").toLowerCase().includes(query)
            )
        )
        : [...allTransactions];

    currentPage = 1;
    renderCurrentPage();
}

async function prepareTransfer(transfer) {
    try {
        const tokenDisplay = await getTokenDisplay(
            transfer.token,
            transfer.amount
        );

        return {
            ...transfer,
            displayAmount: tokenDisplay.amount,
            tokenName: tokenDisplay.name
        };
    } catch (error) {
        console.warn("Unable to format token:", transfer.token, error);

        return {
            ...transfer,
            displayAmount: BigInt(transfer.amount).toLocaleString(),
            tokenName: shortValue(transfer.token, 8, 6)
        };
    }
}

async function loadTransactionsPage() {
    transactionsPageList.innerHTML =
        '<p class="transactions-empty">Loading transactions…</p>';
    transactionResultCount.textContent = "Loading transactions…";
    previousPageButton.disabled = true;
    nextPageButton.disabled = true;

    try {
        const response =
            await fetchKeetaView("http://localhost:3000/api/transfers?limit=100");

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const transfers = await response.json();

        allTransactions = transfers
            .map((transfer) => ({
                ...transfer,
                displayAmount: BigInt(transfer.amount).toLocaleString(),
                tokenName: shortValue(transfer.token, 8, 6)
            }))
            .sort(
                (first, second) =>
                    new Date(second.timestamp).getTime() -
                    new Date(first.timestamp).getTime()
            );

        filteredTransactions = [...allTransactions];
        currentPage = 1;
        renderCurrentPage();

        const firstPageTransfers =
            allTransactions.slice(0, rowsPerPage);

        await Promise.all(
            firstPageTransfers.map(async (transfer) => {
                Object.assign(
                    transfer,
                    await prepareTransfer(transfer)
                );
            })
        );

        renderCurrentPage();

        Promise.all(
            allTransactions.slice(rowsPerPage).map(async (transfer) => {
                Object.assign(
                    transfer,
                    await prepareTransfer(transfer)
                );
            })
        ).then(() => {
            filterTransactions();
        }).catch((error) => {
            console.warn(
                "Some token details could not be loaded:",
                error
            );
        });
    } catch (error) {
        console.error("Error loading transactions page:", error);
        allTransactions = [];
        filteredTransactions = [];
        transactionsPageList.innerHTML =
            '<p class="transactions-empty">Unable to load transactions. Make sure the KeetaView API server is running.</p>';
        transactionResultCount.textContent = "Unavailable";
        pageNumber.textContent = "Page —";
    }
}

transactionFilter.addEventListener("input", filterTransactions);

previousPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        renderCurrentPage();
        document.querySelector(".transactions-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

nextPageButton.addEventListener("click", () => {
    const totalPages =
        Math.ceil(filteredTransactions.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage += 1;
        renderCurrentPage();
        document.querySelector(".transactions-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

loadTransactionsPage();
