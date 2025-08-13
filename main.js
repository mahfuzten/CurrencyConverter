const remoteData = {
  API_KEY: "c8ac784768050c11f91c0cba",
  async curData() {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/USD`
    );
    const data = await res.json();
    // .then((res) => res.json())
    // .then((data) => console.log(data));
    return {
      data,
    };
  },
};

const UI = {
  loadSelectors() {
    const amountIn = document.querySelector("#amount");
    const fromCurrencyIn = document.querySelector("#fromCurrency");
    const toCurrencyIn = document.querySelector("#toCurrency");
    const convertBtn = document.querySelector("#convertBtn");
    const resultOut = document.querySelector("#result");
    return {
      amountIn,
      fromCurrencyIn,
      toCurrencyIn,
      convertBtn,
      resultOut,
    };
  },
  populate() {
    const { fromCurrencyIn, toCurrencyIn } = this.loadSelectors();
    const currencies = ["AED", "AUD", "HKD", "BDT", "USD"];
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      fromCurrencyIn.add(option);
    });
    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.text = currency;
      toCurrencyIn.add(option);
    });
    fromCurrencyIn.value = "USD";
    toCurrencyIn.value = "BDT";
  },
  async handleRemoteData() {
    const { data } = await remoteData.curData();
    return data;
  },
  getInPutValues() {
    const { amountIn, fromCurrencyIn, toCurrencyIn } = this.loadSelectors();
    return {
      amount: amountIn.value,
      fromCurrency: fromCurrencyIn.value,
      toCurrency: toCurrencyIn.value,
    };
  },
  async currenCal(amount, fromCurrency, toCurrency, data) {
    if (amount.length != 0) {
      let fromExchangeRate = data.conversion_rates[fromCurrency];
      let toExchangeRate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
      result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
        2
      )}
      ${toCurrency}`;
    } else {
      alert("Please fill in the amount!");
    }
  },
  init() {
    const { convertBtn } = this.loadSelectors();
    convertBtn.addEventListener("click", async (evt) => {
      evt.preventDefault();
      const { amount, fromCurrency, toCurrency } = this.getInPutValues();
      const data = await this.handleRemoteData();
      await this.currenCal(amount, fromCurrency, toCurrency, data);
      this.populate();
    });
  },
};
UI.populate();
UI.init();
