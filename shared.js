function timeAgo(timestamp) {
    const seconds =
        Math.floor(
            (Date.now() - new Date(timestamp).getTime()) / 1000
        );

    if (seconds < 60) {
        return `${seconds} sec ago`;
    }

    const minutes =
        Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    const hours =
        Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days =
        Math.floor(hours / 24);

    return `${days} day${days === 1 ? "" : "s"} ago`;
}

function formatTokenAmount(amount, decimals, symbol = "") {
    const rawAmount =
        BigInt(amount);

    const divisor =
        10n ** BigInt(decimals);

    const wholePart =
        Number(rawAmount / divisor);

    const fractionalPart =
        Number(rawAmount % divisor) / Number(divisor);

    const value =
        wholePart + fractionalPart;

    let display;

    if (value >= 1_000_000_000) {
        display =
            (value / 1_000_000_000).toFixed(2) +
            " Billion";
    }
    else if (value >= 1_000_000) {
        display =
            (value / 1_000_000).toFixed(2) +
            " Million";
    }
    else if (value >= 1_000) {
        display =
            value.toLocaleString(undefined, {
                maximumFractionDigits: 2
            });
    }
    else if (value >= 1) {
        display =
            value.toFixed(2);
    }
    else {
        display =
            value.toFixed(6);
    }

    return symbol
        ? `${display} ${symbol}`
        : display;
}
function initializeThemeToggle() {
    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("keetaScanTheme");

    const preferredTheme =
        savedTheme ||
        (
            window.matchMedia("(prefers-color-scheme: light)").matches
                ? "light"
                : "dark"
        );

    applyTheme(preferredTheme);

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.dataset.theme || "dark";

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        applyTheme(nextTheme);

        localStorage.setItem(
            "keetaScanTheme",
            nextTheme
        );
    });
}

function applyTheme(theme) {
    document.documentElement.dataset.theme =
        theme;

    const themeToggle =
        document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }

    const lightModeActive =
        theme === "light";

    themeToggle.textContent =
        lightModeActive
            ? "Dark Mode"
            : "Light Mode";

    themeToggle.setAttribute(
        "aria-label",
        lightModeActive
            ? "Switch to dark mode"
            : "Switch to light mode"
    );
}

initializeThemeToggle();