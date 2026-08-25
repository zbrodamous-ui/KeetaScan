const client =
    KeetaNet.Client.fromNetwork("main");

const params =
    new URLSearchParams(window.location.search);

const blockHash =
    params.get("block");

const operationIndex =
    Number(params.get("operation"));

console.log("Transaction block:", blockHash);
console.log("Operation index:", operationIndex);
function formatTokenAmount(
    rawAmount,
    decimalPlaces
) {
    const raw =
        BigInt(rawAmount);

    const decimals =
        Number(decimalPlaces || 0);

    if (decimals === 0) {
        return raw.toLocaleString();
    }

    const divisor =
        10n ** BigInt(decimals);

    const whole =
        raw / divisor;

    const remainder =
        raw % divisor;

    let fraction =
        remainder
            .toString()
            .padStart(decimals, "0")
            .replace(/0+$/, "");

    return fraction
        ? `${whole.toLocaleString()}.${fraction}`
        : whole.toLocaleString();
}
async function loadTransaction() {

    const block =
        await client.getBlock(blockHash);

    console.log("Loaded block:", block);

    const operation =
        block.operations[operationIndex];
const transactionHash =
    document.getElementById("transactionHash");

const status =
    document.getElementById("status");

const from =
    document.getElementById("from");

const to =
    document.getElementById("to");

const amount =
    document.getElementById("amount");

const fee =
    document.getElementById("fee");

const blockElement =
    document.getElementById("block");
    transactionHash.textContent =
    `${blockHash.slice(0, 12)}...${blockHash.slice(-6)}:${operationIndex}`;

status.textContent =
    "Success";

const sender =
    block.account?.publicKeyString?.toString?.() ||
    "Not available";

const recipient =
    operation.to?.publicKeyString?.toString?.() ||
    "Not available";

let displayAmount =
    operation.amount?.toString?.() ||
    "Not available";

   let readableAmount =
    displayAmount;

let tokenName = "";

if (
    operation.amount &&
    operation.token
) {
    try {
        const tokenInfo =
            await client.getAccountInfo(
                operation.token
            );

        if (tokenInfo?.info) {
            tokenName =
                tokenInfo.info.name || "";

            let decimalPlaces = 0;

            if (tokenInfo.info.metadata) {
                const metadata =
                    JSON.parse(
                        atob(
                            tokenInfo.info.metadata
                        )
                    );

                decimalPlaces =
                    Number(
                        metadata.decimalPlaces ||
                        0
                    );
            }

            displayAmount =
                formatTokenAmount(
                    operation.amount,
                    decimalPlaces
                );
                 readableAmount =
    displayAmount === "Not available"
        ? displayAmount
        : Number(
              displayAmount.replace(/,/g, "")
          ).toLocaleString(
              undefined,
              {
                  maximumFractionDigits: 6
              }
          );
        }
    } catch (error) {
        console.warn(
            "Unable to format transaction token:",
            error
        );
    }
}

from.innerHTML =
    sender !== "Not available"
        ? `<a href="address.html?address=${encodeURIComponent(sender)}">${sender.slice(0, 12)}...${sender.slice(-6)}</a>`
        : "Not available";

to.innerHTML =
    recipient !== "Not available"
        ? `<a href="address.html?address=${encodeURIComponent(recipient)}">${recipient.slice(0, 12)}...${recipient.slice(-6)}</a>`
        : "Not available";

amount.textContent =
    `${readableAmount} ${tokenName}`.trim();   

fee.textContent =
    "—";

blockElement.innerHTML =
    `<a href="block.html?block=${encodeURIComponent(blockHash)}">${blockHash.slice(0, 12)}...${blockHash.slice(-6)}</a>`;

}

loadTransaction();