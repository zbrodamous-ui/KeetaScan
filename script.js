const searchType =
    document.getElementById("searchType");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const homeSearchForm =
    document.getElementById("homeSearchForm");

const homeBlocksList =
    document.getElementById("homeBlocksList");

const homeTransactionsList =
    document.getElementById("homeTransactionsList");

const marketPrice =
    document.getElementById("marketPrice");
const marketStatus =
    document.getElementById("marketStatus");
const marketChartPath =
    document.getElementById("marketChartPath");

const client =
    KeetaNet.Client.fromNetwork("main");

const tokenDisplayCache =
    new Map();

let marketRequestInProgress = false;
let hasMarketData = false;

function runSearch() {
    const searchText =
        searchInput.value.trim();

    if (!searchText) {
        searchInput.focus();
        return;
    }

    if (searchText.startsWith("keeta_")) {
        window.location.assign(
            `address.html?address=${encodeURIComponent(
                searchText
            )}`
        );
        return;
    }

    const transactionMatch =
        searchText.match(
            /^([0-9a-f]{64}):(\d+)$/i
        );

    if (transactionMatch) {
        window.location.assign(
            `transaction.html?block=${encodeURIComponent(
                transactionMatch[1]
            )}&operation=${encodeURIComponent(
                transactionMatch[2]
            )}`
        );
        return;
    }

    if (/^[0-9a-f]{64}$/i.test(searchText)) {
        window.location.assign(
            `block.html?hash=${encodeURIComponent(
                searchText
            )}`
        );
        return;
    }

    const routes = {
        transaction:
            `transaction.html?search=${encodeURIComponent(
                searchText
            )}`,
        address:
            `address.html?address=${encodeURIComponent(
                searchText
            )}`,
        block:
            `block.html?hash=${encodeURIComponent(
                searchText
            )}`,
        asset:
            `asset.html?asset=${encodeURIComponent(
                searchText
            )}`
    };

    const selectedType =
        searchType.value.toLowerCase();

    const destination =
        routes[selectedType];

    if (!destination) {
        console.error(
            "Unknown search type:",
            searchType.value
        );
        return;
    }

    window.location.assign(destination);
}

homeSearchForm.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();
        runSearch();
    }
);

function shortValue(
    value,
    start = 10,
    end = 6
) {
    if (!value) {
        return "Not available";
    }

    return `${value.slice(0, start)}...${value.slice(-end)}`;
}

async function getTokenDisplay(
    tokenAddress,
    rawAmount
) {
    let tokenInfo =
        tokenDisplayCache.get(
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

        tokenDisplayCache.set(
            tokenAddress,
            tokenInfo
        );
    }

    let decimals = 0;

    if (tokenInfo?.info?.metadata) {
        const metadata =
            JSON.parse(
                atob(
                    tokenInfo.info.metadata
                )
            );

        decimals =
            Number(
                metadata.decimalPlaces ||
                0
            );
    }

    return {
        amount:
            formatTokenAmount(
                rawAmount,
                decimals
            ),
        name:
            tokenInfo?.info?.name ||
            shortValue(
                tokenAddress,
                8,
                0
            )
    };
}

function createBlockRow(block) {
    const row =
        document.createElement("a");

    row.className =
        "home-preview-row";

    row.href =
        `block.html?hash=${encodeURIComponent(
            block.hash
        )}`;

    const operationCount =
        Number(
            block.operation_count
        );

    row.innerHTML = `
        <span class="preview-icon">□</span>

        <span class="preview-main">
            <strong>
                ${shortValue(block.hash, 10, 6)}
            </strong>

            <small>
                ${timeAgo(block.timestamp)}
            </small>
        </span>

        <span class="preview-value">
            ${operationCount.toLocaleString()}
            operation${operationCount === 1 ? "" : "s"}
        </span>
    `;

    return row;
}

