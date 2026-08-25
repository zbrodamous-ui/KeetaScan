const client = KeetaNet.Client.fromNetwork("main");

const params = new URLSearchParams(window.location.search);

const address = params.get("address");

console.log("Selected address:", address);

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

const history =
    await client.getHistory(null, { depth: 20 });

const recentBlocks =
    history
        .flatMap((entry) => entry.voteStaple.blocks)
        .sort((a, b) => b.date - a.date);

        let matchingActivityCount = 0;

recentBlocks.forEach((block) => {
    block.operations.forEach((operation, operationIndex) => {
        const sender =
            block.account?.publicKeyString?.toString?.() ||
            "Not available";

        const recipient =
            operation.to?.publicKeyString?.toString?.() ||
            "Not available";

        if (sender !== address && recipient !== address) {
            return;
        }

        matchingActivityCount += 1;

        const operationType =
            operation.constructor.name.replace(
                "src_client_BlockOperation",
                ""
            );

        const shortSender =
            sender === "Not available"
                ? sender
                : `${sender.slice(0, 12)}...${sender.slice(-6)}`;

        const shortRecipient =
            recipient === "Not available"
                ? recipient
                : `${recipient.slice(0, 12)}...${recipient.slice(-6)}`;

        const activityRow =
            document.createElement("div");

        activityRow.className =
            "activity-row transaction-row";

        activityRow.innerHTML = `
            <span>
                <a href="block.html?hash=${encodeURIComponent(
                    block.hash.toString()
                )}">
                    ${block.hash.toString().slice(0, 8)}...
                </a>
            </span>

            <span>${timeAgo(block.date)}</span>

            <span>${operationType}</span>

            <span>${shortSender}</span>

            <span>${shortRecipient}</span>
<span>
    ${
        operation.amount
            ? `${formatTokenAmount(operation.amount, 18)} KTA`
            : "Not available"
    }
</span>
`;
       activityRow.addEventListener("click", () => {
    window.location.href =
        `transaction.html?block=${encodeURIComponent(
            block.hash.toString()
        )}&operation=${operationIndex}`;
});

        addressActivityList.appendChild(activityRow);
    });
});

if (matchingActivityCount === 0) {
    addressActivityList.textContent =
        "No recent activity found for this address.";
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