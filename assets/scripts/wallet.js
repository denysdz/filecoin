// Wait for the DOM to load
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
  const recive = document.getElementById("recive");
  const copy = document.getElementById("copy");
  const reciving = document.getElementById("reciving");
  const reciveSuc = document.getElementById("reciveSuc");
  const address = document.getElementById("address");

  address2.value =
    "02d24f3667ee41eb59594f0647e145efa1f765031de36ac2ca47819d17ca78cc98";
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
    if (wallet1.value.length < 10) {
      errorKey.classList.remove("opacity-0");
    } else if (wallet1.value.length > 0) {
      wallet1.value = "";
      coinImport.classList.add("hidden");
      balance.classList.remove("hidden");
    }
  });
  wallet1.addEventListener("input", function () {
    errorKey.classList.add("opacity-0");
  });
  wallet2.addEventListener("input", function () {
    errorKey2.classList.add("opacity-0");
  });

  importWallet2.addEventListener("click", function () {
    if (wallet2.value.length < 10) {
      errorKey2.classList.remove("opacity-0");
    } else {
      wallet2.value = "";
      coinImport2.classList.add("hidden");
      balance.classList.remove("hidden");
    }
  });

  openDelete.addEventListener("click", function () {
    deleteAlert.classList.remove("hidden");
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
  });
  chevron2.addEventListener("click", function () {
    wallet2.value = "";
    coinLog.classList.remove("hidden");
    coinImport2.classList.add("hidden");
  });
  chevron3.addEventListener("click", function () {
    balance.classList.remove("hidden");
    sending.classList.add("hidden");
    address.value=''
    amount.value=''
  });
  chevron4.addEventListener("click", function () {
    address2.value=''
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
  amount.addEventListener("input", function () {
    // Replace any character that is not a digit, a decimal point, or a comma
    this.value = this.value.replace(/[^0-9.,]/g, "");

    // Prevent multiple decimal points or commas
    const decimalCount = (this.value.match(/[.,]/g) || []).length;
    if (decimalCount > 1) {
      // If there are more than one decimal point or comma, remove the last one
      this.value = this.value.replace(/[.,]+$/, ""); // Remove last characters that are decimal points or commas
      const firstSeparatorIndex = this.value.search(/[.,]/);
      if (firstSeparatorIndex !== -1) {
        // Remove any subsequent decimal points or commas after the first one
        this.value =
          this.value.slice(0, firstSeparatorIndex + 1) +
          this.value.slice(firstSeparatorIndex + 1).replace(/[.,]/g, "");
      }
    }
  });

  send2.addEventListener("click", function () {
    if (amount.value.length > 4) {
      amountError.classList.remove("opacity-0");
    } else {
      if (amount.value.length > 0 && address.value.length > 0) {
        coinLog.classList.remove("hidden");
        sending.classList.add("hidden");
        amount.value = "";
        address.value = "";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  });
  copy.addEventListener("click", function () {
    reciveSuc.classList.remove("opacity-0");

    setTimeout(function () {
      reciveSuc.classList.add("opacity-0");
    }, 2000);
  });
});
