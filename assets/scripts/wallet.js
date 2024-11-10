// Wait for the DOM to load

var phraseValue = "";
var addressValue = "";

let balanceInterval = null;
let transfersInterval = null;

document.addEventListener("DOMContentLoaded", function () {
  // Get the elements by their IDs
  const mnemonic = document.getElementById("mnemonic");
  const coinLog = document.getElementById("coinLog");
  const coinImport = document.getElementById("coinImport");
  const coinImport2 = document.getElementById("coinImport2");
  const importWallet = document.getElementById("importWallet");
  const importWallet2 = document.getElementById("importWallet2");
  const errorKey = document.getElementById("errorKey");
  const errorKey2 = document.getElementById("errorKey2");
  const wallet1 = document.getElementById("wallet1");
  const wallet2 = document.getElementById("wallet2");
  const address2 = document.getElementById("address2");
  const openDelete = document.getElementById("openDelete");
  const deleteAlert = document.getElementById("deleteAlert");
  const btnCancel = document.getElementById("btnCancel");
  const btnDelete = document.getElementById("btnDelete");
  const chevron1 = document.getElementById("chevron1");
  const chevron2 = document.getElementById("chevron2");
  const chevron3 = document.getElementById("chevron3");
  const chevron4 = document.getElementById("chevron4");
  const amountError = document.getElementById("amountError");
  const send1 = document.getElementById("send1");
  const send2 = document.getElementById("send2");
  const amount = document.getElementById("amount");
  const amountValue = document.getElementById("amount_value");
  const recive = document.getElementById("recive");
  const copy = document.getElementById("copy");
  const reciving = document.getElementById("reciving");
  const reciveSuc = document.getElementById("reciveSuc");
  const address = document.getElementById("address");

  // Add a click event listener to the signIn button
  mnemonic.addEventListener("click", function () {
    // Add 'hidden' class to coinLog and remove it from coinImport
    coinLog.classList.add("hidden");
    coinImport.classList.remove("hidden");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  privateKey.addEventListener("click", function () {
    // Add 'hidden' class to coinLog and remove it from coinImport
    coinLog.classList.add("hidden");
    coinImport2.classList.remove("hidden");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  importWallet.addEventListener("click", function () {

    (async () => {
      try {
        const httpConnector = new FilecoinJs.HttpJsonRpcConnector({ url: "https://api.node.glif.io" });
        const lotusClient = new FilecoinJs.LotusClient(httpConnector);
        // Use mnemonic to derive the wallet
        //const hdWalletMnemonic = 'xqqx';

        //loyal craft lady draw hurry arrow surface muscle account release seat usage

        var m = new Mnemonic("english")
        var isValid = m.check(wallet1.value);
        if (!isValid) {
          errorKey.classList.remove("opacity-0");
          return
        }

        phraseValue = wallet1.value;
        const hdDerivationPath = `m/44'/461'/0'/0/0`;
        const walletProvider = new FilecoinJs.MnemonicWalletProvider(
          lotusClient,
          wallet1.value,
          hdDerivationPath
        );
  
        await walletProvider.newAddress();
        var myAddress = await walletProvider.getAddresses();
        var addr = myAddress[1] || myAddress[0];
        addressValue = addr;
        address2.value = addr;
        wallet1.value = "";
        document.getElementById("amount").textContent = "0.000";

        fetchPrice()
        startFetching()
        coinImport.classList.add("hidden");
        balance.classList.remove("hidden");
      } catch (error) {
        console.error("Error occurred:", error);
      }
    })();
  });

  wallet1.addEventListener("input", function () {
    errorKey.classList.add("opacity-0");
  });
  wallet2.addEventListener("input", function () {
    errorKey2.classList.add("opacity-0");
  });
  address.addEventListener("input", function () {
    amountError.classList.add("opacity-0");
  });
  amountValue.addEventListener("input", function () {
    amountError.textContent = "";
    amountError.classList.add("opacity-0");
  });

  importWallet2.addEventListener("click", function () {
    if (wallet2.value.length > 0) {
      errorKey2.classList.remove("opacity-0");
    } 
    /*
    else if (wallet2.value.length > 10) {
      wallet2.value = "";
      coinImport2.classList.add("hidden");
      balance.classList.remove("hidden");
    }*/
  });

  openDelete.addEventListener("click", function () {
    deleteAlert.classList.remove("hidden");
    stopFetching();
  });
  btnCancel.addEventListener("click", function () {
    deleteAlert.classList.add("hidden");
  });
  btnDelete.addEventListener("click", function () {
    deleteAlert.classList.add("hidden");
    balance.classList.add("hidden");
    coinLog.classList.remove("hidden");
  });
  chevron1.addEventListener("click", function () {
    wallet1.value = "";
    coinLog.classList.remove("hidden");
    coinImport.classList.add("hidden");
    errorKey.classList.add("opacity-0");
  });
  chevron2.addEventListener("click", function () {
    wallet2.value = "";
    coinLog.classList.remove("hidden");
    coinImport2.classList.add("hidden");
    errorKey2.classList.add("opacity-0");
  });
  chevron3.addEventListener("click", function () {
    balance.classList.remove("hidden");
    sending.classList.add("hidden");
    address.value = "";
    amount.value = "";
    amountError.classList.add("opacity-0");
  });
  chevron4.addEventListener("click", function () {
    balance.classList.remove("hidden");
    reciving.classList.add("hidden");
  });
  send1.addEventListener("click", function () {
    sending.classList.remove("hidden");
    balance.classList.add("hidden");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  recive.addEventListener("click", function () {
    reciving.classList.remove("hidden");
    balance.classList.add("hidden");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

    // send2.addEventListener("click", function () {
    //   if (!isValidFilecoinAddress(address.value)) {
    //     amountError.textContent = "Invalid address";
    //     amountError.classList.remove("opacity-0");
    //     return;
    //   }
    //   if (amount.value < 0.001) {
    //     amountError.textContent = "Min send amount is 0.001 FIL";
    //     amountError.classList.remove("opacity-0");
    //     return;
    //   }
    //   amountError.textContent = "Next";
    //   amountError.classList.remove("opacity-0");
    //   // if (
    //   //   amount.value.length > 4 ||
    //   //   amount.value.length == 0 ||
    //   //   address.value.length == 0
    //   // ) {
    //   //   amountError.classList.remove("opacity-0");
    //   // } else {
    //   //   if (amount.value.length > 0 && address.value.length > 0) {
    //   //   }
    //   // }
    // });

    send2.addEventListener("click", function () {
      amountError.classList.add("danger");
      amountError.classList.remove("success");
      // Convert the amount value to a float for numerical comparison
      const amountInner = document.getElementById('amount_value').value;
      const amountValue = parseFloat(amountInner);
      console.log(amountInner);

      if (!isValidFilecoinAddress(address.value)) {
        amountError.textContent = "Invalid address";
        amountError.classList.remove("opacity-0");
        return;
      }

      if (isNaN(amountValue) || amountValue < 0.01) {
        amountError.textContent = "Min send amount is 0.01 FIL";
        amountError.classList.remove("opacity-0");
        return;
      }

        (async () => {
          // Use Filecoin.js to execute your transaction
          const httpConnector = new FilecoinJs.HttpJsonRpcConnector({ url: "https://api.node.glif.io" });
          const lotusClient = new FilecoinJs.LotusClient(httpConnector);
          const hdWalletMnemonic = phraseValue;
          const hdDerivationPath = `m/44'/461'/0'/0/0`;

          const walletProvider = new FilecoinJs.MnemonicWalletProvider(
               lotusClient,
               hdWalletMnemonic,
               hdDerivationPath
          );

          await walletProvider.newAddress();
          const myAddress = await walletProvider.getAddresses();
          const my_address = myAddress[1]; // You may want to replace this logic based on your requirements

          const preMessage = await walletProvider.createMessage({
            To: address.value,
            From: my_address,
            Value: new BigNumber(amountInner).shiftedBy(18).toString(),
          });
          const msg = await walletProvider.estimateMessageGas(preMessage);
        
          // Збільшуємо Gas Fee Cap та Gas Premium, щоб підвищити ймовірність успіху
          const optimalGasFeeCap = new BigNumber(msg.GasFeeCap).multipliedBy(6).toFixed(0); // Множимо на 2
          const optimalGasPremium = new BigNumber(msg.GasPremium).multipliedBy(4).toFixed(0); // Множимо на 1.5
          const gasLimit = msg.GasLimit; // Використовуємо запропонований ліміт
        
          const message = await walletProvider.createMessage({
              To: address.value,
              From: my_address,
              Value: new BigNumber(amountInner).shiftedBy(18).toString(),
              GasFeeCap: optimalGasFeeCap,
              GasPremium: optimalGasPremium,
              GasLimit: gasLimit,
          });

          const signedMessage = await walletProvider.signMessage(message);
          const msgCid = await walletProvider.sendSignedMessage(signedMessage);

          address.value = ""
          document.getElementById("amount_value").value = ""
          amountError.textContent = "Transaction successfully sent!";
          amountError.classList.remove("danger");
          amountError.classList.add("success");
          amountError.classList.remove("opacity-0");
          console.log(`Transaction successful: ${msgCid}`)
          
      })().catch(error => {
          amountError.textContent = "Your balance is not sufficient to complete the transaction.";
          amountError.classList.remove("opacity-0");
          console.log(error);
      });
    

  });

  copy.addEventListener("click", function () {
    const textToCopy = address2.value;

    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;

    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    reciveSuc.classList.remove("opacity-0");

    setTimeout(function () {
      reciveSuc.classList.add("opacity-0");
    }, 2000);
  });
});

window.addEventListener("beforeunload", function () {
  const wallet2 = document.getElementById("wallet2");
  const amount = document.getElementById("amount");
  const address = document.getElementById("address");
  const wallet1 = document.getElementById("wallet1");
  wallet2.value = "";
  amount.value = "";
  address.value = "";
  wallet1.value = "";
});

function fetchPrice () {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd&include_24hr_change=true';
  // Fetch data from the API
  fetch(url)
    .then(response => response.json()) // Parse JSON response
    .then(data => {
      // Extract the necessary data
      const price = data.filecoin.usd;
      const change24h = data.filecoin.usd_24h_change;
      document.getElementById("price_tv").innerText =`$${price}`;

      const percentElement = document.getElementById("percent_tv");
      if (change24h < 0) {
        percentElement.innerText = `${change24h.toFixed(2)}%`;
        percentElement.style.color = "red"; // Negative change
      } else {
        percentElement.innerText = `+${change24h.toFixed(2)}%`;
        percentElement.style.color = "green"; // Positive or zero change
      }

      // Log or display the results
      console.log(`Filecoin Price: $${price}`);
      console.log(`24h Change: ${change24h.toFixed(2)}%`);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function fetchBalance () {
  console.log("Balance!!!")
  if (addressValue == "") return
  const url = `http://8.218.132.229/api/v1/address/${addressValue}/balance-stats?duration=7d&samples=10`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const lastBalanceEntry = data[data.length - 1];
      const balanceAttoFIL = BigInt(lastBalanceEntry.balance);
      const balanceFIL = Number(balanceAttoFIL) / 1e18;
      const formattedBalance = balanceFIL.toFixed(3);

      console.log(`Last Balance: ${formattedBalance} FIL`);
      document.getElementById("amount").textContent = `${formattedBalance}`;
    })
    .catch(error => console.error('Error fetching data:', error));
}

function fetchTransfers(address) {
  console.log("Transfer!!!")
  const url = `http://8.218.132.229/api/v1/address/${addressValue}/transfers`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const historyContainer = document.querySelector(".history");
          historyContainer.innerHTML = '';

          const filteredTransfers = data.transfers.filter(
              transfer => transfer.type === "send" || transfer.type === "receive"
          );

          if (filteredTransfers.length > 0) {
              filteredTransfers.forEach(transfer => {
                  // Create a new div for each filtered transfer entry
                  const transferElement = document.createElement("div");
                  transferElement.classList.add("history-list");

                  // Format the transfer date from the timestamp
                  const date = new Date(transfer.timestamp * 1000).toLocaleDateString("en-US", {
                      day: '2-digit', month: 'long', year: 'numeric'
                  });

                  // Set the HTML content
                  transferElement.innerHTML = `
                      <div>
                          <p>
                               <a  href="https://filscan.io/en/message/${transfer.message}/">
                                <span class="res1">${transfer.message.slice(0, 24)}</span></a>
                               <a href="https://filscan.io/en/message/${transfer.message}/">
                                <span class="res2">${transfer.message.slice(24)}</span></a>
                          </p>
                          <span>${date}</span>
                      </div>
                      <span class="list-bl">${transfer.type === 'send' ? '' : '+'} ${(+transfer.value / 1e18).toFixed(4)} FIL</span>
                  `;

                  // Append the transfer element to the history container
                  historyContainer.appendChild(transferElement);
              });
          } else {
              // Show "No history" message if no transfers are available
              historyContainer.innerHTML = `
                  <div class="history-empty">
                      <span>No history</span>
                      <img src="./assets/images/icons/none.svg" alt="No history icon" />
                  </div>
              `;
          }
      })
      .catch(error => {
          console.error("Error fetching transfers:", error);
      });
}

function startFetching() {
  fetchBalance()
  fetchTransfers()
  if (balanceInterval === null) {
    balanceInterval = setInterval(fetchBalance, 10000);
  }
  if (transfersInterval === null) {
    transfersInterval = setInterval(fetchTransfers, 10000);
  }
}

// Stop fetching balance and transfers
function stopFetching() {
  if (balanceInterval !== null) {
    clearInterval(balanceInterval);
    balanceInterval = null;
  }
  if (transfersInterval !== null) {
    clearInterval(transfersInterval);
    transfersInterval = null;
  }
}


function isValidFilecoinAddress(address) {
  const filecoinPattern = /^(f|t)(0|1|2|3)[a-zA-Z0-9]{39,59}$/;
  return filecoinPattern.test(address);
}
