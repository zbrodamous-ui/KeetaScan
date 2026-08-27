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
const keetaScanThemes = [
    "light",
    "clean",
    "dim",
    "dark"
];

const keetaScanThemeNames = {
    light: "Soft Light",
    clean: "Clean White",
    dim: "Dim Gray",
    dark: "Dark Navy"
};

function initializeThemeToggle() {
    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem(
            "keetaScanTheme"
        );

    const normalizedTheme =
        savedTheme === "soft"
            ? "light"
            : savedTheme;

    const preferredTheme =
        keetaScanThemes.includes(
            normalizedTheme
        )
            ? normalizedTheme
            : "light";

    applyTheme(
        preferredTheme
    );

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener(
        "click",
        () => {
            const currentTheme =
                document.documentElement
                    .dataset.theme ||
                "light";

            const currentIndex =
                keetaScanThemes.indexOf(
                    currentTheme
                );

            const nextTheme =
                keetaScanThemes[
                    (
                        currentIndex + 1
                    ) %
                    keetaScanThemes.length
                ];

            applyTheme(
                nextTheme
            );

            localStorage.setItem(
                "keetaScanTheme",
                nextTheme
            );
        }
    );
}

function applyTheme(theme) {
    const safeTheme =
        keetaScanThemes.includes(theme)
            ? theme
            : "light";

    document.documentElement
        .dataset.theme =
        safeTheme;

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    if (!themeToggle) {
        return;
    }

    const currentIndex =
        keetaScanThemes.indexOf(
            safeTheme
        );

    const nextTheme =
        keetaScanThemes[
            (
                currentIndex + 1
            ) %
            keetaScanThemes.length
        ];

    themeToggle.textContent =
        keetaScanThemeNames[
            safeTheme
        ];

    themeToggle.setAttribute(
        "aria-label",
        `Current appearance: ${
            keetaScanThemeNames[
                safeTheme
            ]
        }. Switch to ${
            keetaScanThemeNames[
                nextTheme
            ]
        }.`
    );

    themeToggle.title =
        `Switch to ${
            keetaScanThemeNames[
                nextTheme
            ]
        }`;
}

initializeThemeToggle();
