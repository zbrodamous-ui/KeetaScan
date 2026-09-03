const blocksPageList = document.getElementById("blocksPageList");
const previousButton = document.getElementById("previousPage");
const nextButton = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");
const blockFilter = document.getElementById("blockFilter");
const blockResultCount = document.getElementById("blockResultCount");

const blocksPerPage = 15;
let currentPage = 1;
let totalBlocks = 0;
let loadedBlocks = [];

function blockUrl(hash) {
    return `block.html?hash=${encodeURIComponent(hash)}`;
}

function createBlockRow(block) {
    const row = document.createElement("a");
    row.className = "block-directory-row";
    row.href = blockUrl(block.hash);
    row.setAttribute("aria-label", `Open block ${block.hash}`);

    const operationCount = Number(block.operation_count || 0);
    const operationLabel =
        `${operationCount.toLocaleString()} ${operationCount === 1 ? "operation" : "operations"}`;

    row.innerHTML = `
        <span class="block-directory-hash" title="${block.hash}">
            ${block.hash.slice(0, 12)}...${block.hash.slice(-6)}
        </span>

        <span class="block-directory-age">
            ${timeAgo(block.timestamp)}
        </span>

        <span class="block-directory-operations">
            ${operationLabel}
        </span>

        <span class="block-directory-network">
            Mainnet
        </span>
    `;

    return row;
}

function renderBlocksPage() {
    const query = blockFilter.value.trim().toLowerCase();
    const visibleBlocks = query
        ? loadedBlocks.filter((block) =>
            String(block.hash).toLowerCase().includes(query)
        )
        : loadedBlocks;

    blocksPageList.innerHTML = "";

    if (visibleBlocks.length === 0) {
        const empty = document.createElement("p");
        empty.className = "blocks-empty";
        empty.textContent = query
            ? "No blocks on this page match that hash."
            : "No indexed blocks are available.";
        blocksPageList.appendChild(empty);
    } else {
        visibleBlocks.forEach((block) => {
            blocksPageList.appendChild(createBlockRow(block));
        });
    }

    const totalPages = Math.max(1, Math.ceil(totalBlocks / blocksPerPage));
    const firstBlock = totalBlocks === 0
        ? 0
        : ((currentPage - 1) * blocksPerPage) + 1;
    const lastBlock = Math.min(currentPage * blocksPerPage, totalBlocks);

    blockResultCount.textContent = query
        ? `${visibleBlocks.length} matching on this page`
        : `${firstBlock.toLocaleString()}–${lastBlock.toLocaleString()} of ${totalBlocks.toLocaleString()}`;

    pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage >= totalPages;
}

async function loadBlocksPage() {
    blocksPageList.innerHTML =
        '<p class="blocks-empty">Loading blocks…</p>';
    blockResultCount.textContent = "Loading blocks…";
    previousButton.disabled = true;
    nextButton.disabled = true;

    try {
        const offset = (currentPage - 1) * blocksPerPage;
        const [blocksResponse, statusResponse] = await Promise.all([
            fetchKeetaView(
                `http://localhost:3000/api/blocks?limit=${blocksPerPage}&offset=${offset}`
            ),
            fetchKeetaView("http://localhost:3000/api/status")
        ]);

        if (!blocksResponse.ok || !statusResponse.ok) {
            throw new Error("Unable to load indexed blocks");
        }

        loadedBlocks = await blocksResponse.json();
        const status = await statusResponse.json();
        totalBlocks = Number(status.blocks || 0);

        renderBlocksPage();
    } catch (error) {
        console.error("Error loading blocks page:", error);
        loadedBlocks = [];
        blocksPageList.innerHTML =
            '<p class="blocks-empty">Unable to load blocks. Make sure the KeetaView API server is running.</p>';
        blockResultCount.textContent = "Unavailable";
        pageNumber.textContent = "Page —";
        previousButton.disabled = true;
        nextButton.disabled = true;
    }
}

blockFilter.addEventListener("input", renderBlocksPage);

previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage -= 1;
        blockFilter.value = "";
        loadBlocksPage();
        document.querySelector(".blocks-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(totalBlocks / blocksPerPage);

    if (currentPage < totalPages) {
        currentPage += 1;
        blockFilter.value = "";
        loadBlocksPage();
        document.querySelector(".blocks-list-card")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

loadBlocksPage();
