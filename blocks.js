const blocksPageList =
    document.getElementById("blocksPageList");

const previousButton =
    document.getElementById("previousPage");

const nextButton =
    document.getElementById("nextPage");

const pageNumber =
    document.getElementById("pageNumber");

let currentPage = 1;

const blocksPerPage = 15;

let allBlocks = [];

async function loadBlocksPage() {
    try {
        blocksPageList.textContent =
            "Loading blocks...";

        const response =
            await fetch(
                "http://localhost:3000/api/blocks?limit=100"
            );

        if (!response.ok) {
            throw new Error(
                `API returned ${response.status}`
            );
        }

        allBlocks =
            await response.json();

        allBlocks.sort(
            (a, b) =>
                new Date(b.timestamp) -
                new Date(a.timestamp)
        );

        renderBlocksPage();
    } catch (error) {
        console.error(
            "Error loading blocks page:",
            error
        );

        blocksPageList.textContent =
            "Unable to load blocks.";
    }
}

function renderBlocksPage() {
    blocksPageList.textContent = "";

    const startIndex =
        (currentPage - 1) *
        blocksPerPage;

    const endIndex =
        startIndex +
        blocksPerPage;

    const blocksForPage =
        allBlocks.slice(
            startIndex,
            endIndex
        );

    blocksForPage.forEach((block) => {
        const row =
            document.createElement("div");

        row.className =
            "activity-row";

        row.style.cursor =
            "pointer";

        row.addEventListener(
            "click",
            () => {
                window.location.href =
                    `block.html?hash=${encodeURIComponent(
                        block.hash
                    )}`;
            }
        );

        row.innerHTML = `
            <span>
                <a href="block.html?hash=${encodeURIComponent(
                    block.hash
                )}">
                    ${block.hash.slice(0, 8)}...
                </a>
            </span>

            <span>
                ${timeAgo(block.timestamp)}
            </span>

            <span>
                ${block.operation_count}
            </span>

            <span>—</span>

            <span>Mainnet</span>
        `;

        blocksPageList.appendChild(
            row
        );
    });

    const totalPages =
        Math.ceil(
            allBlocks.length /
            blocksPerPage
        );

    pageNumber.textContent =
        `Page ${currentPage}`;

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
            renderBlocksPage();
        }
    }
);

nextButton.addEventListener(
    "click",
    () => {
        const totalPages =
            Math.ceil(
                allBlocks.length /
                blocksPerPage
            );

        if (
            currentPage <
            totalPages
        ) {
            currentPage += 1;
            renderBlocksPage();
        }
    }
);

loadBlocksPage();