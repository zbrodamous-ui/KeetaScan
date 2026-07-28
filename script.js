const searchType = document.getElementById("searchType");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


searchButton.addEventListener("click", function () {
   const search = searchInput.value.trim();
   
    if (search === "") {
    console.log("Please enter something to search.");
} else {
  if (searchType.value === "transaction") {
   window.location.href = "transaction.html?search=" + search;
  }
 else if (searchType.value === "address") {
    window.location.href = "Address.html";
  }
  else if (searchType.value === "block") {
    window.location.href = "Block.html";
  }
  else if (searchType.value === "asset") {
    window.location.href = "asset.html";
  }
  console.log(search);
}
});

console.log("Keeta SDK:", KeetaNet);

const client = KeetaNet.Client.fromNetwork("test");

console.log(client);

client.getVersion()
    .then((version) => {
        console.log("Keeta Network Version:", version);
    })
    .catch((error) => {
        console.error("Keeta connection error:", error);
    });

client.getNetworkStatus()
    .then((status) => {

        const ledger = status[0].ledger;

        document.getElementById("latestBlock").textContent =
            ledger.blockCount.toLocaleString();

        document.getElementById("totalTransactions").textContent =
            ledger.transactionCount.toLocaleString();

    })
    .catch((error) => {
        console.error("Status Error:", error);
    });