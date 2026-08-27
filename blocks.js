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

let totalBlocks = 0;

async function loadBlocksPage() {
    try {
        blocksPageList.textContent =
            "Loading blocks...";

        const offset =
            (currentPage - 1) *
            blocksPerPage;

        const [
            blocksResponse,
            statusResponse
        ] =
            await Promise.all([
                fetch(
                    `http://localhost:3000/api/blocks?limit=${blocksPerPage}&offset=${offset}`
                ),
                fetch(
                    "http://localhost:3000/api/status"
                )
            ]);

        if (
            !blocksResponse.ok ||
            !statusResponse.ok
        ) {
            throw new Error(
                "Unable to load indexed blocks"
            );
        }

        const blocks =
            await blocksResponse.json();

        const status =
            await statusResponse.json();

        totalBlocks =
            Number(status.blocks);

        renderBlocksPage(blocks);
    } catch (error) {
        console.error(
            "Error loading blocks page:",
            error
        );

        blocksPageList.textContent =
            "Unable to load blocks.";
    }
}

function renderBlocksPage(blocks) {
    blocksPageList.textContent = "";

    blocks.forEach((block) => {
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

        blocksPageList.appendChild(row);
    });

    const totalPages =
        Math.ceil(
            totalBlocks /
            blocksPerPage
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
            loadBlocksPage();
        }
    }
);

nextButton.addEventListener(
    "click",
    () => {
        const totalPages =
            Math.ceil(
                totalBlocks /
                blocksPerPage
            );

        if (
            currentPage <
            totalPages
        ) {
            currentPage += 1;
            loadBlocksPage();
        }
    }
);

loadBlocksPage();