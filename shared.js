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
        "Unable to load recent transfers.": "No se pudieron cargar las transferencias recientes.",
        "Block hash": "Hash del bloque",
        "INDEXED MAINNET": "RED PRINCIPAL INDEXADA",
        "Loading blocks…": "Cargando bloques…",
        "No blocks on this page match that hash.": "Ningún bloque de esta página coincide con ese hash.",
        "No indexed blocks are available.": "No hay bloques indexados disponibles.",
        "Unable to load blocks. Make sure the KeetaView API server is running.": "No se pudieron cargar los bloques. Comprueba que la API de KeetaView esté funcionando."
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
        "No blocks on this page match that hash.": "Aucun bloc de cette page ne correspond à ce hash.",
        "No indexed blocks are available.": "Aucun bloc indexé n’est disponible.",
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
    },
    pt: {
        "Home": "Início",
        "Blocks": "Blocos",
        "Transactions": "Transações",
        "Addresses": "Endereços",
        "Assets": "Ativos",
        "Analytics": "Análises",
        "Status": "Status",
        "Search": "Pesquisar",
        "Transaction": "Transação",
        "Address": "Endereço",
        "Block": "Bloco",
        "Asset": "Ativo",
        "Settings": "Configurações",
        "Language": "Idioma",
        "Choose desired language": "Escolha o idioma",
        "Currency": "Moeda",
        "Choose desired currency": "Escolha a moeda",
        "Theme": "Tema",
        "Choose the site appearance": "Escolha a aparência do site",
        "Soft Gray": "Cinza suave",
        "Clean White": "Branco limpo",
        "Address Display": "Exibição de endereço",
        "Choose address truncation format": "Escolha como abreviar os endereços",
        "Date & Time": "Data e hora",
        "Display times locally or in UTC": "Exiba os horários localmente ou em UTC",
        "Local time": "Hora local",
        "Time Format": "Formato da hora",
        "Choose a 12-hour or 24-hour clock": "Escolha o formato de 12 ou 24 horas",
        "12-hour": "12 horas",
        "24-hour": "24 horas",
        "Date Format": "Formato da data",
        "Choose how calendar dates appear": "Escolha como as datas aparecem",
        "Use device format": "Usar formato do dispositivo",
        "Month / Day / Year": "Mês / Dia / Ano",
        "Day / Month / Year": "Dia / Mês / Ano",
        "Refresh Rate": "Frequência de atualização",
        "Choose how often live information refreshes": "Escolha a frequência de atualização das informações",
        "Every 30 seconds": "A cada 30 segundos",
        "Every minute": "A cada minuto",
        "Manual only": "Somente manual",
        "Number Display": "Exibição de números",
        "Show complete or shortened large numbers": "Mostre números grandes completos ou abreviados",
        "Full (22,457)": "Completo (22.457)",
        "Compact (22.5K)": "Compacto (22,5 mil)",
        "Preferences are saved on this browser.": "As preferências são salvas neste navegador.",
        "Preferences saved.": "Preferências salvas.",
        "Save Preferences": "Salvar preferências",
        "Previous": "Anterior",
        "Next": "Próximo",
        "Refresh": "Atualizar",
        "Loading…": "Carregando…",
        "Not available": "Indisponível",
        "Online": "Online",
        "Available": "Disponível",
        "Connected": "Conectado",
        "Not connected": "Não conectado",
        "View all Blocks →": "Ver todos os blocos →",
        "View all Transactions →": "Ver todas as transações →",
        "Search address, transaction, block, or asset": "Pesquisar endereço, transação, bloco ou ativo",
        "Filter loaded transactions": "Filtrar transações carregadas",
        "Block, address, or asset": "Bloco, endereço ou ativo",
        "KTA MARKET": "MERCADO KTA",
        "Live market chart": "Gráfico de mercado ao vivo",
        "KEETAVIEW INDEX": "ÍNDICE KEETAVIEW",
        "Network Snapshot": "Resumo da rede",
        "Indexed Blocks": "Blocos indexados",
        "Indexed Transfers": "Transferências indexadas",
        "Indexed Accounts": "Contas indexadas",
        "Recent Avg. Operations": "Média recente de operações",
        "These totals reflect the blocks currently indexed by this KeetaView database.": "Estes totais refletem os blocos atualmente indexados por este banco de dados KeetaView.",
        "View Analytics →": "Ver análises →",
        "MAINNET": "REDE PRINCIPAL",
        "Latest Blocks": "Blocos recentes",
        "INDEXED": "INDEXADO",
        "Latest Transactions": "Transações recentes",
        "Market Cap": "Capitalização de mercado",
        "24h Volume": "Volume em 24 h",
        "Circulating Supply": "Oferta em circulação",
        "All-Time High": "Máxima histórica",
        "Market data provided by": "Dados de mercado fornecidos por",
        "Filter this page": "Filtrar esta página",
        "Block hash": "Hash do bloco",
        "INDEXED MAINNET": "REDE PRINCIPAL INDEXADA",
        "Age": "Idade",
        "Operations": "Operações",
        "Network": "Rede",
        "Loading blocks…": "Carregando blocos…",
        "No blocks on this page match that hash.": "Nenhum bloco nesta página corresponde a esse hash.",
        "No indexed blocks are available.": "Nenhum bloco indexado está disponível.",
        "Unable to load blocks. Make sure the KeetaView API server is running.": "Não foi possível carregar os blocos. Verifique se a API KeetaView está em execução.",
        "KEETAVIEW SYSTEM": "SISTEMA KEETAVIEW",
        "Check the local API, indexed database, and latest stored activity.": "Verifique a API local, o banco de dados indexado e a atividade armazenada mais recente.",
        "Local API online": "API local online",
        "Total Operations": "Total de operações",
        "Blocks stored locally": "Blocos armazenados localmente",
        "Token movements stored": "Movimentos de tokens armazenados",
        "Observed addresses": "Endereços observados",
        "Unique observed addresses": "Endereços únicos observados",
        "Operations across indexed blocks": "Operações nos blocos indexados",
        "Operations per indexed block": "Operações por bloco indexado",
        "LOCAL SERVICES": "SERVIÇOS LOCAIS",
        "Service Health": "Status dos serviços",
        "Local indexed explorer data": "Dados locais indexados do explorador",
        "Verified Market Feed": "Feed de mercado verificado",
        "CoinGecko KTA market data": "Dados de mercado KTA da CoinGecko",
        "DATABASE COVERAGE": "COBERTURA DO BANCO DE DADOS",
        "DATABASE RANGE": "INTERVALO DO BANCO DE DADOS",
        "Indexed Range": "Intervalo indexado",
        "Index Coverage": "Cobertura do índice",
        "First Indexed Activity": "Primeira atividade indexada",
        "Latest Indexed Activity": "Atividade indexada mais recente",
        "Average Operations": "Média de operações",
        "Last Status Check": "Última verificação de status",
        "Local index disclosure": "Aviso sobre o índice local",
        "KeetaView displays information stored by this local index. These totals are not guaranteed to represent the entire network.": "O KeetaView exibe informações armazenadas por este índice local. Estes totais podem não representar toda a rede.",
        "INDEXED ACTIVITY": "ATIVIDADE INDEXADA",
        "Transfers by Day": "Transferências por dia",
        "Latest 14 indexed days": "Últimos 14 dias indexados",
        "These figures describe this local KeetaView index, not guaranteed network-wide totals.": "Estes números descrevem este índice local do KeetaView e podem não representar os totais de toda a rede.",
        "TRANSFER ACTIVITY": "ATIVIDADE DE TRANSFERÊNCIAS",
        "Most Active Senders": "Remetentes mais ativos",
        "Most Active Recipients": "Destinatários mais ativos",
        "Up to 100 indexed results": "Até 100 resultados indexados",
        "ASSET MOVEMENT": "MOVIMENTO DE ATIVOS",
        "Most Active Assets": "Ativos mais ativos",
        "LATEST INDEXED": "INDEXADOS MAIS RECENTES",
        "Recent Transfers": "Transferências recentes",
        "KEETAVIEW ASSETS": "ATIVOS KEETAVIEW",
        "Known Assets": "Ativos conhecidos",
        "Assets discovered and remembered by this KeetaView browser.": "Ativos descobertos e lembrados por este navegador KeetaView.",
        "Filter assets": "Filtrar ativos",
        "Symbol, name, or address": "Símbolo, nome ou endereço",
        "DISCOVERED ON KEETA": "DESCOBERTOS NA KEETA",
        "Asset Directory": "Diretório de ativos",
        "Name": "Nome",
        "Supply": "Oferta",
        "Browse accounts observed by this local KeetaView index.": "Explore as contas observadas por este índice local do KeetaView.",
        "Keeta address": "Endereço Keeta",
        "OBSERVED ACCOUNTS": "CONTAS OBSERVADAS",
        "Address Directory": "Diretório de endereços",
        "First Observed": "Observado pela primeira vez",
        "Mainnet": "Rede principal",
        "Copy": "Copiar",
        "Copied": "Copiado",
        "Browse the latest token movements stored by KeetaView.": "Explore os movimentos de tokens mais recentes armazenados pelo KeetaView.",
        "Token Transfers": "Transferências de tokens",
        "From": "De",
        "To": "Para",
        "Amount": "Valor",
        "← Back to Search": "← Voltar à pesquisa",
        "← Back to Assets": "← Voltar aos ativos",
        "Block Details": "Detalhes do bloco",
        "Loading block...": "Carregando bloco...",
        "Loading operations...": "Carregando operações...",
        "No block selected": "Nenhum bloco selecionado",
        "Search for a block or return to the Blocks page.": "Pesquise um bloco ou volte à página de blocos.",
        "No operations to display.": "Nenhuma operação para exibir.",
        "Operation": "Operação",
        "Hash": "Hash",
        "Time": "Hora",
        "Version": "Versão",
        "Previous Block": "Bloco anterior",
        "Recipient:": "Destinatário:",
        "Token:": "Token:",
        "Amount:": "Valor:",
        "Transaction Hash": "Hash da transação",
        "Waiting for search data": "Aguardando dados da pesquisa",
        "Success": "Sucesso",
        "Fee": "Taxa",
        "Unavailable": "Indisponível",
        "Unable to load transaction": "Não foi possível carregar a transação",
        "Address Details": "Detalhes do endereço",
        "Loading address...": "Carregando endereço...",
        "Balances": "Saldos",
        "Loading balances...": "Carregando saldos...",
        "Recent Activity": "Atividade recente",
        "Type": "Tipo",
        "Not set": "Não definido",
        "Description": "Descrição",
        "Head Block Height": "Altura do bloco principal",
        "Token Balance": "Saldo do token",
        "Balance:": "Saldo:",
        "Transfer": "Transferência",
        "No address was provided. Search for an address from the homepage.": "Nenhum endereço foi fornecido. Pesquise um endereço na página inicial.",
        "KEETA NETWORK ASSET": "ATIVO DA REDE KEETA",
        "Loading Asset...": "Carregando ativo...",
        "Network Asset Supply": "Oferta do ativo de rede",
        "Decimals": "Casas decimais",
        "Loading recent transfers...": "Carregando transferências recentes...",
        "No asset provided": "Nenhum ativo fornecido",
        "Asset information unavailable": "Informações do ativo indisponíveis",
        "Unknown Asset": "Ativo desconhecido",
        "Unable to load asset": "Não foi possível carregar o ativo",
        "No recent transfers found.": "Nenhuma transferência recente encontrada.",
        "Unable to load recent transfers.": "Não foi possível carregar as transferências recentes."
    },
    de: {
        "Home": "Startseite",
        "Blocks": "Blöcke",
        "Transactions": "Transaktionen",
        "Addresses": "Adressen",
        "Assets": "Assets",
        "Analytics": "Analysen",
        "Status": "Status",
        "Search": "Suchen",
        "Transaction": "Transaktion",
        "Address": "Adresse",
        "Block": "Block",
        "Asset": "Asset",
        "Settings": "Einstellungen",
        "Language": "Sprache",
        "Choose desired language": "Gewünschte Sprache auswählen",
        "Currency": "Währung",
        "Choose desired currency": "Gewünschte Währung auswählen",
        "Theme": "Design",
        "Choose the site appearance": "Erscheinungsbild der Website auswählen",
        "Soft Gray": "Sanftes Grau",
        "Clean White": "Klares Weiß",
        "Address Display": "Adressanzeige",
        "Choose address truncation format": "Format für gekürzte Adressen auswählen",
        "Date & Time": "Datum und Uhrzeit",
        "Display times locally or in UTC": "Zeiten lokal oder in UTC anzeigen",
        "Local time": "Ortszeit",
        "Time Format": "Zeitformat",
        "Choose a 12-hour or 24-hour clock": "12- oder 24-Stunden-Format auswählen",
        "12-hour": "12 Stunden",
        "24-hour": "24 Stunden",
        "Date Format": "Datumsformat",
        "Choose how calendar dates appear": "Darstellung des Datums auswählen",
        "Use device format": "Geräteformat verwenden",
        "Month / Day / Year": "Monat / Tag / Jahr",
        "Day / Month / Year": "Tag / Monat / Jahr",
        "Refresh Rate": "Aktualisierungsintervall",
        "Choose how often live information refreshes": "Häufigkeit der Live-Aktualisierung auswählen",
        "Every 30 seconds": "Alle 30 Sekunden",
        "Every minute": "Jede Minute",
        "Manual only": "Nur manuell",
        "Number Display": "Zahlenanzeige",
        "Show complete or shortened large numbers": "Große Zahlen vollständig oder gekürzt anzeigen",
        "Full (22,457)": "Vollständig (22.457)",
        "Compact (22.5K)": "Kompakt (22,5 Tsd.)",
        "Preferences are saved on this browser.": "Die Einstellungen werden in diesem Browser gespeichert.",
        "Preferences saved.": "Einstellungen gespeichert.",
        "Save Preferences": "Einstellungen speichern",
        "Previous": "Zurück",
        "Next": "Weiter",
        "Refresh": "Aktualisieren",
        "Loading…": "Wird geladen…",
        "Not available": "Nicht verfügbar",
        "Online": "Online",
        "Available": "Verfügbar",
        "Connected": "Verbunden",
        "Not connected": "Nicht verbunden",
        "View all Blocks →": "Alle Blöcke anzeigen →",
        "View all Transactions →": "Alle Transaktionen anzeigen →",
        "Search address, transaction, block, or asset": "Adresse, Transaktion, Block oder Asset suchen",
        "Filter loaded transactions": "Geladene Transaktionen filtern",
        "Block, address, or asset": "Block, Adresse oder Asset",
        "KTA MARKET": "KTA-MARKT",
        "Live market chart": "Live-Marktdiagramm",
        "KEETAVIEW INDEX": "KEETAVIEW-INDEX",
        "Network Snapshot": "Netzwerkübersicht",
        "Indexed Blocks": "Indexierte Blöcke",
        "Indexed Transfers": "Indexierte Übertragungen",
        "Indexed Accounts": "Indexierte Konten",
        "Recent Avg. Operations": "Aktueller Operationsdurchschnitt",
        "These totals reflect the blocks currently indexed by this KeetaView database.": "Diese Summen beziehen sich auf die derzeit von dieser KeetaView-Datenbank indexierten Blöcke.",
        "View Analytics →": "Analysen anzeigen →",
        "MAINNET": "MAINNET",
        "Latest Blocks": "Neueste Blöcke",
        "INDEXED": "INDEXIERT",
        "Latest Transactions": "Neueste Transaktionen",
        "Market Cap": "Marktkapitalisierung",
        "24h Volume": "24-Stunden-Volumen",
        "Circulating Supply": "Umlaufmenge",
        "All-Time High": "Allzeithoch",
        "Market data provided by": "Marktdaten bereitgestellt von",
        "Filter this page": "Diese Seite filtern",
        "Block hash": "Block-Hash",
        "INDEXED MAINNET": "INDEXIERTES MAINNET",
        "Age": "Alter",
        "Operations": "Operationen",
        "Network": "Netzwerk",
        "Loading blocks…": "Blöcke werden geladen…",
        "No blocks on this page match that hash.": "Kein Block auf dieser Seite entspricht diesem Hash.",
        "No indexed blocks are available.": "Keine indexierten Blöcke verfügbar.",
        "Unable to load blocks. Make sure the KeetaView API server is running.": "Blöcke konnten nicht geladen werden. Stellen Sie sicher, dass die KeetaView-API ausgeführt wird.",
        "KEETAVIEW SYSTEM": "KEETAVIEW-SYSTEM",
        "Check the local API, indexed database, and latest stored activity.": "Lokale API, indexierte Datenbank und neueste gespeicherte Aktivität prüfen.",
        "Local API online": "Lokale API online",
        "Total Operations": "Operationen insgesamt",
        "Blocks stored locally": "Lokal gespeicherte Blöcke",
        "Token movements stored": "Gespeicherte Token-Bewegungen",
        "Observed addresses": "Beobachtete Adressen",
        "Unique observed addresses": "Eindeutige beobachtete Adressen",
        "Operations across indexed blocks": "Operationen in indexierten Blöcken",
        "Operations per indexed block": "Operationen pro indexiertem Block",
        "LOCAL SERVICES": "LOKALE DIENSTE",
        "Service Health": "Dienststatus",
        "Local indexed explorer data": "Lokal indexierte Explorer-Daten",
        "Verified Market Feed": "Verifizierter Marktdatenfeed",
        "CoinGecko KTA market data": "KTA-Marktdaten von CoinGecko",
        "DATABASE COVERAGE": "DATENBANKABDECKUNG",
        "DATABASE RANGE": "DATENBANKBEREICH",
        "Indexed Range": "Indexierter Bereich",
        "Index Coverage": "Indexabdeckung",
        "First Indexed Activity": "Erste indexierte Aktivität",
        "Latest Indexed Activity": "Neueste indexierte Aktivität",
        "Average Operations": "Durchschnittliche Operationen",
        "Last Status Check": "Letzte Statusprüfung",
        "Local index disclosure": "Hinweis zum lokalen Index",
        "KeetaView displays information stored by this local index. These totals are not guaranteed to represent the entire network.": "KeetaView zeigt Informationen aus diesem lokalen Index. Diese Summen stellen nicht garantiert das gesamte Netzwerk dar.",
        "INDEXED ACTIVITY": "INDEXIERTE AKTIVITÄT",
        "Transfers by Day": "Übertragungen pro Tag",
        "Latest 14 indexed days": "Letzte 14 indexierte Tage",
        "These figures describe this local KeetaView index, not guaranteed network-wide totals.": "Diese Werte beschreiben den lokalen KeetaView-Index und sind keine garantierten netzwerkweiten Summen.",
        "TRANSFER ACTIVITY": "ÜBERTRAGUNGSAKTIVITÄT",
        "Most Active Senders": "Aktivste Sender",
        "Most Active Recipients": "Aktivste Empfänger",
        "Up to 100 indexed results": "Bis zu 100 indexierte Ergebnisse",
        "ASSET MOVEMENT": "ASSET-BEWEGUNG",
        "Most Active Assets": "Aktivste Assets",
        "LATEST INDEXED": "ZULETZT INDEXIERT",
        "Recent Transfers": "Neueste Übertragungen",
        "KEETAVIEW ASSETS": "KEETAVIEW-ASSETS",
        "Known Assets": "Bekannte Assets",
        "Assets discovered and remembered by this KeetaView browser.": "Von diesem KeetaView-Browser entdeckte und gespeicherte Assets.",
        "Filter assets": "Assets filtern",
        "Symbol, name, or address": "Symbol, Name oder Adresse",
        "DISCOVERED ON KEETA": "AUF KEETA ENTDECKT",
        "Asset Directory": "Asset-Verzeichnis",
        "Name": "Name",
        "Supply": "Angebot",
        "Browse accounts observed by this local KeetaView index.": "Konten durchsuchen, die von diesem lokalen KeetaView-Index beobachtet wurden.",
        "Keeta address": "Keeta-Adresse",
        "OBSERVED ACCOUNTS": "BEOBACHTETE KONTEN",
        "Address Directory": "Adressverzeichnis",
        "First Observed": "Erstmals beobachtet",
        "Mainnet": "Mainnet",
        "Copy": "Kopieren",
        "Copied": "Kopiert",
        "Browse the latest token movements stored by KeetaView.": "Die neuesten von KeetaView gespeicherten Token-Bewegungen durchsuchen.",
        "Token Transfers": "Token-Übertragungen",
        "From": "Von",
        "To": "An",
        "Amount": "Betrag",
        "← Back to Search": "← Zurück zur Suche",
        "← Back to Assets": "← Zurück zu den Assets",
        "Block Details": "Blockdetails",
        "Loading block...": "Block wird geladen...",
        "Loading operations...": "Operationen werden geladen...",
        "No block selected": "Kein Block ausgewählt",
        "Search for a block or return to the Blocks page.": "Suchen Sie nach einem Block oder kehren Sie zur Blockseite zurück.",
        "No operations to display.": "Keine Operationen anzuzeigen.",
        "Operation": "Operation",
        "Hash": "Hash",
        "Time": "Zeit",
        "Version": "Version",
        "Previous Block": "Vorheriger Block",
        "Recipient:": "Empfänger:",
        "Token:": "Token:",
        "Amount:": "Betrag:",
        "Transaction Hash": "Transaktions-Hash",
        "Waiting for search data": "Warten auf Suchdaten",
        "Success": "Erfolgreich",
        "Fee": "Gebühr",
        "Unavailable": "Nicht verfügbar",
        "Unable to load transaction": "Transaktion konnte nicht geladen werden",
        "Address Details": "Adressdetails",
        "Loading address...": "Adresse wird geladen...",
        "Balances": "Guthaben",
        "Loading balances...": "Guthaben werden geladen...",
        "Recent Activity": "Neueste Aktivität",
        "Type": "Typ",
        "Not set": "Nicht festgelegt",
        "Description": "Beschreibung",
        "Head Block Height": "Höhe des Hauptblocks",
        "Token Balance": "Token-Guthaben",
        "Balance:": "Guthaben:",
        "Transfer": "Übertragung",
        "No address was provided. Search for an address from the homepage.": "Es wurde keine Adresse angegeben. Suchen Sie auf der Startseite nach einer Adresse.",
        "KEETA NETWORK ASSET": "KEETA-NETZWERK-ASSET",
        "Loading Asset...": "Asset wird geladen...",
        "Network Asset Supply": "Angebot des Netzwerk-Assets",
        "Decimals": "Dezimalstellen",
        "Loading recent transfers...": "Neueste Übertragungen werden geladen...",
        "No asset provided": "Kein Asset angegeben",
        "Asset information unavailable": "Asset-Informationen nicht verfügbar",
        "Unknown Asset": "Unbekanntes Asset",
        "Unable to load asset": "Asset konnte nicht geladen werden",
        "No recent transfers found.": "Keine aktuellen Übertragungen gefunden.",
        "Unable to load recent transfers.": "Neueste Übertragungen konnten nicht geladen werden."
    },
    "zh-CN": {
        "Home": "首页",
        "Blocks": "区块",
        "Transactions": "交易",
        "Addresses": "地址",
        "Assets": "资产",
        "Analytics": "分析",
        "Status": "状态",
        "Search": "搜索",
        "Transaction": "交易",
        "Address": "地址",
        "Block": "区块",
        "Asset": "资产",
        "Settings": "设置",
        "Language": "语言",
        "Choose desired language": "选择语言",
        "Currency": "货币",
        "Choose desired currency": "选择货币",
        "Theme": "主题",
        "Choose the site appearance": "选择网站外观",
        "Soft Gray": "柔和灰",
        "Clean White": "简洁白",
        "Address Display": "地址显示",
        "Choose address truncation format": "选择地址缩写格式",
        "Date & Time": "日期和时间",
        "Display times locally or in UTC": "显示本地时间或 UTC",
        "Local time": "本地时间",
        "Time Format": "时间格式",
        "Choose a 12-hour or 24-hour clock": "选择 12 小时制或 24 小时制",
        "12-hour": "12 小时制",
        "24-hour": "24 小时制",
        "Date Format": "日期格式",
        "Choose how calendar dates appear": "选择日期显示方式",
        "Use device format": "使用设备格式",
        "Month / Day / Year": "月 / 日 / 年",
        "Day / Month / Year": "日 / 月 / 年",
        "Refresh Rate": "刷新频率",
        "Choose how often live information refreshes": "选择实时信息刷新频率",
        "Every 30 seconds": "每 30 秒",
        "Every minute": "每分钟",
        "Manual only": "仅手动",
        "Number Display": "数字显示",
        "Show complete or shortened large numbers": "完整或缩写显示大数字",
        "Full (22,457)": "完整（22,457）",
        "Compact (22.5K)": "简写（22.5K）",
        "Preferences are saved on this browser.": "偏好设置保存在此浏览器中。",
        "Preferences saved.": "偏好设置已保存。",
        "Save Preferences": "保存偏好设置",
        "Previous": "上一页",
        "Next": "下一页",
        "Refresh": "刷新",
        "Loading…": "加载中…",
        "Not available": "不可用",
        "Online": "在线",
        "Available": "可用",
        "Connected": "已连接",
        "Not connected": "未连接",
        "View all Blocks →": "查看所有区块 →",
        "View all Transactions →": "查看所有交易 →",
        "Search address, transaction, block, or asset": "搜索地址、交易、区块或资产",
        "Filter loaded transactions": "筛选已加载的交易",
        "Block, address, or asset": "区块、地址或资产",
        "KTA MARKET": "KTA 市场",
        "Live market chart": "实时市场图表",
        "KEETAVIEW INDEX": "KEETAVIEW 索引",
        "Network Snapshot": "网络概览",
        "Indexed Blocks": "已索引区块",
        "Indexed Transfers": "已索引转账",
        "Indexed Accounts": "已索引账户",
        "Recent Avg. Operations": "近期平均操作数",
        "These totals reflect the blocks currently indexed by this KeetaView database.": "这些总数反映此 KeetaView 数据库当前索引的区块。",
        "View Analytics →": "查看分析 →",
        "MAINNET": "主网",
        "Latest Blocks": "最新区块",
        "INDEXED": "已索引",
        "Latest Transactions": "最新交易",
        "Market Cap": "市值",
        "24h Volume": "24 小时交易量",
        "Circulating Supply": "流通供应量",
        "All-Time High": "历史最高价",
        "Market data provided by": "市场数据提供方",
        "Filter this page": "筛选此页面",
        "Block hash": "区块哈希",
        "INDEXED MAINNET": "已索引主网",
        "Age": "时间",
        "Operations": "操作",
        "Network": "网络",
        "Loading blocks…": "正在加载区块…",
        "No blocks on this page match that hash.": "此页面没有与该哈希匹配的区块。",
        "No indexed blocks are available.": "没有可用的已索引区块。",
        "Unable to load blocks. Make sure the KeetaView API server is running.": "无法加载区块。请确认 KeetaView API 正在运行。",
        "KEETAVIEW SYSTEM": "KEETAVIEW 系统",
        "Check the local API, indexed database, and latest stored activity.": "检查本地 API、索引数据库和最新存储活动。",
        "Local API online": "本地 API 在线",
        "Total Operations": "操作总数",
        "Blocks stored locally": "本地存储的区块",
        "Token movements stored": "已存储的代币转移",
        "Observed addresses": "已观察地址",
        "Unique observed addresses": "唯一观察地址",
        "Operations across indexed blocks": "已索引区块中的操作",
        "Operations per indexed block": "每个已索引区块的操作数",
        "LOCAL SERVICES": "本地服务",
        "Service Health": "服务状态",
        "Local indexed explorer data": "本地索引的浏览器数据",
        "Verified Market Feed": "已验证市场数据源",
        "CoinGecko KTA market data": "CoinGecko KTA 市场数据",
        "DATABASE COVERAGE": "数据库覆盖范围",
        "DATABASE RANGE": "数据库范围",
        "Indexed Range": "索引范围",
        "Index Coverage": "索引覆盖范围",
        "First Indexed Activity": "首次索引活动",
        "Latest Indexed Activity": "最新索引活动",
        "Average Operations": "平均操作数",
        "Last Status Check": "上次状态检查",
        "Local index disclosure": "本地索引说明",
        "KeetaView displays information stored by this local index. These totals are not guaranteed to represent the entire network.": "KeetaView 显示此本地索引存储的信息。这些总数不保证代表整个网络。",
        "INDEXED ACTIVITY": "索引活动",
        "Transfers by Day": "每日转账",
        "Latest 14 indexed days": "最近 14 个索引日",
        "These figures describe this local KeetaView index, not guaranteed network-wide totals.": "这些数据描述本地 KeetaView 索引，不保证代表全网总数。",
        "TRANSFER ACTIVITY": "转账活动",
        "Most Active Senders": "最活跃发送方",
        "Most Active Recipients": "最活跃接收方",
        "Up to 100 indexed results": "最多 100 条索引结果",
        "ASSET MOVEMENT": "资产流动",
        "Most Active Assets": "最活跃资产",
        "LATEST INDEXED": "最新索引",
        "Recent Transfers": "近期转账",
        "KEETAVIEW ASSETS": "KEETAVIEW 资产",
        "Known Assets": "已知资产",
        "Assets discovered and remembered by this KeetaView browser.": "此 KeetaView 浏览器发现并记住的资产。",
        "Filter assets": "筛选资产",
        "Symbol, name, or address": "符号、名称或地址",
        "DISCOVERED ON KEETA": "在 KEETA 上发现",
        "Asset Directory": "资产目录",
        "Name": "名称",
        "Supply": "供应量",
        "Browse accounts observed by this local KeetaView index.": "浏览此本地 KeetaView 索引观察到的账户。",
        "Keeta address": "Keeta 地址",
        "OBSERVED ACCOUNTS": "已观察账户",
        "Address Directory": "地址目录",
        "First Observed": "首次观察",
        "Mainnet": "主网",
        "Copy": "复制",
        "Copied": "已复制",
        "Browse the latest token movements stored by KeetaView.": "浏览 KeetaView 存储的最新代币转移。",
        "Token Transfers": "代币转账",
        "From": "发送方",
        "To": "接收方",
        "Amount": "数量",
        "← Back to Search": "← 返回搜索",
        "← Back to Assets": "← 返回资产",
        "Block Details": "区块详情",
        "Loading block...": "正在加载区块...",
        "Loading operations...": "正在加载操作...",
        "No block selected": "未选择区块",
        "Search for a block or return to the Blocks page.": "搜索区块或返回区块页面。",
        "No operations to display.": "没有可显示的操作。",
        "Operation": "操作",
        "Hash": "哈希",
        "Time": "时间",
        "Version": "版本",
        "Previous Block": "上一个区块",
        "Recipient:": "接收方：",
        "Token:": "代币：",
        "Amount:": "数量：",
        "Transaction Hash": "交易哈希",
        "Waiting for search data": "正在等待搜索数据",
        "Success": "成功",
        "Fee": "手续费",
        "Unavailable": "不可用",
        "Unable to load transaction": "无法加载交易",
        "Address Details": "地址详情",
        "Loading address...": "正在加载地址...",
        "Balances": "余额",
        "Loading balances...": "正在加载余额...",
        "Recent Activity": "近期活动",
        "Type": "类型",
        "Not set": "未设置",
        "Description": "描述",
        "Head Block Height": "头部区块高度",
        "Token Balance": "代币余额",
        "Balance:": "余额：",
        "Transfer": "转账",
        "No address was provided. Search for an address from the homepage.": "未提供地址。请从首页搜索地址。",
        "KEETA NETWORK ASSET": "KEETA 网络资产",
        "Loading Asset...": "正在加载资产...",
        "Network Asset Supply": "网络资产供应量",
        "Decimals": "小数位数",
        "Loading recent transfers...": "正在加载近期转账...",
        "No asset provided": "未提供资产",
        "Asset information unavailable": "资产信息不可用",
        "Unknown Asset": "未知资产",
        "Unable to load asset": "无法加载资产",
        "No recent transfers found.": "未找到近期转账。",
        "Unable to load recent transfers.": "无法加载近期转账。"
    },
    hi: {
        "Home": "होम",
        "Blocks": "ब्लॉक",
        "Transactions": "लेन-देन",
        "Addresses": "पते",
        "Assets": "एसेट",
        "Analytics": "विश्लेषण",
        "Status": "स्थिति",
        "Search": "खोजें",
        "Transaction": "लेन-देन",
        "Address": "पता",
        "Block": "ब्लॉक",
        "Asset": "एसेट",
        "Settings": "सेटिंग्स",
        "Language": "भाषा",
        "Choose desired language": "अपनी भाषा चुनें",
        "Currency": "मुद्रा",
        "Choose desired currency": "अपनी मुद्रा चुनें",
        "Theme": "थीम",
        "Choose the site appearance": "साइट का रूप चुनें",
        "Soft Gray": "हल्का धूसर",
        "Clean White": "साफ़ सफ़ेद",
        "Address Display": "पता प्रदर्शन",
        "Choose address truncation format": "पते को छोटा दिखाने का प्रारूप चुनें",
        "Date & Time": "तारीख और समय",
        "Display times locally or in UTC": "समय स्थानीय रूप में या UTC में दिखाएँ",
        "Local time": "स्थानीय समय",
        "Time Format": "समय प्रारूप",
        "Choose a 12-hour or 24-hour clock": "12 या 24 घंटे का प्रारूप चुनें",
        "12-hour": "12 घंटे",
        "24-hour": "24 घंटे",
        "Date Format": "तारीख प्रारूप",
        "Choose how calendar dates appear": "तारीख दिखाने का प्रारूप चुनें",
        "Use device format": "डिवाइस का प्रारूप",
        "Month / Day / Year": "महीना / दिन / वर्ष",
        "Day / Month / Year": "दिन / महीना / वर्ष",
        "Refresh Rate": "रीफ़्रेश दर",
        "Choose how often live information refreshes": "लाइव जानकारी कितनी बार रीफ़्रेश हो चुनें",
        "Every 30 seconds": "हर 30 सेकंड",
        "Every minute": "हर मिनट",
        "Manual only": "केवल मैन्युअल",
        "Number Display": "संख्या प्रदर्शन",
        "Show complete or shortened large numbers": "बड़ी संख्याएँ पूरी या छोटी दिखाएँ",
        "Full (22,457)": "पूर्ण (22,457)",
        "Compact (22.5K)": "संक्षिप्त (22.5K)",
        "Preferences are saved on this browser.": "प्राथमिकताएँ इस ब्राउज़र में सहेजी जाती हैं।",
        "Preferences saved.": "प्राथमिकताएँ सहेजी गईं।",
        "Save Preferences": "प्राथमिकताएँ सहेजें",
        "Previous": "पिछला",
        "Next": "अगला",
        "Refresh": "रीफ़्रेश",
        "Loading…": "लोड हो रहा है…",
        "Not available": "उपलब्ध नहीं",
        "Online": "ऑनलाइन",
        "Available": "उपलब्ध",
        "Connected": "कनेक्टेड",
        "Not connected": "कनेक्ट नहीं है",
        "View all Blocks →": "सभी ब्लॉक देखें →",
        "View all Transactions →": "सभी लेन-देन देखें →",
        "Search address, transaction, block, or asset": "पता, लेन-देन, ब्लॉक या एसेट खोजें",
        "Filter loaded transactions": "लोड किए गए लेन-देन फ़िल्टर करें",
        "Block, address, or asset": "ब्लॉक, पता या एसेट",
        "KTA MARKET": "KTA बाज़ार",
        "Live market chart": "लाइव बाज़ार चार्ट",
        "KEETAVIEW INDEX": "KEETAVIEW इंडेक्स",
        "Network Snapshot": "नेटवर्क सारांश",
        "Indexed Blocks": "इंडेक्स किए गए ब्लॉक",
        "Indexed Transfers": "इंडेक्स किए गए ट्रांसफ़र",
        "Indexed Accounts": "इंडेक्स किए गए खाते",
        "Recent Avg. Operations": "हाल के औसत ऑपरेशन",
        "These totals reflect the blocks currently indexed by this KeetaView database.": "ये कुल आँकड़े इस KeetaView डेटाबेस में वर्तमान में इंडेक्स किए गए ब्लॉक दर्शाते हैं।",
        "View Analytics →": "विश्लेषण देखें →",
        "MAINNET": "मेननेट",
        "Latest Blocks": "नवीनतम ब्लॉक",
        "INDEXED": "इंडेक्स किया गया",
        "Latest Transactions": "नवीनतम लेन-देन",
        "Market Cap": "बाज़ार पूँजीकरण",
        "24h Volume": "24 घंटे का वॉल्यूम",
        "Circulating Supply": "प्रचलित आपूर्ति",
        "All-Time High": "सर्वकालिक उच्च",
        "Market data provided by": "बाज़ार डेटा प्रदाता",
        "Filter this page": "इस पृष्ठ को फ़िल्टर करें",
        "Block hash": "ब्लॉक हैश",
        "INDEXED MAINNET": "इंडेक्स किया गया मेननेट",
        "Age": "समय",
        "Operations": "ऑपरेशन",
        "Network": "नेटवर्क",
        "Loading blocks…": "ब्लॉक लोड हो रहे हैं…",
        "No blocks on this page match that hash.": "इस पृष्ठ पर उस हैश से कोई ब्लॉक मेल नहीं खाता।",
        "No indexed blocks are available.": "कोई इंडेक्स किया गया ब्लॉक उपलब्ध नहीं है।",
        "Unable to load blocks. Make sure the KeetaView API server is running.": "ब्लॉक लोड नहीं हो सके। सुनिश्चित करें कि KeetaView API सर्वर चल रहा है।",
        "KEETAVIEW SYSTEM": "KEETAVIEW सिस्टम",
        "Check the local API, indexed database, and latest stored activity.": "स्थानीय API, इंडेक्स डेटाबेस और नवीनतम संग्रहीत गतिविधि जाँचें।",
        "Local API online": "स्थानीय API ऑनलाइन",
        "Total Operations": "कुल ऑपरेशन",
        "Blocks stored locally": "स्थानीय रूप से संग्रहीत ब्लॉक",
        "Token movements stored": "संग्रहीत टोकन गतिविधियाँ",
        "Observed addresses": "देखे गए पते",
        "Unique observed addresses": "अद्वितीय देखे गए पते",
        "Operations across indexed blocks": "इंडेक्स किए गए ब्लॉक में ऑपरेशन",
        "Operations per indexed block": "प्रति इंडेक्स ब्लॉक ऑपरेशन",
        "LOCAL SERVICES": "स्थानीय सेवाएँ",
        "Service Health": "सेवा की स्थिति",
        "Local indexed explorer data": "स्थानीय इंडेक्स एक्सप्लोरर डेटा",
        "Verified Market Feed": "सत्यापित बाज़ार फ़ीड",
        "CoinGecko KTA market data": "CoinGecko KTA बाज़ार डेटा",
        "DATABASE COVERAGE": "डेटाबेस कवरेज",
        "DATABASE RANGE": "डेटाबेस सीमा",
        "Indexed Range": "इंडेक्स की सीमा",
        "Index Coverage": "इंडेक्स कवरेज",
        "First Indexed Activity": "पहली इंडेक्स गतिविधि",
        "Latest Indexed Activity": "नवीनतम इंडेक्स गतिविधि",
        "Average Operations": "औसत ऑपरेशन",
        "Last Status Check": "अंतिम स्थिति जाँच",
        "Local index disclosure": "स्थानीय इंडेक्स सूचना",
        "KeetaView displays information stored by this local index. These totals are not guaranteed to represent the entire network.": "KeetaView इस स्थानीय इंडेक्स में संग्रहीत जानकारी दिखाता है। ये कुल आँकड़े पूरे नेटवर्क का प्रतिनिधित्व करने की गारंटी नहीं देते।",
        "INDEXED ACTIVITY": "इंडेक्स गतिविधि",
        "Transfers by Day": "दिन के अनुसार ट्रांसफ़र",
        "Latest 14 indexed days": "नवीनतम 14 इंडेक्स दिन",
        "These figures describe this local KeetaView index, not guaranteed network-wide totals.": "ये आँकड़े इस स्थानीय KeetaView इंडेक्स का वर्णन करते हैं, पूरे नेटवर्क के कुल आँकड़ों की गारंटी नहीं देते।",
        "TRANSFER ACTIVITY": "ट्रांसफ़र गतिविधि",
        "Most Active Senders": "सबसे सक्रिय प्रेषक",
        "Most Active Recipients": "सबसे सक्रिय प्राप्तकर्ता",
        "Up to 100 indexed results": "अधिकतम 100 इंडेक्स परिणाम",
        "ASSET MOVEMENT": "एसेट गतिविधि",
        "Most Active Assets": "सबसे सक्रिय एसेट",
        "LATEST INDEXED": "नवीनतम इंडेक्स",
        "Recent Transfers": "हाल के ट्रांसफ़र",
        "KEETAVIEW ASSETS": "KEETAVIEW एसेट",
        "Known Assets": "ज्ञात एसेट",
        "Assets discovered and remembered by this KeetaView browser.": "इस KeetaView ब्राउज़र द्वारा खोजे और सहेजे गए एसेट।",
        "Filter assets": "एसेट फ़िल्टर करें",
        "Symbol, name, or address": "प्रतीक, नाम या पता",
        "DISCOVERED ON KEETA": "KEETA पर खोजे गए",
        "Asset Directory": "एसेट निर्देशिका",
        "Name": "नाम",
        "Supply": "आपूर्ति",
        "Browse accounts observed by this local KeetaView index.": "इस स्थानीय KeetaView इंडेक्स द्वारा देखे गए खाते ब्राउज़ करें।",
        "Keeta address": "Keeta पता",
        "OBSERVED ACCOUNTS": "देखे गए खाते",
        "Address Directory": "पता निर्देशिका",
        "First Observed": "पहली बार देखा गया",
        "Mainnet": "मेननेट",
        "Copy": "कॉपी करें",
        "Copied": "कॉपी किया गया",
        "Browse the latest token movements stored by KeetaView.": "KeetaView में संग्रहीत नवीनतम टोकन गतिविधियाँ देखें।",
        "Token Transfers": "टोकन ट्रांसफ़र",
        "From": "से",
        "To": "को",
        "Amount": "राशि",
        "← Back to Search": "← खोज पर वापस जाएँ",
        "← Back to Assets": "← एसेट पर वापस जाएँ",
        "Block Details": "ब्लॉक विवरण",
        "Loading block...": "ब्लॉक लोड हो रहा है...",
        "Loading operations...": "ऑपरेशन लोड हो रहे हैं...",
        "No block selected": "कोई ब्लॉक चयनित नहीं",
        "Search for a block or return to the Blocks page.": "ब्लॉक खोजें या ब्लॉक पृष्ठ पर वापस जाएँ।",
        "No operations to display.": "दिखाने के लिए कोई ऑपरेशन नहीं।",
        "Operation": "ऑपरेशन",
        "Hash": "हैश",
        "Time": "समय",
        "Version": "संस्करण",
        "Previous Block": "पिछला ब्लॉक",
        "Recipient:": "प्राप्तकर्ता:",
        "Token:": "टोकन:",
        "Amount:": "राशि:",
        "Transaction Hash": "लेन-देन हैश",
        "Waiting for search data": "खोज डेटा की प्रतीक्षा है",
        "Success": "सफल",
        "Fee": "शुल्क",
        "Unavailable": "अनुपलब्ध",
        "Unable to load transaction": "लेन-देन लोड नहीं हो सका",
        "Address Details": "पते का विवरण",
        "Loading address...": "पता लोड हो रहा है...",
        "Balances": "शेष राशि",
        "Loading balances...": "शेष राशियाँ लोड हो रही हैं...",
        "Recent Activity": "हाल की गतिविधि",
        "Type": "प्रकार",
        "Not set": "सेट नहीं है",
        "Description": "विवरण",
        "Head Block Height": "शीर्ष ब्लॉक ऊँचाई",
        "Token Balance": "टोकन शेष",
        "Balance:": "शेष:",
        "Transfer": "ट्रांसफ़र",
        "No address was provided. Search for an address from the homepage.": "कोई पता नहीं दिया गया। होमपेज से पता खोजें।",
        "KEETA NETWORK ASSET": "KEETA नेटवर्क एसेट",
        "Loading Asset...": "एसेट लोड हो रहा है...",
        "Network Asset Supply": "नेटवर्क एसेट आपूर्ति",
        "Decimals": "दशमलव",
        "Loading recent transfers...": "हाल के ट्रांसफ़र लोड हो रहे हैं...",
        "No asset provided": "कोई एसेट नहीं दिया गया",
        "Asset information unavailable": "एसेट जानकारी उपलब्ध नहीं",
        "Unknown Asset": "अज्ञात एसेट",
        "Unable to load asset": "एसेट लोड नहीं हो सका",
        "No recent transfers found.": "कोई हाल का ट्रांसफ़र नहीं मिला।",
        "Unable to load recent transfers.": "हाल के ट्रांसफ़र लोड नहीं हो सके।"
    },
    ar: {
        "Home": "الرئيسية",
        "Blocks": "الكتل",
        "Transactions": "المعاملات",
        "Addresses": "العناوين",
        "Assets": "الأصول",
        "Analytics": "التحليلات",
        "Status": "الحالة",
        "Search": "بحث",
        "Transaction": "معاملة",
        "Address": "عنوان",
        "Block": "كتلة",
        "Asset": "أصل",
        "Settings": "الإعدادات",
        "Language": "اللغة",
        "Choose desired language": "اختر اللغة المطلوبة",
        "Currency": "العملة",
        "Choose desired currency": "اختر العملة المطلوبة",
        "Theme": "المظهر",
        "Choose the site appearance": "اختر مظهر الموقع",
        "Soft Gray": "رمادي هادئ",
        "Clean White": "أبيض نقي",
        "Address Display": "عرض العنوان",
        "Choose address truncation format": "اختر تنسيق اختصار العنوان",
        "Date & Time": "التاريخ والوقت",
        "Display times locally or in UTC": "اعرض الوقت محليًا أو بتوقيت UTC",
        "Local time": "الوقت المحلي",
        "Time Format": "تنسيق الوقت",
        "Choose a 12-hour or 24-hour clock": "اختر نظام 12 أو 24 ساعة",
        "12-hour": "12 ساعة",
        "24-hour": "24 ساعة",
        "Date Format": "تنسيق التاريخ",
        "Choose how calendar dates appear": "اختر كيفية عرض التواريخ",
        "Use device format": "استخدم تنسيق الجهاز",
        "Month / Day / Year": "الشهر / اليوم / السنة",
        "Day / Month / Year": "اليوم / الشهر / السنة",
        "Refresh Rate": "معدل التحديث",
        "Choose how often live information refreshes": "اختر معدل تحديث المعلومات المباشرة",
        "Every 30 seconds": "كل 30 ثانية",
        "Every minute": "كل دقيقة",
        "Manual only": "يدوي فقط",
        "Number Display": "عرض الأرقام",
        "Show complete or shortened large numbers": "اعرض الأرقام الكبيرة كاملة أو مختصرة",
        "Full (22,457)": "كامل (22,457)",
        "Compact (22.5K)": "مختصر (22.5K)",
        "Preferences are saved on this browser.": "تُحفظ التفضيلات في هذا المتصفح.",
        "Preferences saved.": "تم حفظ التفضيلات.",
        "Save Preferences": "حفظ التفضيلات",
        "Previous": "السابق",
        "Next": "التالي",
        "Refresh": "تحديث",
        "Loading…": "جارٍ التحميل…",
        "Not available": "غير متاح",
        "Online": "متصل",
        "Available": "متاح",
        "Connected": "متصل",
        "Not connected": "غير متصل",
        "View all Blocks →": "عرض جميع الكتل ←",
        "View all Transactions →": "عرض جميع المعاملات ←",
        "Search address, transaction, block, or asset": "ابحث عن عنوان أو معاملة أو كتلة أو أصل",
        "Filter loaded transactions": "تصفية المعاملات المحملة",
        "Block, address, or asset": "كتلة أو عنوان أو أصل",
        "KTA MARKET": "سوق KTA",
        "Live market chart": "مخطط السوق المباشر",
        "KEETAVIEW INDEX": "فهرس KEETAVIEW",
        "Network Snapshot": "ملخص الشبكة",
        "Indexed Blocks": "الكتل المفهرسة",
        "Indexed Transfers": "التحويلات المفهرسة",
        "Indexed Accounts": "الحسابات المفهرسة",
        "Recent Avg. Operations": "متوسط العمليات الأخيرة",
        "These totals reflect the blocks currently indexed by this KeetaView database.": "تعكس هذه الإجماليات الكتل المفهرسة حاليًا في قاعدة بيانات KeetaView.",
        "View Analytics →": "عرض التحليلات ←",
        "MAINNET": "الشبكة الرئيسية",
        "Latest Blocks": "أحدث الكتل",
        "INDEXED": "مفهرس",
        "Latest Transactions": "أحدث المعاملات",
        "Market Cap": "القيمة السوقية",
        "24h Volume": "حجم التداول خلال 24 ساعة",
        "Circulating Supply": "المعروض المتداول",
        "All-Time High": "أعلى سعر تاريخي",
        "Market data provided by": "بيانات السوق مقدمة من",
        "Filter this page": "تصفية هذه الصفحة",
        "Block hash": "تجزئة الكتلة",
        "INDEXED MAINNET": "الشبكة الرئيسية المفهرسة",
        "Age": "العمر",
        "Operations": "العمليات",
        "Network": "الشبكة",
        "Loading blocks…": "جارٍ تحميل الكتل…",
        "No blocks on this page match that hash.": "لا توجد كتل في هذه الصفحة تطابق تلك التجزئة.",
        "No indexed blocks are available.": "لا توجد كتل مفهرسة متاحة.",
        "Unable to load blocks. Make sure the KeetaView API server is running.": "تعذر تحميل الكتل. تأكد من تشغيل خادم KeetaView API.",
        "KEETAVIEW SYSTEM": "نظام KEETAVIEW",
        "Check the local API, indexed database, and latest stored activity.": "تحقق من واجهة API المحلية وقاعدة البيانات المفهرسة وأحدث نشاط محفوظ.",
        "Local API online": "واجهة API المحلية متصلة",
        "Total Operations": "إجمالي العمليات",
        "Blocks stored locally": "الكتل المحفوظة محليًا",
        "Token movements stored": "حركات الرموز المحفوظة",
        "Observed addresses": "العناوين المرصودة",
        "Unique observed addresses": "العناوين الفريدة المرصودة",
        "Operations across indexed blocks": "العمليات ضمن الكتل المفهرسة",
        "Operations per indexed block": "العمليات لكل كتلة مفهرسة",
        "LOCAL SERVICES": "الخدمات المحلية",
        "Service Health": "حالة الخدمات",
        "Local indexed explorer data": "بيانات المستكشف المفهرسة محليًا",
        "Verified Market Feed": "بيانات سوق موثقة",
        "CoinGecko KTA market data": "بيانات سوق KTA من CoinGecko",
        "DATABASE COVERAGE": "تغطية قاعدة البيانات",
        "DATABASE RANGE": "نطاق قاعدة البيانات",
        "Indexed Range": "النطاق المفهرس",
        "Index Coverage": "تغطية الفهرس",
        "First Indexed Activity": "أول نشاط مفهرس",
        "Latest Indexed Activity": "أحدث نشاط مفهرس",
        "Average Operations": "متوسط العمليات",
        "Last Status Check": "آخر فحص للحالة",
        "Local index disclosure": "إفصاح الفهرس المحلي",
        "KeetaView displays information stored by this local index. These totals are not guaranteed to represent the entire network.": "يعرض KeetaView المعلومات المحفوظة في هذا الفهرس المحلي. لا يُضمن أن تمثل هذه الإجماليات الشبكة بأكملها.",
        "INDEXED ACTIVITY": "النشاط المفهرس",
        "Transfers by Day": "التحويلات حسب اليوم",
        "Latest 14 indexed days": "آخر 14 يومًا مفهرسًا",
        "These figures describe this local KeetaView index, not guaranteed network-wide totals.": "تصف هذه الأرقام فهرس KeetaView المحلي ولا تمثل بالضرورة إجماليات الشبكة.",
        "TRANSFER ACTIVITY": "نشاط التحويلات",
        "Most Active Senders": "أكثر المرسلين نشاطًا",
        "Most Active Recipients": "أكثر المستلمين نشاطًا",
        "Up to 100 indexed results": "حتى 100 نتيجة مفهرسة",
        "ASSET MOVEMENT": "حركة الأصول",
        "Most Active Assets": "الأصول الأكثر نشاطًا",
        "LATEST INDEXED": "أحدث ما تم فهرسته",
        "Recent Transfers": "التحويلات الأخيرة",
        "KEETAVIEW ASSETS": "أصول KEETAVIEW",
        "Known Assets": "الأصول المعروفة",
        "Assets discovered and remembered by this KeetaView browser.": "الأصول التي اكتشفها وحفظها متصفح KeetaView.",
        "Filter assets": "تصفية الأصول",
        "Symbol, name, or address": "الرمز أو الاسم أو العنوان",
        "DISCOVERED ON KEETA": "مكتشف على KEETA",
        "Asset Directory": "دليل الأصول",
        "Name": "الاسم",
        "Supply": "المعروض",
        "Browse accounts observed by this local KeetaView index.": "تصفح الحسابات التي رصدها فهرس KeetaView المحلي.",
        "Keeta address": "عنوان Keeta",
        "OBSERVED ACCOUNTS": "الحسابات المرصودة",
        "Address Directory": "دليل العناوين",
        "First Observed": "أول رصد",
        "Mainnet": "الشبكة الرئيسية",
        "Copy": "نسخ",
        "Copied": "تم النسخ",
        "Browse the latest token movements stored by KeetaView.": "تصفح أحدث حركات الرموز المحفوظة في KeetaView.",
        "Token Transfers": "تحويلات الرموز",
        "From": "من",
        "To": "إلى",
        "Amount": "المبلغ",
        "← Back to Search": "العودة إلى البحث →",
        "← Back to Assets": "العودة إلى الأصول →",
        "Block Details": "تفاصيل الكتلة",
        "Loading block...": "جارٍ تحميل الكتلة...",
        "Loading operations...": "جارٍ تحميل العمليات...",
        "No block selected": "لم يتم تحديد كتلة",
        "Search for a block or return to the Blocks page.": "ابحث عن كتلة أو عُد إلى صفحة الكتل.",
        "No operations to display.": "لا توجد عمليات لعرضها.",
        "Operation": "العملية",
        "Hash": "التجزئة",
        "Time": "الوقت",
        "Version": "الإصدار",
        "Previous Block": "الكتلة السابقة",
        "Recipient:": "المستلم:",
        "Token:": "الرمز:",
        "Amount:": "المبلغ:",
        "Transaction Hash": "تجزئة المعاملة",
        "Waiting for search data": "في انتظار بيانات البحث",
        "Success": "ناجحة",
        "Fee": "الرسوم",
        "Unavailable": "غير متاح",
        "Unable to load transaction": "تعذر تحميل المعاملة",
        "Address Details": "تفاصيل العنوان",
        "Loading address...": "جارٍ تحميل العنوان...",
        "Balances": "الأرصدة",
        "Loading balances...": "جارٍ تحميل الأرصدة...",
        "Recent Activity": "النشاط الأخير",
        "Type": "النوع",
        "Not set": "غير محدد",
        "Description": "الوصف",
        "Head Block Height": "ارتفاع الكتلة الرئيسية",
        "Token Balance": "رصيد الرمز",
        "Balance:": "الرصيد:",
        "Transfer": "تحويل",
        "No address was provided. Search for an address from the homepage.": "لم يتم إدخال عنوان. ابحث عن عنوان من الصفحة الرئيسية.",
        "KEETA NETWORK ASSET": "أصل شبكة KEETA",
        "Loading Asset...": "جارٍ تحميل الأصل...",
        "Network Asset Supply": "معروض أصل الشبكة",
        "Decimals": "المنازل العشرية",
        "Loading recent transfers...": "جارٍ تحميل التحويلات الأخيرة...",
        "No asset provided": "لم يتم إدخال أصل",
        "Asset information unavailable": "معلومات الأصل غير متاحة",
        "Unknown Asset": "أصل غير معروف",
        "Unable to load asset": "تعذر تحميل الأصل",
        "No recent transfers found.": "لم يتم العثور على تحويلات حديثة.",
        "Unable to load recent transfers.": "تعذر تحميل التحويلات الأخيرة."
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
                )
                .replace(
                    /(\d+)–(\d+) of ([\d,]+)/g,
                    "$1–$2 de $3"
                )
                .replace(
                    /(\d+) matching on this page/g,
                    "$1 coincidentes en esta página"
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
                )
                .replace(
                    /(\d+)–(\d+) of ([\d,]+)/g,
                    "$1–$2 sur $3"
                )
                .replace(
                    /(\d+) matching on this page/g,
                    "$1 correspondances sur cette page"
                );

            if (dynamicTranslation !== trimmed) {
                node.nodeValue = original.replace(
                    trimmed,
                    dynamicTranslation
                );
            }
        } else if (language === "pt") {
            let dynamicTranslation = trimmed
                .replace(/\b(\d+) min ago\b/g, "há $1 min")
                .replace(/\b(\d+) mins ago\b/g, "há $1 min")
                .replace(/\b1 hour ago\b/g, "há 1 hora")
                .replace(/\b(\d+) hours ago\b/g, "há $1 horas")
                .replace(/\b1 operation\b/g, "1 operação")
                .replace(/\b(\d+) operations\b/g, "$1 operações")
                .replace(/\bLive\b/g, "Ao vivo")
                .replace(/\bUpdated\b/g, "Atualizado")
                .replace(/\bover 24 hours\b/g, "em 24 horas")
                .replace(/\b1D view\b/g, "visualização de 1D")
                .replace(/\b(\d+) assets\b/g, "$1 ativos")
                .replace(/\b1 asset\b/g, "1 ativo")
                .replace(/\b(\d[\d,]*) transfers\b/g, "$1 transferências")
                .replace(/\b1 transfer\b/g, "1 transferência")
                .replace(/\b(\d[\d,]*) accounts\b/g, "$1 contas")
                .replace(/\b1 account\b/g, "1 conta")
                .replace(
                    /(\d+)–(\d+) of ([\d,]+) loaded/g,
                    "$1–$2 de $3 carregados"
                )
                .replace(
                    /Page (\d+) of (\d+)/g,
                    "Página $1 de $2"
                )
                .replace(
                    /(\d+)–(\d+) of ([\d,]+)/g,
                    "$1–$2 de $3"
                )
                .replace(
                    /(\d+) matching on this page/g,
                    "$1 correspondentes nesta página"
                );

            if (dynamicTranslation !== trimmed) {
                node.nodeValue = original.replace(
                    trimmed,
                    dynamicTranslation
                );
            }
        } else if (language === "de") {
            let dynamicTranslation = trimmed
                .replace(/\b(\d+) min ago\b/g, "vor $1 Min.")
                .replace(/\b(\d+) mins ago\b/g, "vor $1 Min.")
                .replace(/\b1 hour ago\b/g, "vor 1 Stunde")
                .replace(/\b(\d+) hours ago\b/g, "vor $1 Stunden")
                .replace(/\b1 operation\b/g, "1 Operation")
                .replace(/\b(\d+) operations\b/g, "$1 Operationen")
                .replace(/\bLive\b/g, "Live")
                .replace(/\bUpdated\b/g, "Aktualisiert")
                .replace(/\bover 24 hours\b/g, "über 24 Stunden")
                .replace(/\b1D view\b/g, "1T-Ansicht")
                .replace(/\b(\d+) assets\b/g, "$1 Assets")
                .replace(/\b1 asset\b/g, "1 Asset")
                .replace(/\b(\d[\d,]*) transfers\b/g, "$1 Übertragungen")
                .replace(/\b1 transfer\b/g, "1 Übertragung")
                .replace(/\b(\d[\d,]*) accounts\b/g, "$1 Konten")
                .replace(/\b1 account\b/g, "1 Konto")
                .replace(
                    /(\d+)–(\d+) of ([\d,]+) loaded/g,
                    "$1–$2 von $3 geladen"
                )
                .replace(
                    /Page (\d+) of (\d+)/g,
                    "Seite $1 von $2"
                )
                .replace(
                    /(\d+)–(\d+) of ([\d,]+)/g,
                    "$1–$2 von $3"
                )
                .replace(
                    /(\d+) matching on this page/g,
                    "$1 Treffer auf dieser Seite"
                );

            if (dynamicTranslation !== trimmed) {
                node.nodeValue = original.replace(
                    trimmed,
                    dynamicTranslation
                );
            }
        } else if (language === "zh-CN") {
            let dynamicTranslation = trimmed
                .replace(/\b(\d+) min ago\b/g, "$1 分钟前")
                .replace(/\b(\d+) mins ago\b/g, "$1 分钟前")
                .replace(/\b1 hour ago\b/g, "1 小时前")
                .replace(/\b(\d+) hours ago\b/g, "$1 小时前")
                .replace(/\b1 operation\b/g, "1 次操作")
                .replace(/\b(\d+) operations\b/g, "$1 次操作")
                .replace(/\bLive\b/g, "实时")
                .replace(/\bUpdated\b/g, "更新于")
                .replace(/\bover 24 hours\b/g, "24 小时内")
                .replace(/\b1D view\b/g, "1 日视图")
                .replace(/\b(\d+) assets\b/g, "$1 项资产")
                .replace(/\b1 asset\b/g, "1 项资产")
                .replace(/\b(\d[\d,]*) transfers\b/g, "$1 笔转账")
                .replace(/\b1 transfer\b/g, "1 笔转账")
                .replace(/\b(\d[\d,]*) accounts\b/g, "$1 个账户")
                .replace(/\b1 account\b/g, "1 个账户")
                .replace(
                    /(\d+)–(\d+) of ([\d,]+) loaded/g,
                    "已加载 $3 条中的 $1–$2"
                )
                .replace(
                    /Page (\d+) of (\d+)/g,
                    "第 $1 页，共 $2 页"
                )
                .replace(
                    /(\d+)–(\d+) of ([\d,]+)/g,
                    "$3 条中的 $1–$2"
                )
                .replace(
                    /(\d+) matching on this page/g,
                    "本页有 $1 条匹配"
                );

            if (dynamicTranslation !== trimmed) {
                node.nodeValue = original.replace(
                    trimmed,
                    dynamicTranslation
                );
            }
        } else if (language === "hi") {
            let dynamicTranslation = trimmed
                .replace(/\b(\d+) min ago\b/g, "$1 मिनट पहले")
                .replace(/\b(\d+) mins ago\b/g, "$1 मिनट पहले")
                .replace(/\b1 hour ago\b/g, "1 घंटे पहले")
                .replace(/\b(\d+) hours ago\b/g, "$1 घंटे पहले")
                .replace(/\b1 operation\b/g, "1 ऑपरेशन")
                .replace(/\b(\d+) operations\b/g, "$1 ऑपरेशन")
                .replace(/\bLive\b/g, "लाइव")
                .replace(/\bUpdated\b/g, "अपडेट किया गया")
                .replace(/\bover 24 hours\b/g, "24 घंटों में")
                .replace(/\b1D view\b/g, "1 दिन का दृश्य")
                .replace(/\b(\d+) assets\b/g, "$1 एसेट")
                .replace(/\b1 asset\b/g, "1 एसेट")
                .replace(/\b(\d[\d,]*) transfers\b/g, "$1 ट्रांसफ़र")
                .replace(/\b1 transfer\b/g, "1 ट्रांसफ़र")
                .replace(/\b(\d[\d,]*) accounts\b/g, "$1 खाते")
                .replace(/\b1 account\b/g, "1 खाता")
                .replace(/(\d+)–(\d+) of ([\d,]+) loaded/g, "$3 में से $1–$2 लोड किए गए")
                .replace(/Page (\d+) of (\d+)/g, "पृष्ठ $1 / $2")
                .replace(/(\d+)–(\d+) of ([\d,]+)/g, "$3 में से $1–$2")
                .replace(/(\d+) matching on this page/g, "इस पृष्ठ पर $1 मिलान");

            if (dynamicTranslation !== trimmed) {
                node.nodeValue = original.replace(
                    trimmed,
                    dynamicTranslation
                );
            }
        } else if (language === "ar") {
            let dynamicTranslation = trimmed
                .replace(/\b(\d+) min ago\b/g, "قبل $1 دقيقة")
                .replace(/\b(\d+) mins ago\b/g, "قبل $1 دقيقة")
                .replace(/\b1 hour ago\b/g, "قبل ساعة واحدة")
                .replace(/\b(\d+) hours ago\b/g, "قبل $1 ساعات")
                .replace(/\b1 operation\b/g, "عملية واحدة")
                .replace(/\b(\d+) operations\b/g, "$1 عمليات")
                .replace(/\bLive\b/g, "مباشر")
                .replace(/\bUpdated\b/g, "تم التحديث")
                .replace(/\bover 24 hours\b/g, "خلال 24 ساعة")
                .replace(/\b1D view\b/g, "عرض يوم واحد")
                .replace(/\b(\d+) assets\b/g, "$1 أصول")
                .replace(/\b1 asset\b/g, "أصل واحد")
                .replace(/\b(\d[\d,]*) transfers\b/g, "$1 تحويلات")
                .replace(/\b1 transfer\b/g, "تحويل واحد")
                .replace(/\b(\d[\d,]*) accounts\b/g, "$1 حسابات")
                .replace(/\b1 account\b/g, "حساب واحد")
                .replace(/(\d+)–(\d+) of ([\d,]+) loaded/g, "تم تحميل $1–$2 من $3")
                .replace(/Page (\d+) of (\d+)/g, "الصفحة $1 من $2")
                .replace(/(\d+)–(\d+) of ([\d,]+)/g, "$1–$2 من $3")
                .replace(/(\d+) matching on this page/g, "$1 مطابق في هذه الصفحة");

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
