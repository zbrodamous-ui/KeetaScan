const analyticsClient =
    KeetaNet.Client.fromNetwork("main");

const analyticsTokenCache =
    new Map();

function shortAnalyticsValue(
    value,
    start = 12,
    end = 6
) {
    if (!value) {
        return "Not available";
    }

    return formatKeetaIdentifier(value, start, end);
}

function formatIndexedDate(value) {
    if (!value) {
        return "Not available";
    }

    return formatKeetaDate(value);
}

async function getAnalyticsToken(tokenAddress) {
    if (analyticsTokenCache.has(tokenAddress)) {
        return analyticsTokenCache.get(tokenAddress);
    }

    let result = {
        name:
            shortAnalyticsValue(
                tokenAddress,
                8,
                4
            ),
        decimals: 0
    };

    try {
        const tokenAccount =
            KeetaNet.lib.Account
                .fromPublicKeyString(
                    tokenAddress
                );

        const tokenInfo =
            await analyticsClient.getAccountInfo(
                tokenAccount
            );

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

        result = {
            name:
                tokenInfo?.info?.name ||
                result.name,
            decimals
        };
    } catch (error) {
        console.warn(
            "Unable to resolve analytics token:",
            tokenAddress,
            error
        );
    }

    analyticsTokenCache.set(
        tokenAddress,
        result
    );

    return result;
}

function renderActivityChart(activity) {
    const chart =
        document.getElementById(
            "activityChart"
        );

    chart.innerHTML = "";

    if (!activity.length) {
        chart.innerHTML =
            '<p class="analytics-empty">No indexed activity is available yet.</p>';
        return;
    }

    const maximum =
        Math.max(
            ...activity.map(
                item =>
                    Number(item.transfers)
            ),
            1
        );

    activity.forEach((item) => {
        const value =
            Number(item.transfers);

        const height =
            Math.max(
                (value / maximum) * 100,
                4
            );

        const column =
            document.createElement("div");

        column.className =
            "analytics-chart-column";

        const date =
            new Date(
                `${item.day}T00:00:00`
            );

        const label =
            date.toLocaleDateString(
                undefined,
                {
                    month: "short",
                    day: "numeric"
                }
            );

        column.title =
            `${label}: ${value.toLocaleString()} transfers`;

        column.tabIndex = 0;
        column.style.setProperty(
            "--bar-height",
            `${height}%`
        );

        column.innerHTML = `
            <strong>${value.toLocaleString()}</strong>

            <div class="analytics-bar-track">
                <div
                    class="analytics-bar-tooltip"
                    role="tooltip"
                >
                    <strong>${label}</strong>
                    <span>
                        ${value.toLocaleString()}
                        transfer${value === 1 ? "" : "s"}
                    </span>
                </div>

                <div
                    class="analytics-bar"
                    style="height: ${height}%"
                ></div>
            </div>

            <span>${label}</span>
        `;

        chart.appendChild(column);
    });
}

function renderRankedAccounts(
    elementId,
    entries,
    unit
) {
    const list =
        document.getElementById(
            elementId
        );

    list.innerHTML = "";

    if (!entries.length) {
        list.innerHTML =
            '<p class="analytics-empty">No indexed activity is available.</p>';
        return;
    }

    entries.forEach((entry, index) => {
        const row =
            document.createElement("div");

        row.className =
            "analytics-ranked-row";

        row.innerHTML = `
            <span class="analytics-rank">#${index + 1}</span>

            <a href="address.html?address=${encodeURIComponent(
                entry.address
            )}">
                ${shortAnalyticsValue(entry.address)}
            </a>

            <strong>
                ${Number(entry.total).toLocaleString()}
                ${unit}
            </strong>
        `;

        list.appendChild(row);
    });
}

async function renderTokenActivity(entries) {
    const list =
        document.getElementById(
            "tokenActivity"
        );

    list.innerHTML = "";

    if (!entries.length) {
        list.innerHTML =
            '<p class="analytics-empty">No indexed asset movement is available.</p>';
        return;
    }

    const tokenDetails =
        await Promise.all(
            entries.map(
                entry =>
                    getAnalyticsToken(
                        entry.token
                    )
            )
        );

    entries.forEach((entry, index) => {
        const token =
            tokenDetails[index];

        const row =
            document.createElement("div");

        row.className =
            "analytics-ranked-row";

        row.innerHTML = `
            <span class="analytics-rank">#${index + 1}</span>

            <a href="asset.html?asset=${encodeURIComponent(
                entry.token
            )}">
                ${token.name}
            </a>

            <strong>
                ${Number(
                    entry.transfers
                ).toLocaleString()}
                transfers
            </strong>
        `;

        list.appendChild(row);
    });
}

async function renderRecentTransfers(transfers) {
    const list =
        document.getElementById(
            "analyticsRecentTransfers"
        );

    list.innerHTML = "";

    if (!transfers.length) {
        list.innerHTML =
            '<p class="analytics-empty">No indexed transfers are available.</p>';
        return;
    }

    const tokenDetails =
        await Promise.all(
            transfers.map(
                transfer =>
                    getAnalyticsToken(
                        transfer.token
                    )
            )
        );

    transfers.forEach((transfer, index) => {
        const token =
            tokenDetails[index];

        let amount =
            transfer.amount;

        try {
            amount =
                formatTokenAmount(
                    transfer.amount,
                    token.decimals
                );
        } catch (error) {
            console.warn(
                "Unable to format indexed transfer:",
                error
            );
        }

        const row =
            document.createElement("a");

        row.className =
            "analytics-transfer-row";

        row.href =
            `transaction.html?block=${encodeURIComponent(
                transfer.block_hash
            )}&operation=${encodeURIComponent(
                transfer.operation_index
            )}`;

        row.innerHTML = `
            <span class="analytics-transfer-icon">⇄</span>

            <span class="analytics-transfer-route">
                <strong>
                    ${shortAnalyticsValue(
                        transfer.sender,
                        9,
                        5
                    )}
                    →
                    ${shortAnalyticsValue(
                        transfer.recipient,
                        9,
                        5
                    )}
                </strong>

                <small>
                    ${timeAgo(
                        transfer.timestamp
                    )}
                </small>
            </span>

            <span class="analytics-transfer-amount">
                ${amount} ${token.name}
            </span>
        `;

        list.appendChild(row);
    });
}

