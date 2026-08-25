const client =
    KeetaNet.Client.fromNetwork("main");

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
        const history =
           await client.getHistory(null, { depth: 50 });

       allBlocks =
    history
        .flatMap((entry) => entry.voteStaple.blocks)
        .sort((a, b) => b.date - a.date);
            blocksPageList.textContent = "";

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
previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        renderBlocksPage();
    }
})

nextButton.addEventListener("click", () => {
    const totalPages =
        Math.ceil(
            allBlocks.length / blocksPerPage
        );

    if (currentPage < totalPages) {
        currentPage += 1;
        renderBlocksPage();
    }
});
loadBlocksPage();

function renderBlocksPage() {
    blocksPageList.textContent = "";

    const startIndex =
        (currentPage - 1) * blocksPerPage;

    const endIndex =
        startIndex + blocksPerPage;

    const blocksForPage =
        allBlocks.slice(startIndex, endIndex);

    blocksForPage.forEach((block) => {
        const row =
            document.createElement("div");

        row.className =
            "activity-row";

        row.style.cursor =
            "pointer";

        row.addEventListener("click", () => {
            window.location.href =
                `block.html?hash=${encodeURIComponent(
                    block.hash.toString()
                )}`;
        });

        row.innerHTML = `
            <span>
                <a href="block.html?hash=${encodeURIComponent(
                    block.hash.toString()
                )}">
                    ${block.hash.toString().slice(0, 8)}...
                </a>
            </span>

            <span>${timeAgo(block.date)}</span>

            <span>${block.operations.length}</span>

            <span>
                ${
                    block.account?.publicKeyString
                        ?.toString()
                        .slice(0, 12) || "Unknown"
                }...
            </span>

            <span>${block.network}</span>
        `;

        blocksPageList.appendChild(row);
    });

    const totalPages =
        Math.ceil(
            allBlocks.length / blocksPerPage
        );

    pageNumber.textContent =
        `Page ${currentPage}`;

    previousButton.disabled =
        currentPage === 1;

    nextButton.disabled =
        currentPage >= totalPages;
}