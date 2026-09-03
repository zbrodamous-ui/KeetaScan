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


const defaultKeetaViewPreferences = {
    language: "en",
    currency: "usd",
    addressFormat: "middle",
    timeZone: "local",
    timeFormat: "12",
    dateFormat: "local",
    refreshRate: "60000",
    numberFormat: "full"
};

function getSavedPreferences() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("keetaViewPreferences") ||
            "{}"
        );

        return {
            ...defaultKeetaViewPreferences,
            ...saved
        };
    } catch (error) {
        return {
            ...defaultKeetaViewPreferences
        };
    }
}

function applyDisplayPreferences(preferences) {
    const safeAddressFormat =
        preferences.addressFormat === "back"
            ? "back"
            : "middle";
    const safeTimeZone =
        preferences.timeZone === "utc"
            ? "utc"
            : "local";
    const supportedLanguages = [
        "en",
        "es",
        "zh-CN",
        "hi",
        "ar",
        "pt",
        "fr",
        "de",
        "ja",
        "ko",
        "id",
        "ru"
    ];
    const safeLanguage =
        supportedLanguages.includes(preferences.language)
            ? preferences.language
            : "en";

    document.documentElement.lang = safeLanguage;
    document.documentElement.dir =
        safeLanguage === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.language =
        safeLanguage;
    document.documentElement.dataset.addressFormat =
        safeAddressFormat;
    document.documentElement.dataset.timeZone =
        safeTimeZone;
    document.documentElement.dataset.timeFormat =
        preferences.timeFormat === "24" ? "24" : "12";
    document.documentElement.dataset.dateFormat =
        ["local", "mdy", "dmy"].includes(preferences.dateFormat)
            ? preferences.dateFormat
            : "local";
    document.documentElement.dataset.numberFormat =
        preferences.numberFormat === "compact"
            ? "compact"
            : "full";
}

function formatKeetaIdentifier(
    value,
    beginningLength = 12,
    endingLength = 6
) {
    const text = String(value || "");

    if (
        !text ||
        text.length <= beginningLength + endingLength + 3
    ) {
        return text;
    }

    const format =
        document.documentElement.dataset.addressFormat ||
        getSavedPreferences().addressFormat;

    if (format === "back") {
        return `${text.slice(
            0,
            beginningLength + endingLength
        )}...`;
    }

    return `${text.slice(0, beginningLength)}...${
        text.slice(-endingLength)
    }`;
}

function formatKeetaDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Not available";
    }

    const timeZone =
        document.documentElement.dataset.timeZone ||
        getSavedPreferences().timeZone;

    const preferences = getSavedPreferences();
    const hour12 = preferences.timeFormat !== "24";
    const dateFormat = preferences.dateFormat;
    const options = {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12
    };

    if (timeZone === "utc") {
        options.timeZone = "UTC";
        options.timeZoneName = "short";
    }

    if (dateFormat === "mdy") {
        options.month = "numeric";
        options.day = "numeric";
        options.year = "numeric";
    } else if (dateFormat === "dmy") {
        options.day = "numeric";
        options.month = "numeric";
        options.year = "numeric";
    } else {
        options.dateStyle = "short";
        delete options.hour;
        delete options.minute;
        delete options.second;
        delete options.hour12;

        return `${date.toLocaleDateString(undefined, options)} ${date.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12,
            ...(timeZone === "utc"
                ? { timeZone: "UTC", timeZoneName: "short" }
                : {})
        })}`;
    }

    return new Intl.DateTimeFormat(
        dateFormat === "dmy" ? "en-GB" : "en-US",
        options
    ).format(date);
}

