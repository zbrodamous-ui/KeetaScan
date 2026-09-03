const systemStatus = document.getElementById("systemStatus");
const refreshStatusButton = document.getElementById("refreshStatus");
const statusMessage = document.getElementById("statusMessage");

const fields = {
    blocks: document.getElementById("statusBlocks"),
    transfers: document.getElementById("statusTransfers"),
    accounts: document.getElementById("statusAccounts"),
    operations: document.getElementById("statusOperations"),
    firstIndexed: document.getElementById("statusFirstIndexed"),
    latestIndexed: document.getElementById("statusLatestIndexed"),
    averageOperations:
        document.getElementById("statusAverageOperations"),
    lastChecked: document.getElementById("statusLastChecked")
};

const apiIndicator = document.getElementById("apiIndicator");
const databaseIndicator =
    document.getElementById("databaseIndicator");
const apiState = document.getElementById("apiState");
const databaseState = document.getElementById("databaseState");
const marketIndicator =
    document.getElementById("marketIndicator");
const marketState =
    document.getElementById("marketState");

function formatNumber(value) {
    const number = Number(value);

    return Number.isFinite(number)
        ? number.toLocaleString()
        : "—";
}

function formatDate(value) {
    if (!value) {
        return "Not available";
    }

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? "Not available"
        : formatKeetaDate(date);
}

function setServiceState(indicator, label, online, text) {
    indicator.classList.remove("pending");
    indicator.classList.toggle("online", online);
    indicator.classList.toggle("offline", !online);
    label.textContent = text;
}

function setCheckingState() {
    systemStatus.dataset.state = "checking";
    systemStatus.querySelector("strong").textContent = "Checking API…";
    refreshStatusButton.disabled = true;
    refreshStatusButton.textContent = "Checking…";
}

async function checkMarketFeed() {
    marketIndicator.classList.remove(
        "online",
        "offline"
    );
    marketIndicator.classList.add("pending");
    marketState.textContent = "Checking";

    try {
        const response =
            await fetchKeetaView(
                "http://localhost:3000/api/market?range=1d",
                {
                    cache: "no-store"
                }
            );

        if (!response.ok) {
            throw new Error(
                "Market feed did not respond."
            );
        }

        const market =
            await response.json();

        const connected =
            Number.isFinite(
                Number(market.price)
            );

        setServiceState(
            marketIndicator,
            marketState,
            connected,
            connected
                ? "Connected"
                : "Unavailable"
        );
    } catch (error) {
        setServiceState(
            marketIndicator,
            marketState,
            false,
            "Unavailable"
        );

        console.warn(
            "Market feed check failed:",
            error
        );
    }
}

function setOnlineState() {
    systemStatus.dataset.state = "online";
    systemStatus.querySelector("strong").textContent = "Local API online";
    setServiceState(apiIndicator, apiState, true, "Online");
    setServiceState(databaseIndicator, databaseState, true, "Available");
    statusMessage.classList.remove("error");
}

function setOfflineState(error) {
    systemStatus.dataset.state = "offline";
    systemStatus.querySelector("strong").textContent = "Local API offline";
    setServiceState(apiIndicator, apiState, false, "Offline");
    setServiceState(
        databaseIndicator,
        databaseState,
        false,
        "Unavailable"
    );
    setServiceState(
        marketIndicator,
        marketState,
        false,
        "Unavailable"
    );

    statusMessage.classList.add("error");
    statusMessage.innerHTML = `
        <strong>KeetaView could not reach the local API</strong>
        <p>
            Start it with <code>npm start</code>, then press Refresh. The rest of the site can still open, but indexed
            lists will not update until the API is available.
        </p>
    `;

    console.error("Status check failed:", error);
}

function renderStatus(status, analytics) {
    const summary = analytics.summary || {};
    fields.blocks.textContent =
        formatNumber(status.blocks ?? summary.blocks);
    fields.transfers.textContent =
        formatNumber(status.transfers ?? summary.transfers);
    fields.accounts.textContent =
        formatNumber(status.accounts ?? summary.accounts);
    fields.operations.textContent =
        formatNumber(summary.operations);
    fields.firstIndexed.textContent =
        formatDate(summary.firstTimestamp);
    fields.latestIndexed.textContent =
        formatDate(summary.latestTimestamp);

    const average = Number(summary.averageOperations);
    fields.averageOperations.textContent =
        Number.isFinite(average) ? average.toFixed(2) : "—";

    fields.lastChecked.textContent = formatKeetaDate(new Date());
}

async function loadStatus() {
    setCheckingState();

    try {
        const [statusResponse, analyticsResponse] = await Promise.all([
            fetchKeetaView("http://localhost:3000/api/status", {
                cache: "no-store"
            }),
            fetchKeetaView("http://localhost:3000/api/analytics", {
                cache: "no-store"
            })
        ]);

        if (!statusResponse.ok || !analyticsResponse.ok) {
            throw new Error("A KeetaView status endpoint did not respond");
        }

        const [status, analytics] = await Promise.all([
            statusResponse.json(),
            analyticsResponse.json()
        ]);

        renderStatus(status, analytics);
        setOnlineState();
        await checkMarketFeed();
    } catch (error) {
        setOfflineState(error);
        fields.lastChecked.textContent = formatKeetaDate(new Date());
    } finally {
        refreshStatusButton.disabled = false;
        refreshStatusButton.textContent = "Refresh";
    }
}

refreshStatusButton.addEventListener("click", loadStatus);

loadStatus();
setInterval(loadStatus, 60000);
