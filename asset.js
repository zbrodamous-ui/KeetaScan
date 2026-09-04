const client =
    KeetaNet.Client.fromNetwork("main");

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

async function loadAsset() {
    const params =
        new URLSearchParams(
            window.location.search
        );

    const assetAddress =
        params.get("asset");

    if (!assetAddress) {
        document.getElementById(
            "assetTitle"
        ).textContent =
            "No asset provided";

        return;
    }

    document.getElementById(
        "assetAddress"
    ).textContent =
        assetAddress;

    try {
        const assetInfo =
            await withKeetaViewTimeout(
                client.getAccountInfo(
                    assetAddress
                )
            );

        if (!assetInfo?.info) {
            document.getElementById(
                "assetTitle"
            ).textContent =
                "Asset information unavailable";

            return;
        }

        document.getElementById(
            "assetTitle"
        ).textContent =
            assetInfo.info.name ||
            "Unknown Asset";

        document.getElementById(
            "assetDescription"
        ).textContent =
            assetInfo.info.description ||
            "";

        let decimalPlaces = 0;

        try {
            const metadata =
                JSON.parse(
                    atob(
                        assetInfo.info.metadata
                    )
                );

            decimalPlaces =
                Number(
                    metadata.decimalPlaces ||
                    0
                );
        } catch (error) {
            console.warn(
                "Unable to decode asset metadata:",
                error
            );
        }

        document.getElementById(
            "assetDecimals"
        ).textContent =
            decimalPlaces.toString();

        const formattedSupply =
            formatAssetSupply(
                assetInfo.info.supply,
                decimalPlaces
            );
const rawTotalSupply =
    await withKeetaViewTimeout(
        client.getTokenSupply(
            assetAddress
        )
    );

const totalSupply =
    formatAssetSupply(
        rawTotalSupply,
        decimalPlaces
    );
    document.getElementById(
    "assetSupply"
).textContent =
    `${totalSupply} ${assetInfo.info.name || ""}`;


            
await loadRecentTransfers(
    assetAddress,
    decimalPlaces,
    assetInfo.info.name || ""
);
    } catch (error) {
        console.error(
            "Error loading asset:",
            error
        );

        document.getElementById(
            "assetTitle"
        ).textContent =
            "Unable to load asset";
    }
}
function shortAddress(address) {
    if (!address || address === "Not available") {
        return "Not available";
    }

    return formatKeetaIdentifier(address);
}
async function loadRecentTransfers(
    assetAddress,
    decimalPlaces,
    assetName
) {
    const transfersList =
        document.getElementById(
            "assetTransfersList"
        );

    try {
        const history =
            await withKeetaViewTimeout(
                client.getHistory(
                    null,
                    { depth: 100 }
                )
            );

        const latestBlocks =
            history
                .flatMap(
                    (entry) =>
                        entry.voteStaple.blocks
                )
                .sort(
                    (a, b) =>
                        b.date - a.date
                );

        const matchingTransfers = [];
for (const block of latestBlocks) {
    for (
        let operationIndex = 0;
        operationIndex < block.operations.length;
        operationIndex++
    ) {
        const operation =
            block.operations[operationIndex];
                if (!operation.token) {
                    continue;
                }

                const tokenAddress =
                    operation.token
                        .publicKeyString
                        .toString();

                if (tokenAddress !== assetAddress) {
                    continue;
                }

                const sender =
                    block.account
                        ?.publicKeyString
                        ?.toString?.() ||
                    "Not available";

                const recipient =
                    operation.to
                        ?.publicKeyString
                        ?.toString?.() ||
                    "Not available";

                const amount =
                    operation.amount
                        ? formatAssetSupply(
                            operation.amount,
                            decimalPlaces
                        )
                        : "—";
                        const displayAmount =
    amount === "-"
        ? "-"
        : Number(amount.replace(/,/g, "")).toLocaleString(
              undefined,
              {
                  maximumFractionDigits: 6
              }
          );

               matchingTransfers.push({
                sender,
                recipient,
                amount,
                displayAmount,
                date: block.date,
                blockHash: block.hash.toString(),
                operationIndex,
            });

                if (matchingTransfers.length >= 10) {
                    break;
                }
            }

            if (matchingTransfers.length >= 10) {
                break;
            }
        }


        transfersList.innerHTML = "";

        if (matchingTransfers.length === 0) {
            transfersList.textContent =
                "No recent transfers found.";
            return;
        }

        matchingTransfers.forEach((transfer) => {
            const row =
                document.createElement("div");

            row.className =
                "asset-transfer-row";

            row.innerHTML = `
                <a
                    data-label="From"
                    href="address.html?address=${encodeURIComponent(transfer.sender)}"
                >
                    ${shortAddress(transfer.sender)}
                </a>

                <a
                    data-label="To"
                    href="address.html?address=${encodeURIComponent(transfer.recipient)}"
                >
                    ${shortAddress(transfer.recipient)}
                </a>

              <a
    data-label="Amount"
    href="transaction.html?block=${encodeURIComponent(transfer.blockHash)}&operation=${transfer.operationIndex}"
    class="asset-transfer-link"
>
    ${transfer.displayAmount} ${assetName}
</a>

                <span data-label="Age">
                    ${timeAgo(transfer.date)}
                </span>
            `; 

            transfersList.appendChild(row);
        });

    } catch (error) {
        console.error(
            "Error loading asset transfers:",
            error
        );

        transfersList.textContent =
            "Unable to load recent transfers.";
    }
}
loadAsset();