function syncSettingsControls() {
    const panel = document.getElementById("settingsPanel");

    if (!panel) {
        return;
    }

    const preferences = getSavedPreferences();

    panel.querySelector("#settingsLanguage").value =
        preferences.language;
    panel.querySelector("#settingsCurrency").value =
        preferences.currency;
    panel.querySelector("#settingsAddressFormat").value =
        preferences.addressFormat;
    panel.querySelector("#settingsTimeZone").value =
        preferences.timeZone;
    panel.querySelector("#settingsTheme").value =
        getSavedTheme();
    panel.querySelector("#settingsTimeFormat").value =
        preferences.timeFormat;
    panel.querySelector("#settingsDateFormat").value =
        preferences.dateFormat;
    panel.querySelector("#settingsRefreshRate").value =
        preferences.refreshRate;
    panel.querySelector("#settingsNumberFormat").value =
        preferences.numberFormat;
}

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

        <form id="settingsForm">
            <div class="settings-preferences">
                <label class="settings-preference-row">
                    <span>
                        <strong>Language</strong>
                        <small>Choose desired language</small>
                    </span>

                    <select id="settingsLanguage">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="zh-CN">简体中文</option>
                        <option value="hi">हिन्दी</option>
                        <option value="ar">العربية</option>
                        <option value="pt">Português</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                        <option value="id">Bahasa Indonesia</option>
                        <option value="ru">Русский</option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Currency</strong>
                        <small>Choose desired currency</small>
                    </span>

                    <select id="settingsCurrency">
                        <option value="usd">USD — United States Dollar</option>
                        <option value="eur">EUR — Euro</option>
                        <option value="gbp">GBP — British Pound</option>
                        <option value="cad">CAD — Canadian Dollar</option>
                        <option value="aud">AUD — Australian Dollar</option>
                        <option value="jpy">JPY — Japanese Yen</option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Theme</strong>
                        <small>Choose the site appearance</small>
                    </span>

                    <select id="settingsTheme">
                        <option value="soft">Soft Gray</option>
                        <option value="clean">Clean White</option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Address Display</strong>
                        <small>Choose address truncation format</small>
                    </span>

                    <select id="settingsAddressFormat">
                        <option value="middle">
                            Middle (keeta_abcd...wxyz)
                        </option>
                        <option value="back">
                            Back (keeta_abcdwxyz...)
                        </option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Date &amp; Time</strong>
                        <small>Display times locally or in UTC</small>
                    </span>

                    <select id="settingsTimeZone">
                        <option value="local">Local time</option>
                        <option value="utc">UTC</option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Time Format</strong>
                        <small>Choose a 12-hour or 24-hour clock</small>
                    </span>

                    <select id="settingsTimeFormat">
                        <option value="12">12-hour</option>
                        <option value="24">24-hour</option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Date Format</strong>
                        <small>Choose how calendar dates appear</small>
                    </span>

                    <select id="settingsDateFormat">
                        <option value="local">Use device format</option>
                        <option value="mdy">Month / Day / Year</option>
                        <option value="dmy">Day / Month / Year</option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Refresh Rate</strong>
                        <small>Choose how often live information refreshes</small>
                    </span>

                    <select id="settingsRefreshRate">
                        <option value="30000">Every 30 seconds</option>
                        <option value="60000">Every minute</option>
                        <option value="manual">Manual only</option>
                    </select>
                </label>

                <label class="settings-preference-row">
                    <span>
                        <strong>Number Display</strong>
                        <small>Show complete or shortened large numbers</small>
                    </span>

                    <select id="settingsNumberFormat">
                        <option value="full">Full (22,457)</option>
                        <option value="compact">Compact (22.5K)</option>
                    </select>
                </label>
            </div>

            <footer class="settings-save-row">
                <span id="settingsSaveStatus" aria-live="polite">
                    Preferences are saved on this browser.
                </span>

                <button id="saveSettings" type="submit">
                    Save Preferences
                </button>
            </footer>
        </form>
    `;

    document.body.appendChild(panel);
    syncSettingsControls();

    panel
        .querySelector("#settingsForm")
        .addEventListener("submit", (event) => {
            event.preventDefault();

            const preferences = {
                language:
                    panel.querySelector("#settingsLanguage").value,
                currency:
                    panel.querySelector("#settingsCurrency").value,
                addressFormat:
                    panel.querySelector("#settingsAddressFormat").value,
                timeZone:
                    panel.querySelector("#settingsTimeZone").value,
                timeFormat:
                    panel.querySelector("#settingsTimeFormat").value,
                dateFormat:
                    panel.querySelector("#settingsDateFormat").value,
                refreshRate:
                    panel.querySelector("#settingsRefreshRate").value,
                numberFormat:
                    panel.querySelector("#settingsNumberFormat").value
            };

            saveAndApplyTheme(
                panel.querySelector("#settingsTheme").value
            );

            localStorage.setItem(
                "keetaViewPreferences",
                JSON.stringify(preferences)
            );
            applyDisplayPreferences(preferences);

            const status =
                panel.querySelector("#settingsSaveStatus");
            status.textContent = "Preferences saved.";

            window.setTimeout(() => {
                window.location.reload();
            }, 500);
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

    syncSettingsControls();
    panel.hidden = false;
    document.body.classList.add("settings-open");

    if (settingsButton) {
        settingsButton.setAttribute("aria-expanded", "true");
    }

    panel
        .querySelector("#settingsLanguage")
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

async function resolveAssetAddress(searchValue) {
    const value = String(searchValue || "").trim();

    if (!value) {
        return null;
    }

    if (value.startsWith("keeta_")) {
        return value;
    }

    let knownAssets = [];

    try {
        const saved = JSON.parse(
            localStorage.getItem("keetascan_known_assets") ||
            "[]"
        );

        knownAssets = Array.isArray(saved)
            ? saved
            : [];
    } catch (error) {
        console.warn("Unable to read known assets:", error);
    }

    if (knownAssets.length === 0) {
        return null;
    }

    const client =
        KeetaNet.Client.fromNetwork("main");

    const query = value.toLowerCase();
    const matches = await Promise.all(
        knownAssets.map(async (address) => {
            try {
                const assetInfo =
                    await client.getAccountInfo(address);

                return {
                    address,
                    symbol:
                        String(assetInfo?.info?.name || "")
                            .toLowerCase(),
                    name:
                        String(assetInfo?.info?.description || "")
                            .toLowerCase()
                };
            } catch (error) {
                return null;
            }
        })
    );

    const validMatches =
        matches.filter(Boolean);

    const exactMatch =
        validMatches.find(
            (asset) =>
                asset.symbol === query ||
                asset.name === query
        );

    if (exactMatch) {
        return exactMatch.address;
    }

    const partialMatches =
        validMatches.filter(
            (asset) =>
                asset.symbol.includes(query) ||
                asset.name.includes(query)
        );

    return partialMatches.length === 1
        ? partialMatches[0].address
        : null;
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

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const value = input.value.trim();

        if (!value) {
            input.focus();
            return;
        }

        if (type.value.toLowerCase() === "transaction") {
            const selectedTransaction =
                value.match(
                    /^([0-9a-f]{64})(?::(\d+))?$/i
                );

            if (selectedTransaction) {
                window.location.assign(
                    `transaction.html?block=${encodeURIComponent(
                        selectedTransaction[1]
                    )}&operation=${encodeURIComponent(
                        selectedTransaction[2] || "0"
                    )}`
                );
                return;
            }

            input.setCustomValidity(
                "Enter a 64-character block hash, optionally followed by :operation."
            );
            input.reportValidity();
            input.addEventListener(
                "input",
                () => input.setCustomValidity(""),
                { once: true }
            );
            return;
        }

        if (type.value.toLowerCase() === "asset") {
            const assetAddress =
                await resolveAssetAddress(value);

            if (assetAddress) {
                window.location.assign(
                    `asset.html?asset=${encodeURIComponent(
                        assetAddress
                    )}`
                );
                return;
            }

            input.setCustomValidity(
                "No matching asset was found."
            );
            input.reportValidity();
            input.addEventListener(
                "input",
                () => input.setCustomValidity(""),
                { once: true }
            );
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

applyDisplayPreferences(getSavedPreferences());
initializeThemeToggle();
initializeSettings();
initializeDetailSearch();


function attachKeetaCopyButton(element, value, label = "value") {
    if (!element || !value || value === "Not available") {
        return;
    }

    element
        .querySelector(".copy-value-button")
        ?.remove();

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-value-button";
    button.textContent = "Copy";
    button.title = `Copy ${label}`;
    button.setAttribute("aria-label", `Copy ${label}`);

    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(String(value));
            button.textContent = "Copied";
            window.setTimeout(() => {
                button.textContent = "Copy";
            }, 1400);
        } catch (error) {
            console.error("Unable to copy value:", error);
            button.textContent = "Copy failed";
        }
    });

    element.appendChild(button);
}
