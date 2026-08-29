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
    "soft",
    "clean"
];

const keetaScanThemeNames = {
    soft: "Soft Gray",
    clean: "Clean White"
};

function getSavedTheme() {
    return localStorage.getItem("keetaScanTheme") === "clean"
        ? "clean"
        : "soft";
}

function saveAndApplyTheme(theme) {
    const safeTheme =
        keetaScanThemes.includes(theme)
            ? theme
            : "soft";

    localStorage.setItem(
        "keetaScanTheme",
        safeTheme
    );

    applyTheme(safeTheme);
}

function createSettingsPanel() {
    const existingPanel =
        document.getElementById("settingsPanel");

    if (existingPanel) {
        return existingPanel;
    }

    const panel = document.createElement("section");
    panel.id = "settingsPanel";
    panel.className = "settings-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "KeetaView settings");

    panel.innerHTML = `
        <header class="settings-panel-header">
            <div>
                <p class="home-eyebrow">KEETAVIEW</p>
                <h2>Settings</h2>
            </div>

            <button
                id="closeSettings"
                type="button"
                aria-label="Close settings"
            >
                ×
            </button>
        </header>

        <div class="settings-section">
            <div class="settings-section-heading">
                <strong>Appearance</strong>
                <span>Choose how KeetaView looks on this browser.</span>
            </div>

            <div
                class="appearance-options"
                role="radiogroup"
                aria-label="Appearance"
            >
                <button
                    class="appearance-option"
                    type="button"
                    data-theme-choice="soft"
                    role="radio"
                >
                    <span class="appearance-preview soft-preview">
                        <i></i><i></i>
                    </span>

                    <span>
                        <strong>Soft Gray</strong>
                        <small>Graphite canvas with white data cards</small>
                    </span>

                    <b aria-hidden="true">✓</b>
                </button>

                <button
                    class="appearance-option"
                    type="button"
                    data-theme-choice="clean"
                    role="radio"
                >
                    <span class="appearance-preview clean-preview">
                        <i></i><i></i>
                    </span>

                    <span>
                        <strong>Clean White</strong>
                        <small>Bright canvas with subtle borders</small>
                    </span>

                    <b aria-hidden="true">✓</b>
                </button>
            </div>
        </div>

        <footer class="settings-panel-footer">
            Settings are saved on this browser.
        </footer>
    `;

    document.body.appendChild(panel);

    panel
        .querySelectorAll("[data-theme-choice]")
        .forEach((option) => {
            option.addEventListener("click", () => {
                saveAndApplyTheme(
                    option.dataset.themeChoice
                );
            });
        });

    panel
        .querySelector("#closeSettings")
        .addEventListener("click", closeSettingsPanel);

    return panel;
}

function updateSettingsSelection(theme) {
    document
        .querySelectorAll("[data-theme-choice]")
        .forEach((option) => {
            const selected =
                option.dataset.themeChoice === theme;

            option.classList.toggle("selected", selected);
            option.setAttribute(
                "aria-checked",
                String(selected)
            );
        });
}

function openSettingsPanel() {
    const panel = createSettingsPanel();
    const settingsButton =
        document.getElementById("settingsButton") ||
        document.querySelector(
            ".home-header-actions .header-control:not(#themeToggle)"
        );

    panel.hidden = false;
    document.body.classList.add("settings-open");

    if (settingsButton) {
        settingsButton.setAttribute("aria-expanded", "true");
    }

    panel
        .querySelector(".appearance-option.selected")
        ?.focus();
}

function closeSettingsPanel() {
    const panel = document.getElementById("settingsPanel");
    const settingsButton =
        document.getElementById("settingsButton") ||
        document.querySelector(
            ".home-header-actions .header-control:not(#themeToggle)"
        );

    if (!panel) {
        return;
    }

    panel.hidden = true;
    document.body.classList.remove("settings-open");

    if (settingsButton) {
        settingsButton.setAttribute("aria-expanded", "false");
        settingsButton.focus();
    }
}

