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


const keetaViewTranslations = {
    es: {
        "Home": "Inicio",
        "Blocks": "Bloques",
        "Transactions": "Transacciones",
        "Addresses": "Direcciones",
        "Assets": "Activos",
        "Analytics": "Analítica",
        "Status": "Estado",
        "Search": "Buscar",
        "Transaction": "Transacción",
        "Address": "Dirección",
        "Block": "Bloque",
        "Asset": "Activo",
        "Settings": "Configuración",
        "Language": "Idioma",
        "Choose desired language": "Elige el idioma",
        "Currency": "Moneda",
        "Choose desired currency": "Elige la moneda",
        "Theme": "Tema",
        "Choose the site appearance": "Elige la apariencia del sitio",
        "Soft Gray": "Gris suave",
        "Clean White": "Blanco limpio",
        "Address Display": "Formato de dirección",
        "Choose address truncation format": "Elige cómo abreviar las direcciones",
        "Date & Time": "Fecha y hora",
        "Display times locally or in UTC": "Muestra la hora local o UTC",
        "Local time": "Hora local",
        "Time Format": "Formato de hora",
        "Choose a 12-hour or 24-hour clock": "Elige un reloj de 12 o 24 horas",
        "12-hour": "12 horas",
        "24-hour": "24 horas",
        "Date Format": "Formato de fecha",
        "Choose how calendar dates appear": "Elige cómo se muestran las fechas",
        "Use device format": "Usar formato del dispositivo",
        "Month / Day / Year": "Mes / Día / Año",
        "Day / Month / Year": "Día / Mes / Año",
        "Refresh Rate": "Frecuencia de actualización",
        "Choose how often live information refreshes": "Elige cada cuánto se actualiza la información",
        "Every 30 seconds": "Cada 30 segundos",
        "Every minute": "Cada minuto",
        "Manual only": "Solo manual",
        "Number Display": "Formato de números",
        "Show complete or shortened large numbers": "Muestra números grandes completos o abreviados",
        "Full (22,457)": "Completo (22.457)",
        "Compact (22.5K)": "Compacto (22,5 mil)",
        "Preferences are saved on this browser.": "Las preferencias se guardan en este navegador.",
        "Preferences saved.": "Preferencias guardadas.",
        "Save Preferences": "Guardar preferencias",
        "Previous": "Anterior",
        "Next": "Siguiente",
        "Refresh": "Actualizar",
        "Loading…": "Cargando…",
        "Not available": "No disponible",
        "Online": "En línea",
        "Available": "Disponible",
        "Connected": "Conectado",
        "Not connected": "No conectado",
        "View all Blocks →": "Ver todos los bloques →",
        "View all Transactions →": "Ver todas las transacciones →",
        "Search address, transaction, block, or asset": "Buscar dirección, transacción, bloque o activo",
        "Filter loaded transactions": "Filtrar transacciones cargadas",
        "Block, address, or asset": "Bloque, dirección o activo",
        "KTA MARKET": "MERCADO KTA",
        "Live market chart": "Gráfico de mercado en vivo",
        "KEETAVIEW INDEX": "ÍNDICE KEETAVIEW",
        "Network Snapshot": "Resumen de la red",
        "Indexed Blocks": "Bloques indexados",
        "Indexed Transfers": "Transferencias indexadas",
        "Indexed Accounts": "Cuentas indexadas",
        "Recent Avg. Operations": "Promedio reciente de operaciones",
        "These totals reflect the blocks currently indexed by this KeetaView database.": "Estos totales reflejan los bloques actualmente indexados por esta base de datos de KeetaView.",
        "View Analytics →": "Ver analítica →",
        "MAINNET": "RED PRINCIPAL",
        "Latest Blocks": "Bloques recientes",
        "INDEXED": "INDEXADO",
        "Latest Transactions": "Transacciones recientes",
        "Market Cap": "Capitalización de mercado",
        "24h Volume": "Volumen de 24 h",
        "Circulating Supply": "Suministro circulante",
        "All-Time High": "Máximo histórico",
        "Market data provided by": "Datos de mercado proporcionados por",
        "KEETAVIEW SYSTEM": "SISTEMA KEETAVIEW",
        "Check the local API, indexed database, and latest stored activity.": "Comprueba la API local, la base de datos indexada y la actividad almacenada más reciente.",
        "Local API online": "API local en línea",
        "Total Operations": "Operaciones totales",
        "Blocks stored locally": "Bloques almacenados localmente",
        "Token movements stored": "Movimientos de tokens almacenados",
        "Observed addresses": "Direcciones observadas",
        "Unique observed addresses": "Direcciones únicas observadas",
        "Operations across indexed blocks": "Operaciones en los bloques indexados",
        "Operations per indexed block": "Operaciones por bloque indexado",
        "LOCAL SERVICES": "SERVICIOS LOCALES",
        "Service Health": "Estado de los servicios",
        "Local indexed explorer data": "Datos locales indexados del explorador",
        "Verified Market Feed": "Fuente de mercado verificada",
        "CoinGecko KTA market data": "Datos de mercado de KTA de CoinGecko",
        "DATABASE COVERAGE": "COBERTURA DE LA BASE DE DATOS",
        "DATABASE RANGE": "RANGO DE LA BASE DE DATOS",
        "Indexed Range": "Rango indexado",
        "Index Coverage": "Cobertura del índice",
        "First Indexed Activity": "Primera actividad indexada",
        "Latest Indexed Activity": "Última actividad indexada",
        "Average Operations": "Promedio de operaciones",
        "Last Status Check": "Última comprobación de estado",
        "Local index disclosure": "Aviso sobre el índice local",
        "KeetaView displays information stored by this local index. These totals are not guaranteed to represent the entire network.": "KeetaView muestra información almacenada por este índice local. No se garantiza que estos totales representen toda la red.",
        "INDEXED ACTIVITY": "ACTIVIDAD INDEXADA",
        "Transfers by Day": "Transferencias por día",
        "Latest 14 indexed days": "Últimos 14 días indexados",
        "These figures describe this local KeetaView index, not guaranteed network-wide totals.": "Estas cifras describen este índice local de KeetaView y no representan necesariamente los totales de toda la red.",
        "TRANSFER ACTIVITY": "ACTIVIDAD DE TRANSFERENCIAS",
        "Most Active Senders": "Remitentes más activos",
        "Most Active Recipients": "Destinatarios más activos",
        "Up to 100 indexed results": "Hasta 100 resultados indexados",
        "ASSET MOVEMENT": "MOVIMIENTO DE ACTIVOS",
        "Most Active Assets": "Activos más activos",
        "LATEST INDEXED": "ÚLTIMOS INDEXADOS",
        "Recent Transfers": "Transferencias recientes",
        "KEETAVIEW ASSETS": "ACTIVOS DE KEETAVIEW",
        "Known Assets": "Activos conocidos",
        "Assets discovered and remembered by this KeetaView browser.": "Activos descubiertos y recordados por este navegador de KeetaView.",
        "Filter assets": "Filtrar activos",
        "Symbol, name, or address": "Símbolo, nombre o dirección",
        "DISCOVERED ON KEETA": "DESCUBIERTOS EN KEETA",
        "Asset Directory": "Directorio de activos",
        "Name": "Nombre",
        "Supply": "Suministro",
        "Browse accounts observed by this local KeetaView index.": "Explora las cuentas observadas por este índice local de KeetaView.",
        "Filter this page": "Filtrar esta página",
        "Keeta address": "Dirección de Keeta",
        "OBSERVED ACCOUNTS": "CUENTAS OBSERVADAS",
        "Address Directory": "Directorio de direcciones",
        "First Observed": "Observada por primera vez",
        "Network": "Red",
        "Mainnet": "Red principal",
        "Copy": "Copiar",
        "Copied": "Copiado",
        "Browse the latest token movements stored by KeetaView.": "Explora los movimientos de tokens más recientes almacenados por KeetaView.",
        "Token Transfers": "Transferencias de tokens",
        "Age": "Antigüedad",
        "From": "De",
        "To": "Para",
        "Amount": "Cantidad",
        "← Back to Search": "← Volver a la búsqueda",
        "← Back to Assets": "← Volver a los activos",
        "Block Details": "Detalles del bloque",
        "Loading block...": "Cargando bloque...",
        "Operations": "Operaciones",
        "Loading operations...": "Cargando operaciones...",
        "No block selected": "No se seleccionó ningún bloque",
        "Search for a block or return to the Blocks page.": "Busca un bloque o vuelve a la página de bloques.",
        "No operations to display.": "No hay operaciones para mostrar.",
        "Operation": "Operación",
        "Hash": "Hash",
        "Time": "Hora",
        "Version": "Versión",
        "Previous Block": "Bloque anterior",
        "Recipient:": "Destinatario:",
        "Token:": "Token:",
        "Amount:": "Cantidad:",
        "Transaction Hash": "Hash de transacción",
        "Waiting for search data": "Esperando datos de búsqueda",
        "Success": "Correcta",
        "Fee": "Comisión",
        "Unavailable": "No disponible",
        "Unable to load transaction": "No se pudo cargar la transacción",
        "Address Details": "Detalles de la dirección",
        "Loading address...": "Cargando dirección...",
        "Balances": "Saldos",
        "Loading balances...": "Cargando saldos...",
        "Recent Activity": "Actividad reciente",
        "Type": "Tipo",
        "Not set": "No establecido",
        "Description": "Descripción",
        "Head Block Height": "Altura del bloque principal",
        "Token Balance": "Saldo del token",
        "Balance:": "Saldo:",
        "Transfer": "Transferencia",
        "No address was provided. Search for an address from the homepage.": "No se proporcionó ninguna dirección. Busca una dirección desde la página de inicio.",
        "KEETA NETWORK ASSET": "ACTIVO DE LA RED KEETA",
        "Loading Asset...": "Cargando activo...",
        "Network Asset Supply": "Suministro del activo de red",
        "Decimals": "Decimales",
        "Loading recent transfers...": "Cargando transferencias recientes...",
        "No asset provided": "No se proporcionó ningún activo",
        "Asset information unavailable": "Información del activo no disponible",
        "Unknown Asset": "Activo desconocido",
        "Unable to load asset": "No se pudo cargar el activo",
        "No recent transfers found.": "No se encontraron transferencias recientes.",
        "Unable to load recent transfers.": "No se pudieron cargar las transferencias recientes."
    },
    fr: {
        "Home": "Accueil",
        "Blocks": "Blocs",
        "Transactions": "Transactions",
        "Addresses": "Adresses",
        "Assets": "Actifs",
        "Analytics": "Analyses",
        "Status": "État",
        "Search": "Rechercher",
        "Transaction": "Transaction",
        "Address": "Adresse",
        "Block": "Bloc",
        "Asset": "Actif",
        "Settings": "Paramètres",
        "Language": "Langue",
        "Choose desired language": "Choisissez la langue",
        "Currency": "Devise",
        "Choose desired currency": "Choisissez la devise",
        "Theme": "Thème",
        "Choose the site appearance": "Choisissez l’apparence du site",
        "Soft Gray": "Gris doux",
        "Clean White": "Blanc épuré",
        "Address Display": "Affichage des adresses",
        "Choose address truncation format": "Choisissez le format abrégé des adresses",
        "Date & Time": "Date et heure",
        "Display times locally or in UTC": "Affichez l’heure locale ou UTC",
        "Local time": "Heure locale",
        "Time Format": "Format de l’heure",
        "Choose a 12-hour or 24-hour clock": "Choisissez une horloge de 12 ou 24 heures",
        "12-hour": "12 heures",
        "24-hour": "24 heures",
        "Date Format": "Format de la date",
        "Choose how calendar dates appear": "Choisissez l’affichage des dates",
        "Use device format": "Utiliser le format de l’appareil",
        "Month / Day / Year": "Mois / Jour / Année",
        "Day / Month / Year": "Jour / Mois / Année",
        "Refresh Rate": "Fréquence d’actualisation",
        "Choose how often live information refreshes": "Choisissez la fréquence d’actualisation",
        "Every 30 seconds": "Toutes les 30 secondes",
        "Every minute": "Toutes les minutes",
        "Manual only": "Manuel uniquement",
        "Number Display": "Affichage des nombres",
        "Show complete or shortened large numbers": "Afficher les grands nombres en entier ou en abrégé",
        "Full (22,457)": "Complet (22 457)",
        "Compact (22.5K)": "Compact (22,5 k)",
        "Preferences are saved on this browser.": "Les préférences sont enregistrées dans ce navigateur.",
        "Preferences saved.": "Préférences enregistrées.",
        "Save Preferences": "Enregistrer les préférences",
        "Previous": "Précédent",
        "Next": "Suivant",
        "Refresh": "Actualiser",
        "Loading…": "Chargement…",
        "Not available": "Indisponible",
        "Online": "En ligne",
        "Available": "Disponible",
        "Connected": "Connecté",
        "Not connected": "Non connecté",
        "View all Blocks →": "Voir tous les blocs →",
        "View all Transactions →": "Voir toutes les transactions →",
        "Search address, transaction, block, or asset": "Rechercher une adresse, une transaction, un bloc ou un actif",
        "Filter loaded transactions": "Filtrer les transactions chargées",
        "Block, address, or asset": "Bloc, adresse ou actif",
        "KTA MARKET": "MARCHÉ KTA",
        "Live market chart": "Graphique du marché en direct",
        "KEETAVIEW INDEX": "INDEX KEETAVIEW",
        "Network Snapshot": "Aperçu du réseau",
        "Indexed Blocks": "Blocs indexés",
        "Indexed Transfers": "Transferts indexés",
        "Indexed Accounts": "Comptes indexés",
        "Recent Avg. Operations": "Moyenne récente des opérations",
        "These totals reflect the blocks currently indexed by this KeetaView database.": "Ces totaux reflètent les blocs actuellement indexés par cette base de données KeetaView.",
        "View Analytics →": "Voir les analyses →",
        "MAINNET": "RÉSEAU PRINCIPAL",
        "Latest Blocks": "Blocs récents",
        "INDEXED": "INDEXÉ",
        "Latest Transactions": "Transactions récentes",
        "Market Cap": "Capitalisation",
        "24h Volume": "Volume sur 24 h",
        "Circulating Supply": "Offre en circulation",
        "All-Time High": "Plus haut historique",
        "Market data provided by": "Données de marché fournies par",
        "Filter this page": "Filtrer cette page",
        "Block hash": "Hash du bloc",
        "INDEXED MAINNET": "RÉSEAU PRINCIPAL INDEXÉ",
        "Age": "Âge",
        "Operations": "Opérations",
        "Network": "Réseau",
        "Loading blocks…": "Chargement des blocs…",
        "Unable to load blocks. Make sure the KeetaView API server is running.": "Impossible de charger les blocs. Vérifiez que l’API KeetaView est en cours d’exécution.",
        "KEETAVIEW SYSTEM": "SYSTÈME KEETAVIEW",
        "Check the local API, indexed database, and latest stored activity.": "Vérifiez l’API locale, la base indexée et la dernière activité enregistrée.",
        "Local API online": "API locale en ligne",
        "Total Operations": "Total des opérations",
        "Blocks stored locally": "Blocs stockés localement",
        "Token movements stored": "Mouvements de jetons enregistrés",
        "Observed addresses": "Adresses observées",
        "Unique observed addresses": "Adresses uniques observées",
        "Operations across indexed blocks": "Opérations dans les blocs indexés",
        "Operations per indexed block": "Opérations par bloc indexé",
        "LOCAL SERVICES": "SERVICES LOCAUX",
        "Service Health": "État des services",
        "Local indexed explorer data": "Données locales indexées de l’explorateur",
        "Verified Market Feed": "Flux de marché vérifié",
        "CoinGecko KTA market data": "Données de marché KTA de CoinGecko",
        "DATABASE COVERAGE": "COUVERTURE DE LA BASE",
        "DATABASE RANGE": "PLAGE DE LA BASE",
        "Indexed Range": "Plage indexée",
        "Index Coverage": "Couverture de l’index",
        "First Indexed Activity": "Première activité indexée",
        "Latest Indexed Activity": "Dernière activité indexée",
        "Average Operations": "Moyenne des opérations",
        "Last Status Check": "Dernière vérification",
        "Local index disclosure": "Avis sur l’index local",
        "KeetaView displays information stored by this local index. These totals are not guaranteed to represent the entire network.": "KeetaView affiche les informations stockées par cet index local. Ces totaux ne représentent pas nécessairement l’ensemble du réseau.",
        "INDEXED ACTIVITY": "ACTIVITÉ INDEXÉE",
        "Transfers by Day": "Transferts par jour",
        "Latest 14 indexed days": "14 derniers jours indexés",
        "These figures describe this local KeetaView index, not guaranteed network-wide totals.": "Ces chiffres décrivent cet index KeetaView local et ne garantissent pas les totaux de l’ensemble du réseau.",
        "TRANSFER ACTIVITY": "ACTIVITÉ DES TRANSFERTS",
        "Most Active Senders": "Expéditeurs les plus actifs",
        "Most Active Recipients": "Destinataires les plus actifs",
        "Up to 100 indexed results": "Jusqu’à 100 résultats indexés",
        "ASSET MOVEMENT": "MOUVEMENT DES ACTIFS",
        "Most Active Assets": "Actifs les plus actifs",
        "LATEST INDEXED": "DERNIERS ÉLÉMENTS INDEXÉS",
        "Recent Transfers": "Transferts récents",
        "KEETAVIEW ASSETS": "ACTIFS KEETAVIEW",
        "Known Assets": "Actifs connus",
        "Assets discovered and remembered by this KeetaView browser.": "Actifs découverts et mémorisés par ce navigateur KeetaView.",
        "Filter assets": "Filtrer les actifs",
        "Symbol, name, or address": "Symbole, nom ou adresse",
        "DISCOVERED ON KEETA": "DÉCOUVERTS SUR KEETA",
        "Asset Directory": "Répertoire des actifs",
        "Name": "Nom",
        "Supply": "Offre",
        "Browse accounts observed by this local KeetaView index.": "Parcourez les comptes observés par cet index KeetaView local.",
        "Keeta address": "Adresse Keeta",
        "OBSERVED ACCOUNTS": "COMPTES OBSERVÉS",
        "Address Directory": "Répertoire des adresses",
        "First Observed": "Première observation",
        "Mainnet": "Réseau principal",
        "Copy": "Copier",
        "Copied": "Copié",
        "Browse the latest token movements stored by KeetaView.": "Parcourez les derniers mouvements de jetons enregistrés par KeetaView.",
        "Token Transfers": "Transferts de jetons",
        "From": "De",
        "To": "Vers",
        "Amount": "Montant",
        "← Back to Search": "← Retour à la recherche",
        "← Back to Assets": "← Retour aux actifs",
        "Block Details": "Détails du bloc",
        "Loading block...": "Chargement du bloc...",
        "Loading operations...": "Chargement des opérations...",
        "No block selected": "Aucun bloc sélectionné",
        "Search for a block or return to the Blocks page.": "Recherchez un bloc ou revenez à la page des blocs.",
        "No operations to display.": "Aucune opération à afficher.",
        "Operation": "Opération",
        "Hash": "Hash",
        "Time": "Heure",
        "Version": "Version",
        "Previous Block": "Bloc précédent",
        "Recipient:": "Destinataire :",
        "Token:": "Jeton :",
        "Amount:": "Montant :",
        "Transaction Hash": "Hash de transaction",
        "Waiting for search data": "En attente des données de recherche",
        "Success": "Réussie",
        "Fee": "Frais",
        "Unavailable": "Indisponible",
        "Unable to load transaction": "Impossible de charger la transaction",
        "Address Details": "Détails de l’adresse",
        "Loading address...": "Chargement de l’adresse...",
        "Balances": "Soldes",
        "Loading balances...": "Chargement des soldes...",
        "Recent Activity": "Activité récente",
        "Type": "Type",
        "Not set": "Non défini",
        "Description": "Description",
        "Head Block Height": "Hauteur du bloc principal",
        "Token Balance": "Solde du jeton",
        "Balance:": "Solde :",
        "Transfer": "Transfert",
        "No address was provided. Search for an address from the homepage.": "Aucune adresse n’a été fournie. Recherchez une adresse depuis l’accueil.",
        "KEETA NETWORK ASSET": "ACTIF DU RÉSEAU KEETA",
        "Loading Asset...": "Chargement de l’actif...",
        "Network Asset Supply": "Offre de l’actif réseau",
        "Decimals": "Décimales",
        "Loading recent transfers...": "Chargement des transferts récents...",
        "No asset provided": "Aucun actif fourni",
        "Asset information unavailable": "Informations sur l’actif indisponibles",
        "Unknown Asset": "Actif inconnu",
        "Unable to load asset": "Impossible de charger l’actif",
        "No recent transfers found.": "Aucun transfert récent trouvé.",
        "Unable to load recent transfers.": "Impossible de charger les transferts récents."
    }
};

