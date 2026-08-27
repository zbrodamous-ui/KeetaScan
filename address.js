const client = KeetaNet.Client.fromNetwork("main");

const params = new URLSearchParams(window.location.search);

const address = params.get("address");

console.log("Selected address:", address);


const addressTokenInfoCache =
    new Map();

async function getAddressTokenDisplay(
    tokenAddress,
    rawAmount
) {
    let tokenInfo =
        addressTokenInfoCache.get(
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

        addressTokenInfoCache.set(
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

async function loadAddress() {
    try {
        const accountInfo =
            await client.getAccountInfo(address);

        const addressTitle =
            document.getElementById("addressTitle");

        const addressDetails =
            document.getElementById("addressDetails");

        const balancesTitle =
            document.getElementById("balancesTitle");

        const balancesList =
            document.getElementById("balancesList");

        addressTitle.textContent =
            `Address ${address.slice(0, 16)}...`;

        addressDetails.innerHTML = `
            <div class="detail-label">Address</div>
            <div class="detail-value">${address}</div>

            <div class="detail-label">Name</div>
            <div class="detail-value">
                ${accountInfo.info.name || "Not set"}
            </div>

            <div class="detail-label">Description</div>
            <div class="detail-value">
                ${accountInfo.info.description || "Not set"}
            </div>

            <div class="detail-label">Head Block Height</div>
            <div class="detail-value">
                ${accountInfo.currentHeadBlockHeight ?? "Not available"}
            </div>
        `;

        balancesTitle.textContent = "Balances";
        balancesList.innerHTML = "";

        for (const balanceEntry of accountInfo.balances) {

            let tokenName =
    balanceEntry.token.publicKeyString.toString();

let formattedBalance =
    balanceEntry.balance.toString();

    try {
    const tokenInfo =
        await client.getAccountInfo(balanceEntry.token);

    if (tokenInfo?.info?.name) {
        tokenName =
            tokenInfo.info.name;
    }

    if (tokenInfo?.info?.metadata) {
        const metadata =
            JSON.parse(
                atob(tokenInfo.info.metadata)
            );

        if (metadata.decimalPlaces !== undefined) {
            formattedBalance =
                formatTokenAmount(
                    balanceEntry.balance,
                    metadata.decimalPlaces
                );
        }
    }

} catch (error) {
    console.log("Unable to load token info.");
}

            const card = document.createElement("div");

            card.className = "operation-card";

            card.innerHTML = `
                <h3>Token Balance</h3>

                <p>
                    <strong>Token:</strong>
                   ${tokenName}
                </p>

                <p>
                    <strong>Balance:</strong>
                    ${formattedBalance}
                </p>
            `;

            balancesList.appendChild(card);
        }

const addressActivityList =
    document.getElementById("addressActivityList");

addressActivityList.innerHTML = "";

const response =
    await fetch(
        `http://localhost:3000/api/transfers?limit=100&address=${encodeURIComponent(
            address
        )}`
    );

if (!response.ok) {
    throw new Error(
        `API request failed: ${response.status}`
    );
}

const transfers =
    await response.json();

if (transfers.length === 0) {
    addressActivityList.textContent =
        "No indexed activity found for this address.";
} else {
    for (const transfer of transfers) {
        const sender =
            transfer.sender ||
            "Not available";

        const recipient =
            transfer.recipient ||
            "Not available";

        const shortSender =
            sender === "Not available"
                ? sender
                : `${sender.slice(0, 12)}...${sender.slice(-6)}`;

        const shortRecipient =
            recipient === "Not available"
                ? recipient
                : `${recipient.slice(0, 12)}...${recipient.slice(-6)}`;

        let tokenDisplay;

        try {
            tokenDisplay =
                await getAddressTokenDisplay(
                    transfer.token,
                    transfer.amount
                );
        } catch (error) {
            console.warn(
                "Unable to format address activity token:",
                transfer.token,
                error
            );

            tokenDisplay = {
                amount:
                    BigInt(
                        transfer.amount
                    ).toLocaleString(),
                name:
                    `${transfer.token.slice(0, 8)}...`
            };
        }

        const activityRow =
            document.createElement("div");

        activityRow.className =
            "activity-row transaction-row";

        activityRow.innerHTML = `
            <span>
                <a href="block.html?hash=${encodeURIComponent(
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

            <span>${shortSender}</span>

            <span>${shortRecipient}</span>

            <span>
                ${tokenDisplay.amount}
                ${tokenDisplay.name}
            </span>
        `;

        activityRow
            .querySelectorAll("a")
            .forEach((link) => {
                link.addEventListener(
                    "click",
                    (event) => {
                        event.stopPropagation();
                    }
                );
            });

        activityRow.addEventListener(
            "click",
            () => {
                window.location.href =
                    `transaction.html?block=${encodeURIComponent(
                        transfer.block_hash
                    )}&operation=${transfer.operation_index}`;
            }
        );

        addressActivityList.appendChild(
            activityRow
        );
    }
}

    } catch (error) {
        console.error("Address loading error:", error);
    }
}

if (address) {
    loadAddress();
} else {
    const addressDetails =
        document.getElementById("addressDetails");

    const balancesTitle =
        document.getElementById("balancesTitle");

    const balancesList =
        document.getElementById("balancesList");

    addressDetails.textContent =
        "No address was provided. Search for an address from the homepage.";

    balancesTitle.textContent = "";
    balancesList.textContent = "";
}