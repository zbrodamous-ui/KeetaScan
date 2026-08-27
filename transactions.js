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

const tokenInfoCache =
    new Map();

    async function getTokenDisplay(
    tokenAddress,
    rawAmount
) {
    let tokenInfo =
        tokenInfoCache.get(
            tokenAddress
        );

    if (!tokenInfo) {
        const tokenAccount =
            KeetaNet.lib.Account
                .fromPublicKeyString(
                    tokenAddress
                );

        tokenInfo =
            await client.getAccountInfo(
                tokenAccount
            );

        tokenInfoCache.set(
            tokenAddress,
            tokenInfo
        );
    }

    let decimalPlaces = 0;

    if (tokenInfo?.info?.metadata) {
        const metadata =
            JSON.parse(
                atob(
                    tokenInfo.info.metadata
                )
            );

        decimalPlaces =
            Number(
                metadata.decimalPlaces ||
                0
            );
    }

    return {
        amount:
            formatTokenAmount(
                rawAmount,
                decimalPlaces
            ),
        name:
            tokenInfo?.info?.name ||
            `${tokenAddress.slice(0, 8)}...`
    };
}

async function loadTransactionsPage() {
    try {
        transactionsPageList.textContent =
            "Loading transactions...";

        const response =
            await fetch(
                "http://localhost:3000/api/transfers?limit=100"
            );

        if (!response.ok) {
            throw new Error(
                `API request failed: ${response.status}`
            );
        }

        const transfers =
            await response.json();

            const displayTransfers =
    await Promise.all(
        transfers.map(
            async (transfer) => {
                try {
                    const tokenDisplay =
                        await getTokenDisplay(
                            transfer.token,
                            transfer.amount
                        );

                    return {
                        ...transfer,
                        displayAmount:
                            tokenDisplay.amount,
                        tokenName:
                            tokenDisplay.name
                    };
                } catch (error) {
                    console.warn(
                        "Unable to format token:",
                        transfer.token,
                        error
                    );

                    return {
                        ...transfer,
                        displayAmount:
                            BigInt(
                                transfer.amount
                            ).toLocaleString(),
                        tokenName:
                            `${transfer.token.slice(0, 8)}...`
                    };
                }
            }
        )
    );

       allTransactions =
         displayTransfers.map(
                (transfer) => {
                    const sender =
                        transfer.sender ||
                        "Not available";

                    const recipient =
                        transfer.recipient ||
                        "Not available";

                    const token =
                        transfer.token ||
                        "Not available";

                    const shortSender =
                        sender === "Not available"
                            ? sender
                            : `${sender.slice(0, 12)}...${sender.slice(-6)}`;

                    const shortRecipient =
                        recipient === "Not available"
                            ? recipient
                            : `${recipient.slice(0, 12)}...${recipient.slice(-6)}`;

                    const shortToken =
                        token === "Not available"
                            ? token
                            : `${token.slice(0, 8)}...`;

                    const transactionRow =
                        document.createElement(
                            "div"
                        );

                    transactionRow.className =
                        "activity-row transaction-row";

                    transactionRow.innerHTML = `
                        <span>
                            <a href="block.html?block=${encodeURIComponent(
                                transfer.block_hash
                            )}">
                                ${transfer.block_hash.slice(0, 8)}...
                            </a>
                        </span>

                        <span>
                            ${timeAgo(
                                new Date(
                                    transfer.timestamp
                                )
                            )}
                        </span>

                        <span>Transfer</span>

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

                        <span>
                           ${transfer.displayAmount} ${transfer.tokenName}
                        </span>
                    `;

                    transactionRow
                        .querySelectorAll("a")
                        .forEach(
                            (link) => {
                                link.addEventListener(
                                    "click",
                                    (event) => {
                                        event.stopPropagation();
                                    }
                                );
                            }
                        );

                    transactionRow.addEventListener(
                        "click",
                        () => {
                            window.location.href =
                                `transaction.html?block=${encodeURIComponent(
                                    transfer.block_hash
                                )}&operation=${transfer.operation_index}`;
                        }
                    );

                    return {
                        date:
                            new Date(
                                transfer.timestamp
                            ).getTime(),
                        row:
                            transactionRow
                    };
                }
            );

        allTransactions.sort(
            (a, b) =>
                b.date - a.date
        );

        currentPage = 1;
        renderCurrentPage();
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
