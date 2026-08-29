const client = KeetaNet.Client.fromNetwork("main");

const pageSize = 20;
let assets = [];
let filteredAssets = [];
let currentPage = 1;

const knownAssetsList = document.getElementById("knownAssetsList");
const assetFilter = document.getElementById("assetFilter");
const assetResultCount = document.getElementById("assetResultCount");
const assetPagination = document.getElementById("assetPagination");
const assetPrevious = document.getElementById("assetPrevious");
const assetNext = document.getElementById("assetNext");
const assetPageStatus = document.getElementById("assetPageStatus");

function loadKnownAssets() {
    try {
        const saved = localStorage.getItem("keetascan_known_assets");
        const parsed = saved ? JSON.parse(saved) : [];

        return Array.isArray(parsed)
            ? [...new Set(parsed.filter((address) => typeof address === "string"))]
            : [];
    } catch (error) {
        console.error("Could not read known assets:", error);
        return [];
    }
}

function shortAddress(address) {
    if (!address || address.length <= 24) {
        return address || "Unknown";
    }

    return formatKeetaIdentifier(address, 14, 6);
}

function formatAssetSupply(rawSupply, decimalPlaces) {
    if (rawSupply === undefined || rawSupply === null) {
        return "—";
    }

    const raw = BigInt(rawSupply);
    const decimals = Math.max(0, Number(decimalPlaces || 0));

    if (decimals === 0) {
        return raw.toLocaleString();
    }

    const divisor = 10n ** BigInt(decimals);
    const whole = raw / divisor;
    const remainder = raw % divisor;
    const fraction = remainder
        .toString()
        .padStart(decimals, "0")
        .replace(/0+$/, "");

    return fraction
        ? `${whole.toLocaleString()}.${fraction}`
        : whole.toLocaleString();
}

function readMetadata(assetInfo) {
    try {
        if (!assetInfo?.info?.metadata) {
            return {};
        }

        return JSON.parse(atob(assetInfo.info.metadata));
    } catch (error) {
        return {};
    }
}

function assetUrl(address) {
    return `asset.html?asset=${encodeURIComponent(address)}`;
}

function createAssetRow(asset) {
    const row = document.createElement("a");
    row.className = "asset-directory-row";
    row.href = assetUrl(asset.address);
    row.setAttribute("aria-label", `Open ${asset.symbol} asset details`);

    row.innerHTML = `
        <span class="asset-directory-symbol">
            ${asset.symbol}
        </span>

        <span class="asset-directory-name">
            ${asset.name}
        </span>

        <span class="asset-directory-address" title="${asset.address}">
            ${shortAddress(asset.address)}
        </span>

        <span class="asset-directory-supply">
            ${asset.supply} ${asset.symbol === "Unknown" ? "" : asset.symbol}
        </span>
    `;

    return row;
}

function renderAssets() {
    knownAssetsList.innerHTML = "";

    const totalResults = filteredAssets.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    assetResultCount.textContent =
        `${totalResults.toLocaleString()} ${totalResults === 1 ? "asset" : "assets"}`;

    if (totalResults === 0) {
        const empty = document.createElement("p");
        empty.className = "assets-empty";
        empty.textContent = assets.length
            ? "No assets match that filter."
            : "No known assets yet.";
        knownAssetsList.appendChild(empty);
        assetPagination.hidden = true;
        return;
    }

    const start = (currentPage - 1) * pageSize;
    const pageAssets = filteredAssets.slice(start, start + pageSize);

    pageAssets.forEach((asset) => {
        knownAssetsList.appendChild(createAssetRow(asset));
    });

    assetPageStatus.textContent = `Page ${currentPage} of ${totalPages}`;
    assetPrevious.disabled = currentPage === 1;
    assetNext.disabled = currentPage === totalPages;
    assetPagination.hidden = totalPages <= 1;
}

function filterAssets() {
    const query = assetFilter.value.trim().toLowerCase();

    filteredAssets = query
        ? assets.filter((asset) =>
            [asset.symbol, asset.name, asset.address]
                .some((value) => value.toLowerCase().includes(query))
        )
        : [...assets];

    currentPage = 1;
    renderAssets();
}

async function loadAsset(address) {
    const fallback = {
        address,
        symbol: "Unknown",
        name: "Unnamed asset",
        supply: "—"
    };

    try {
        const assetInfo = await client.getAccountInfo(address);

        if (!assetInfo?.info) {
            return fallback;
        }

        const metadata = readMetadata(assetInfo);
        const symbol = assetInfo.info.name || "Unknown";
        const name = assetInfo.info.description || metadata.name || "Unnamed asset";

        let supply = "—";

        try {
            supply = formatAssetSupply(
                assetInfo.info.supply,
                metadata.decimalPlaces
            );
        } catch (error) {
            supply = assetInfo.info.supply?.toString() || "—";
        }

        return {
            address,
            symbol,
            name,
            supply
        };
    } catch (error) {
        console.error("ASSET INFO ERROR:", address, error);
        return fallback;
    }
}

async function loadAssetsPage() {
    const knownAssets = loadKnownAssets();

    if (knownAssets.length === 0) {
        assets = [];
        filteredAssets = [];
        renderAssets();
        return;
    }

    assetResultCount.textContent =
        `Loading ${knownAssets.length.toLocaleString()} assets…`;

    assets = await Promise.all(knownAssets.map(loadAsset));
    assets.sort((first, second) =>
        first.symbol.localeCompare(second.symbol, undefined, {
            numeric: true,
            sensitivity: "base"
        })
    );

    filteredAssets = [...assets];
    renderAssets();
}

assetFilter.addEventListener("input", filterAssets);

assetPrevious.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        renderAssets();
        document.querySelector(".assets-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

assetNext.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredAssets.length / pageSize);

    if (currentPage < totalPages) {
        currentPage += 1;
        renderAssets();
        document.querySelector(".assets-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

loadAssetsPage();
