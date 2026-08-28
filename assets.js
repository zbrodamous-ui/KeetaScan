const client =
    KeetaNet.Client.fromNetwork("main");
function loadKnownAssets() {
    const saved =
        localStorage.getItem(
            "keetascan_known_assets"
        );

    return saved
        ? JSON.parse(saved)
        : [];
}

function shortAddress(address) {
    return `${address.slice(0, 14)}...${address.slice(-6)}`;
}
function formatAssetSupply(rawSupply, decimalPlaces) {
    const raw =
        BigInt(rawSupply);

    const decimals =
        Number(decimalPlaces || 0);

    if (decimals === 0) {
        return raw.toLocaleString();
    }

    const divisor =
        10n ** BigInt(decimals);

    const whole =
        raw / divisor;

    const remainder =
        raw % divisor;

    let fraction =
        remainder
            .toString()
            .padStart(decimals, "0")
            .replace(/0+$/, "");

    const wholeFormatted =
        whole.toLocaleString();

    return fraction
        ? `${wholeFormatted}.${fraction}`
        : wholeFormatted;
}
function loadAssetsPage() {
    const knownAssets =
        loadKnownAssets();

    const knownAssetsList =
        document.getElementById(
            "knownAssetsList"
        );

    knownAssetsList.innerHTML = "";

    if (knownAssets.length === 0) {
        knownAssetsList.textContent =
            "No known assets yet.";
        return;
    }

    knownAssets.forEach(
        (assetAddress, index) => {
            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "asset-list-row";

            row.tabIndex = 0;
            row.setAttribute(
                "role",
                "link"
            );

            const openAsset = () => {
                window.location.assign(
                    `asset.html?asset=${encodeURIComponent(
                        assetAddress
                    )}`
                );
            };

            row.addEventListener(
                "click",
                (event) => {
                    if (
                        event.target.closest("a")
                    ) {
                        return;
                    }

                    openAsset();
                }
            );

            row.addEventListener(
                "keydown",
                (event) => {
                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {
                        event.preventDefault();
                        openAsset();
                    }
                }
            );

            row.innerHTML = `
                <span>
                    #${index + 1}
                </span>

                <a
                    href="asset.html?asset=${encodeURIComponent(assetAddress)}"
                >
                    ${shortAddress(assetAddress)}
                </a>
            `;

            knownAssetsList.appendChild(
                row
            );
            client.getAccountInfo(assetAddress)
    .then((assetInfo) => {
        if (!assetInfo?.info) {
            return;
        }
        let formattedSupply =
    assetInfo.info.supply?.toString() || "—";
        try {
    const metadata =
        JSON.parse(
            atob(assetInfo.info.metadata)
        );
    formattedSupply =
    formatAssetSupply(
         assetInfo.info.supply,
        metadata.decimalPlaces
    );
} catch (error) {
    console.log(
        assetInfo.info.name,
        "has no readable decimal metadata"
    );
}
        row.innerHTML = `
    <span class="asset-symbol">
        ${assetInfo.info.name || "Unknown"}
    </span>

    <span class="asset-name">
        ${assetInfo.info.description || "—"}
    </span>

    <a
        class="asset-address"
        href="asset.html?asset=${encodeURIComponent(assetAddress)}"
    >
        ${shortAddress(assetAddress)}
</a>
<span class="asset-supply">
    ${formattedSupply} ${assetInfo.info.name || ""}
</span>
`;
    })
    .catch((error) => {
        console.error(
            "ASSET INFO ERROR:",
            assetAddress,
            error
        );
    });
        }
    );
}

loadAssetsPage();