async function createTransferRow(
    transfer
) {
    const row =
        document.createElement("a");

    row.className =
        "home-preview-row";

    row.href =
        `transaction.html?block=${encodeURIComponent(
            transfer.block_hash
        )}&operation=${transfer.operation_index}`;

    let amountText =
        BigInt(
            transfer.amount
        ).toLocaleString();

    let tokenText =
        shortValue(
            transfer.token,
            8,
            4
        );

    try {
        const tokenDisplay =
            await getTokenDisplay(
                transfer.token,
                transfer.amount
            );

        amountText =
            tokenDisplay.amount;

        tokenText =
            tokenDisplay.name;
    } catch (error) {
        console.warn(
            "Unable to format homepage token:",
            transfer.token,
            error
        );
    }

    row.innerHTML = `
        <span class="preview-icon">⇄</span>

        <span class="preview-main">
            <strong>
                ${shortValue(transfer.sender, 9, 5)}
                →
                ${shortValue(transfer.recipient, 9, 5)}
            </strong>

            <small>
                ${timeAgo(transfer.timestamp)}
            </small>
        </span>

        <span class="preview-value">
            ${amountText}
            ${tokenText}
        </span>
    `;

    return row;
}

function formatMarketCurrency(
    value,
    maximumFractionDigits = 0
) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return new Intl.NumberFormat(
        undefined,
        {
            style: "currency",
            currency: "USD",
            maximumFractionDigits
        }
    ).format(number);
}

function formatMarketCompact(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return "—";
    }

    return new Intl.NumberFormat(
        undefined,
        {
            notation: "compact",
            maximumFractionDigits: 2
        }
    ).format(number);
}

function createMarketChartPath(prices) {
    const values =
        prices
            .map((point) => Number(point?.[1]))
            .filter(Number.isFinite);

    if (values.length < 2) {
        return "";
    }

    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const range = maximum - minimum || 1;

    return values
        .map((price, index) => {
            const x =
                15 +
                (
                    index /
                    (values.length - 1)
                ) *
                670;

            const y =
                175 -
                (
                    (price - minimum) /
                    range
                ) *
                135;

            return `${index === 0 ? "M" : "L"}${x.toFixed(
                1
            )} ${y.toFixed(1)}`;
        })
        .join(" ");
}

async function loadMarketData() {
    if (marketRequestInProgress) {
        return;
    }

    marketRequestInProgress = true;

    try {
        const response =
            await fetch(
                "http://localhost:3000/api/market",
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                "Market endpoint unavailable."
            );
        }

        const market =
            await response.json();

        const price =
            Number(market.price);

        const change =
            Number(market.priceChange24h);

        const directionColor =
            change > 0
                ? "#16a34a"
                : change < 0
                    ? "#dc2626"
                    : "#1676cf";

        marketPrice.textContent =
            Number.isFinite(price)
                ? `${formatMarketCurrency(
                    price,
                    price < 1 ? 5 : 2
                )} KTA`
                : "KTA price unavailable";

        marketPrice.style.color =
            directionColor;

        marketStatus.textContent =
            Number.isFinite(change)
                ? `● Live · ${change >= 0 ? "+" : ""}${change.toFixed(
                    2
                )}% over 24 hours · Updated ${timeAgo(
                    market.updatedAt
                )}`
                : `● Live · Updated ${timeAgo(
                    market.updatedAt
                )}`;

        marketStatus.style.color =
            directionColor;

        document.getElementById(
            "marketCap"
        ).textContent =
            formatMarketCurrency(
                market.marketCap
            );

        document.getElementById(
            "marketVolume"
        ).textContent =
            formatMarketCurrency(
                market.volume24h
            );

        document.getElementById(
            "marketSupply"
        ).textContent =
            `${formatMarketCompact(
                market.circulatingSupply
            )} KTA`;

        document.getElementById(
            "marketAth"
        ).textContent =
            formatMarketCurrency(
                market.allTimeHigh,
                2
            );

        marketChartPath.setAttribute(
            "d",
            createMarketChartPath(
                market.prices || []
            )
        );

        marketChartPath.style.stroke =
            directionColor;

        hasMarketData = true;
    } catch (error) {
        console.error(
            "Market loading error:",
            error
        );

        if (hasMarketData) {
            marketStatus.textContent =
                "Live update paused · Showing the last successful market data";
            marketStatus.style.color =
                "#b45309";
        } else {
            marketPrice.textContent =
                "KTA market data unavailable";

            marketStatus.textContent =
                "The verified market feed could not be reached. KeetaView will retry automatically.";

            marketChartPath.setAttribute(
                "d",
                ""
            );
        }
    } finally {
        marketRequestInProgress = false;
    }
}

