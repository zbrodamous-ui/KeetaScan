const addressesPageList =
    document.getElementById("addressesPageList");

const previousButton =
    document.getElementById("previousPage");

const nextButton =
    document.getElementById("nextPage");

const pageNumber =
    document.getElementById("pageNumber");

const addressesPerPage = 15;

let currentPage = 1;
let totalAddresses = 0;

async function loadAddressesPage() {
    try {
        addressesPageList.textContent =
            "Loading addresses...";

        const offset =
            (currentPage - 1) *
            addressesPerPage;

        const [
            accountsResponse,
            statusResponse
        ] = await Promise.all([
            fetch(
                `http://localhost:3000/api/accounts?limit=${addressesPerPage}&offset=${offset}`
            ),
            fetch(
                "http://localhost:3000/api/status"
            )
        ]);

        if (
            !accountsResponse.ok ||
            !statusResponse.ok
        ) {
            throw new Error(
                "Unable to load indexed addresses"
            );
        }

        const accounts =
            await accountsResponse.json();

        const status =
            await statusResponse.json();

        totalAddresses =
            Number(status.accounts);

        renderAddressesPage(accounts);
    } catch (error) {
        console.error(
            "Error loading addresses page:",
            error
        );

        addressesPageList.textContent =
            "Unable to load addresses.";
    }
}

function renderAddressesPage(accounts) {
    addressesPageList.textContent = "";

    accounts.forEach((account) => {
        const row =
            document.createElement("div");

        row.className =
            "address-row";

        row.innerHTML = `
            <span>
                <a href="address.html?address=${encodeURIComponent(
                    account.address
                )}">
                    ${account.address}
                </a>
            </span>

            <span>
                ${timeAgo(
                    new Date(
                        account.first_seen_timestamp
                    )
                )}
            </span>

            <span>Mainnet</span>
        `;

        row.addEventListener(
            "click",
            () => {
                window.location.href =
                    `address.html?address=${encodeURIComponent(
                        account.address
                    )}`;
            }
        );

        addressesPageList.appendChild(row);
    });

    if (accounts.length === 0) {
        addressesPageList.textContent =
            "No indexed addresses found.";
    }

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                totalAddresses /
                addressesPerPage
            )
        );

    pageNumber.textContent =
        `Page ${currentPage} of ${totalPages}`;

    previousButton.disabled =
        currentPage === 1;

    nextButton.disabled =
        currentPage >= totalPages;
}

previousButton.addEventListener(
    "click",
    () => {
        if (currentPage > 1) {
            currentPage -= 1;
            loadAddressesPage();
        }
    }
);

nextButton.addEventListener(
    "click",
    () => {
        const totalPages =
            Math.ceil(
                totalAddresses /
                addressesPerPage
            );

        if (currentPage < totalPages) {
            currentPage += 1;
            loadAddressesPage();
        }
    }
);

loadAddressesPage();