function initializeSettings() {
    const settingsButton =
        document.getElementById("settingsButton") ||
        document.querySelector(
            ".home-header-actions .header-control:not(#themeToggle)"
        );

    if (!settingsButton) {
        return;
    }

    settingsButton.id = "settingsButton";
    settingsButton.setAttribute("aria-label", "Open settings");
    settingsButton.setAttribute("aria-controls", "settingsPanel");
    settingsButton.setAttribute("aria-expanded", "false");
    settingsButton.title = "Settings";

    createSettingsPanel();
    updateSettingsSelection(
        document.documentElement.dataset.theme ||
        getSavedTheme()
    );

    settingsButton.addEventListener("click", () => {
        const panel = document.getElementById("settingsPanel");

        if (panel?.hidden) {
            openSettingsPanel();
        } else {
            closeSettingsPanel();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !document.getElementById("settingsPanel")?.hidden
        ) {
            closeSettingsPanel();
        }
    });
}

function initializeThemeToggle() {
    const themeToggle =
        document.getElementById("themeToggle");

    applyTheme(getSavedTheme());

    if (!themeToggle) {
        return;
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme =
            document.documentElement.dataset.theme ||
            "soft";
        const currentIndex =
            keetaScanThemes.indexOf(currentTheme);
        const nextTheme =
            keetaScanThemes[
                (currentIndex + 1) %
                keetaScanThemes.length
            ];

        saveAndApplyTheme(nextTheme);
    });
}

function applyTheme(theme) {
    const safeTheme =
        keetaScanThemes.includes(theme)
            ? theme
            : "soft";

    document.documentElement.dataset.theme = safeTheme;

    const themeToggle =
        document.getElementById("themeToggle");

    if (themeToggle) {
        const currentIndex =
            keetaScanThemes.indexOf(safeTheme);
        const nextTheme =
            keetaScanThemes[
                (currentIndex + 1) %
                keetaScanThemes.length
            ];

        themeToggle.textContent = "◐";
        themeToggle.classList.add("appearance-symbol");
        themeToggle.setAttribute(
            "aria-label",
            `Current appearance: ${
                keetaScanThemeNames[safeTheme]
            }. Switch to ${
                keetaScanThemeNames[nextTheme]
            }.`
        );
        themeToggle.title =
            `Switch to ${
                keetaScanThemeNames[nextTheme]
            }`;
    }

    updateSettingsSelection(safeTheme);
}

function initializeDetailSearch() {
    const form =
        document.getElementById("detailSearchForm");

    if (!form) {
        return;
    }

    const type =
        document.getElementById("detailSearchType");

    const input =
        document.getElementById("detailSearchInput");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const value = input.value.trim();

        if (!value) {
            input.focus();
            return;
        }

        if (value.startsWith("keeta_")) {
            window.location.assign(
                `address.html?address=${encodeURIComponent(value)}`
            );
            return;
        }

        const transactionMatch =
            value.match(/^([0-9a-f]{64}):(\d+)$/i);

        if (transactionMatch) {
            window.location.assign(
                `transaction.html?block=${encodeURIComponent(
                    transactionMatch[1]
                )}&operation=${encodeURIComponent(
                    transactionMatch[2]
                )}`
            );
            return;
        }

        if (/^[0-9a-f]{64}$/i.test(value)) {
            window.location.assign(
                `block.html?hash=${encodeURIComponent(value)}`
            );
            return;
        }

        const routes = {
            transaction:
                `transaction.html?search=${encodeURIComponent(value)}`,
            address:
                `address.html?address=${encodeURIComponent(value)}`,
            block:
                `block.html?hash=${encodeURIComponent(value)}`,
            asset:
                `asset.html?asset=${encodeURIComponent(value)}`
        };

        const destination =
            routes[type.value.toLowerCase()];

        if (destination) {
            window.location.assign(destination);
        }
    });
}

initializeThemeToggle();
initializeSettings();
initializeDetailSearch();