async function loadHomepage() {
    try {
        const [
            statusResponse,
            blocksResponse,
            transfersResponse
        ] =
            await Promise.all([
                fetch(
                    "http://localhost:3000/api/status"
                ),
                fetch(
                    "http://localhost:3000/api/blocks?limit=6&offset=0"
                ),
                fetch(
                    "http://localhost:3000/api/transfers?limit=6"
                )
            ]);

        if (
            !statusResponse.ok ||
            !blocksResponse.ok ||
            !transfersResponse.ok
        ) {
            throw new Error(
                "KeetaView API did not return homepage data."
            );
        }

        const status =
            await statusResponse.json();

        const blocks =
            await blocksResponse.json();

        const transfers =
            await transfersResponse.json();

        document.getElementById(
            "snapshotBlocks"
        ).textContent =
            Number(
                status.blocks
            ).toLocaleString();

        document.getElementById(
            "snapshotTransfers"
        ).textContent =
            Number(
                status.transfers
            ).toLocaleString();

        document.getElementById(
            "snapshotAccounts"
        ).textContent =
            Number(
                status.accounts
            ).toLocaleString();

        const totalRecentOperations =
            blocks.reduce(
                (total, block) =>
                    total +
                    Number(
                        block.operation_count
                    ),
                0
            );

        const recentAverage =
            blocks.length > 0
                ? totalRecentOperations /
                    blocks.length
                : 0;

        document.getElementById(
            "snapshotAverage"
        ).textContent =
            recentAverage.toFixed(2);

        homeBlocksList.innerHTML = "";

        blocks.forEach((block) => {
            homeBlocksList.appendChild(
                createBlockRow(block)
            );
        });

        homeTransactionsList.innerHTML = "";

        const transferRows =
            await Promise.all(
                transfers.map(
                    createTransferRow
                )
            );

        transferRows.forEach((row) => {
            homeTransactionsList.appendChild(
                row
            );
        });
    } catch (error) {
        console.error(
            "Homepage loading error:",
            error
        );

        homeBlocksList.innerHTML =
            "<p class=\"home-error\">Start the KeetaView API to load indexed blocks.</p>";

        homeTransactionsList.innerHTML =
            "<p class=\"home-error\">Start the KeetaView API to load indexed transactions.</p>";
    }
}

function loadKnownAssets() {
    const saved =
        localStorage.getItem(
            "keetascan_known_assets"
        );

    return saved
        ? JSON.parse(saved)
        : [];
}

async function rememberRecentAssets() {
    try {
        const history =
            await client.getHistory(
                null,
                {
                    depth: 20
                }
            );

        const knownAssets =
            new Set(
                loadKnownAssets()
            );

        history
            .flatMap(
                (entry) =>
                    entry.voteStaple.blocks
            )
            .forEach((block) => {
                block.operations.forEach(
                    (operation) => {
                        const token =
                            operation.token
                                ?.publicKeyString
                                ?.toString?.();

                        if (token) {
                            knownAssets.add(token);
                        }
                    }
                );
            });

        localStorage.setItem(
            "keetascan_known_assets",
            JSON.stringify(
                [...knownAssets]
            )
        );
    } catch (error) {
        console.warn(
            "Recent asset discovery failed:",
            error
        );
    }
}

loadHomepage();
loadMarketData();

window.setInterval(
    loadMarketData,
    60 * 1000
);

rememberRecentAssets();