function formatAnalyticsCurrency(
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

async function loadMarketAnalytics() {
    const status =
        document.getElementById(
            "analyticsMarketStatus"
        );

    try {
        const response =
            await fetch(
                "http://localhost:3000/api/market?range=1d",
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                `Market API returned ${response.status}`
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

        document.getElementById(
            "analyticsMarketPrice"
        ).textContent =
            `${formatAnalyticsCurrency(
                price,
                price < 1 ? 5 : 2
            )} KTA`;

        const changeElement =
            document.getElementById(
                "analyticsMarketChange"
            );

        changeElement.textContent =
            Number.isFinite(change)
                ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`
                : "—";

        changeElement.style.color =
            directionColor;

        document.getElementById(
            "analyticsMarketCap"
        ).textContent =
            formatAnalyticsCurrency(
                market.marketCap
            );

        document.getElementById(
            "analyticsMarketVolume"
        ).textContent =
            formatAnalyticsCurrency(
                market.volume24h
            );

        document.getElementById(
            "analyticsMarketSupply"
        ).textContent =
            `${Number(
                market.circulatingSupply
            ).toLocaleString(
                undefined,
                {
                    notation: "compact",
                    maximumFractionDigits: 2
                }
            )} KTA`;

        document.getElementById(
            "analyticsMarketAth"
        ).textContent =
            formatAnalyticsCurrency(
                market.allTimeHigh,
                2
            );

        status.textContent =
            `Live · Updated ${timeAgo(
                market.updatedAt
            )}`;

        status.style.color =
            directionColor;
    } catch (error) {
        console.error(
            "Market analytics loading error:",
            error
        );

        status.textContent =
            "Market feed temporarily unavailable";
        status.style.color =
            "#b45309";
    }
}

function initializeAnalyticsTabs() {
    const networkTab =
        document.getElementById(
            "networkTab"
        );

    const marketTab =
        document.getElementById(
            "marketTab"
        );

    const networkView =
        document.getElementById(
            "networkAnalytics"
        );

    const marketView =
        document.getElementById(
            "marketAnalytics"
        );

    function selectView(view) {
        const showNetwork =
            view === "network";

        networkView.hidden =
            !showNetwork;

        marketView.hidden =
            showNetwork;

        networkTab.classList.toggle(
            "active",
            showNetwork
        );

        marketTab.classList.toggle(
            "active",
            !showNetwork
        );

        networkTab.setAttribute(
            "aria-selected",
            String(showNetwork)
        );

        marketTab.setAttribute(
            "aria-selected",
            String(!showNetwork)
        );
    }

    networkTab.addEventListener(
        "click",
        () => selectView("network")
    );

    marketTab.addEventListener(
        "click",
        () => selectView("market")
    );
}

function showAnalyticsError(error) {
    console.error(
        "Analytics loading error:",
        error
    );

    document.getElementById(
        "networkAnalytics"
    ).innerHTML = `
        <article class="analytics-dashboard-card analytics-error-card">
            <h2>Analytics API unavailable</h2>
            <p>
                Start the KeetaView API with
                <code>node indexer/server.js</code>,
                then refresh this page.
            </p>
        </article>
    `;
}

async function loadAnalytics() {
    try {
        const response =
            await fetch(
                "http://localhost:3000/api/analytics"
            );

        if (!response.ok) {
            throw new Error(
                `Analytics API returned ${response.status}`
            );
        }

        const analytics =
            await response.json();

        const summary =
            analytics.summary;

        document.getElementById(
            "analyticsBlocks"
        ).textContent =
            Number(
                summary.blocks
            ).toLocaleString();

        document.getElementById(
            "analyticsTransfers"
        ).textContent =
            Number(
                summary.transfers
            ).toLocaleString();

        document.getElementById(
            "analyticsAccounts"
        ).textContent =
            Number(
                summary.accounts
            ).toLocaleString();

        document.getElementById(
            "averageOperations"
        ).textContent =
            Number(
                summary.averageOperations
            ).toFixed(2);

        document.getElementById(
            "analyticsOperations"
        ).textContent =
            Number(
                summary.operations
            ).toLocaleString();

        document.getElementById(
            "firstIndexed"
        ).textContent =
            formatIndexedDate(
                summary.firstTimestamp
            );

        document.getElementById(
            "latestIndexed"
        ).textContent =
            formatIndexedDate(
                summary.latestTimestamp
            );

        renderActivityChart(
            analytics.activity
        );

        renderRankedAccounts(
            "topSenders",
            analytics.topSenders,
            "transfers"
        );

        renderRankedAccounts(
            "topRecipients",
            analytics.topRecipients,
            "transfers"
        );

        await Promise.all([
            renderTokenActivity(
                analytics.tokenActivity
            ),
            renderRecentTransfers(
                analytics.recentTransfers
            )
        ]);
    } catch (error) {
        showAnalyticsError(error);
    }
}

initializeAnalyticsTabs();
loadAnalytics();
loadMarketAnalytics();

window.setInterval(
    loadMarketAnalytics,
    60 * 1000
);
