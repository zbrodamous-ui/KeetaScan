const addressesPageList =
    document.getElementById("addressesPageList");
const previousPageButton =
    document.getElementById("previousPage");
const nextPageButton =
    document.getElementById("nextPage");
const pageNumber =
    document.getElementById("pageNumber");
const addressFilter =
    document.getElementById("addressFilter");
const addressResultCount =
    document.getElementById("addressResultCount");

const addressesPerPage = 20;

let currentPage = 1;
let totalAddresses = 0;
let loadedAddresses = [];

function shortAddress(address) {
    if (!address || address.length <= 32) {
        return address || "Unknown";
    }

    return formatKeetaIdentifier(address, 20, 10);
}

function addressUrl(address) {
    return `address.html?address=${encodeURIComponent(address)}`;
}

function firstObserved(timestamp) {
    if (!timestamp) {
        return "Not available";
    }

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
        return "Not available";
    }

    return timeAgo(date);
}

function createAddressRow(account) {
    const row = document.createElement("div");
    row.className = "address-directory-row";

    row.innerHTML = `
        <span class="address-directory-value" title="${account.address}">
            <a href="${addressUrl(account.address)}">
                ${shortAddress(account.address)}
            </a>
        </span>

        <span class="address-directory-age">
            ${firstObserved(account.first_seen_timestamp)}
        </span>

        <span class="address-directory-network">
            Mainnet
        </span>
    `;

    const addressValue =
        row.querySelector(".address-directory-value");

    attachKeetaCopyButton(
        addressValue,
        account.address,
        "address"
    );

    row.addEventListener("click", (event) => {
        if (event.target.closest("a, button")) {
            return;
        }

        window.location.assign(
            addressUrl(account.address)
        );
    });

    return row;
}

function renderAddressesPage() {
    const query = addressFilter.value.trim().toLowerCase();
    const visibleAddresses = query
        ? loadedAddresses.filter((account) =>
            String(account.address).toLowerCase().includes(query)
        )
        : loadedAddresses;

    addressesPageList.innerHTML = "";

    if (visibleAddresses.length === 0) {
        const empty = document.createElement("p");
        empty.className = "addresses-empty";
        empty.textContent = query
            ? "No addresses on this page match that filter."
            : "No indexed addresses are available.";
        addressesPageList.appendChild(empty);
    } else {
        visibleAddresses.forEach((account) => {
            addressesPageList.appendChild(createAddressRow(account));
        });
    }

    const totalPages =
        Math.max(1, Math.ceil(totalAddresses / addressesPerPage));
    const firstAddress = totalAddresses === 0
        ? 0
        : ((currentPage - 1) * addressesPerPage) + 1;
    const lastAddress =
        Math.min(currentPage * addressesPerPage, totalAddresses);

    addressResultCount.textContent = query
        ? `${visibleAddresses.length} matching on this page`
        : `${firstAddress.toLocaleString()}–${lastAddress.toLocaleString()} of ${totalAddresses.toLocaleString()}`;

    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
    previousPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage >= totalPages;
}

async function loadAddressesPage() {
    addressesPageList.innerHTML =
        '<p class="addresses-empty">Loading addresses…</p>';
    addressResultCount.textContent = "Loading addresses…";
    previousPageButton.disabled = true;
    nextPageButton.disabled = true;

    try {
        const offset = (currentPage - 1) * addressesPerPage;
        const [accountsResponse, statusResponse] = await Promise.all([
            fetchKeetaView(
                `http://localhost:3000/api/accounts?limit=${addressesPerPage}&offset=${offset}`
            ),
            fetchKeetaView("http://localhost:3000/api/status")
        ]);

        if (!accountsResponse.ok || !statusResponse.ok) {
            throw new Error("Unable to load indexed addresses");
        }

        loadedAddresses = await accountsResponse.json();
        const status = await statusResponse.json();
        totalAddresses = Number(status.accounts || 0);

        renderAddressesPage();
    } catch (error) {
        console.error("Error loading addresses page:", error);
        loadedAddresses = [];
        addressesPageList.innerHTML =
            '<p class="addresses-empty">Unable to load addresses. Make sure the KeetaView API server is running.</p>';
        addressResultCount.textContent = "Unavailable";
        pageNumber.textContent = "Page —";
        previousPageButton.disabled = true;
        nextPageButton.disabled = true;
    }
}

addressFilter.addEventListener("input", renderAddressesPage);

previousPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        addressFilter.value = "";
        loadAddressesPage();
        document.querySelector(".addresses-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

nextPageButton.addEventListener("click", () => {
    const totalPages =
        Math.ceil(totalAddresses / addressesPerPage);

    if (currentPage < totalPages) {
        currentPage += 1;
        addressFilter.value = "";
        loadAddressesPage();
        document.querySelector(".addresses-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

loadAddressesPage();