function translateKeetaView(root = document.body) {
    const language =
        document.documentElement.dataset.language ||
        getSavedPreferences().language;
    const translations = keetaViewTranslations[language];

    if (!translations || !root) {
        return;
    }

    const translateTextNode = (node) => {
        const original = node.nodeValue;
        const trimmed = original.trim();
        const translated = translations[trimmed];

        if (translated) {
            node.nodeValue = original.replace(trimmed, translated);
            return;
        }

        if (language === "es") {
            let dynamicTranslation = trimmed
                .replace(/\b(\d+) min ago\b/g, "hace $1 min")
                .replace(/\b(\d+) mins ago\b/g, "hace $1 min")
                .replace(/\b1 hour ago\b/g, "hace 1 hora")
                .replace(/\b(\d+) hours ago\b/g, "hace $1 horas")
                .replace(/\b1 operation\b/g, "1 operación")
                .replace(/\b(\d+) operations\b/g, "$1 operaciones")
                .replace(/\bLive\b/g, "En vivo")
                .replace(/\bUpdated\b/g, "Actualizado")
                .replace(/\bover 24 hours\b/g, "en 24 horas")
                .replace(/\b1D view\b/g, "vista de 1D")
                .replace(/\b(\d+) assets\b/g, "$1 activos")
                .replace(/\b1 asset\b/g, "1 activo")
                .replace(/\b(\d[\d,]*) transfers\b/g, "$1 transferencias")
                .replace(/\b1 transfer\b/g, "1 transferencia")
                .replace(/\b(\d[\d,]*) accounts\b/g, "$1 cuentas")
                .replace(/\b1 account\b/g, "1 cuenta")
                .replace(
                    /(\d+)–(\d+) of ([\d,]+) loaded/g,
                    "$1–$2 de $3 cargados"
                )
                .replace(
                    /Page (\d+) of (\d+)/g,
                    "Página $1 de $2"
                );

            if (dynamicTranslation !== trimmed) {
                node.nodeValue = original.replace(
                    trimmed,
                    dynamicTranslation
                );
            }
        } else if (language === "fr") {
            let dynamicTranslation = trimmed
                .replace(/\b(\d+) min ago\b/g, "il y a $1 min")
                .replace(/\b(\d+) mins ago\b/g, "il y a $1 min")
                .replace(/\b1 hour ago\b/g, "il y a 1 heure")
                .replace(/\b(\d+) hours ago\b/g, "il y a $1 heures")
                .replace(/\b1 operation\b/g, "1 opération")
                .replace(/\b(\d+) operations\b/g, "$1 opérations")
                .replace(/\bLive\b/g, "En direct")
                .replace(/\bUpdated\b/g, "Actualisé")
                .replace(/\bover 24 hours\b/g, "sur 24 heures")
                .replace(/\b1D view\b/g, "vue 1 j")
                .replace(/\b(\d+) assets\b/g, "$1 actifs")
                .replace(/\b1 asset\b/g, "1 actif")
                .replace(/\b(\d[\d,]*) transfers\b/g, "$1 transferts")
                .replace(/\b1 transfer\b/g, "1 transfert")
                .replace(/\b(\d[\d,]*) accounts\b/g, "$1 comptes")
                .replace(/\b1 account\b/g, "1 compte")
                .replace(
                    /(\d+)–(\d+) of ([\d,]+) loaded/g,
                    "$1–$2 sur $3 chargés"
                )
                .replace(
                    /Page (\d+) of (\d+)/g,
                    "Page $1 sur $2"
                );

            if (dynamicTranslation !== trimmed) {
                node.nodeValue = original.replace(
                    trimmed,
                    dynamicTranslation
                );
            }
        }
    };

    if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root);
        return;
    }

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT
    );

    while (walker.nextNode()) {
        const parent = walker.currentNode.parentElement;

        if (
            parent &&
            !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)
        ) {
            translateTextNode(walker.currentNode);
        }
    }

    root.querySelectorAll?.(
        "[placeholder], [aria-label], [title], [data-label]"
    ).forEach((element) => {
        ["placeholder", "aria-label", "title", "data-label"].forEach((attribute) => {
            const value = element.getAttribute(attribute);

            if (value && translations[value]) {
                element.setAttribute(attribute, translations[value]);
            }
        });
    });
}

function initializeTranslations() {
    translateKeetaView();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                translateKeetaView(node);
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

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
initializeTranslations();
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
