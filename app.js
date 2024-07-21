let baseUrl = "https://api.fastforex.io";
let apiKey = "0f0d619b00-2fa5a6d28e-sgzaam";

let form = document.querySelector("form");
let result = document.querySelector(".result");

let amountInput = form.elements["amount"];
let fromInput = form.elements["from"];
let toInput = form.elements["to"];

console.log(amountInput, fromInput, toInput);

[fromInput, toInput].forEach((element) =>
  element.addEventListener("change", convert)
);

amountInput.addEventListener("keyup", convert);

function convert() {
  let amount = amountInput.value;
  let from = fromInput.value;
  let to = toInput.value;

  if (amount && from && to) {
    fetch(
      `${baseUrl}/convert?from=${from}&to=${to}&amount=${amount}&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => (result.textContent = data.result[to]));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(`${baseUrl}/currencies?api_key=${apiKey}`)
    .then((res) => res.json())
    .then((data) => showCurrencies(Object.entries(data.currencies)));
});

function showCurrencies(currencies) {
  fromInput.innerHTML =
    "<option selected disabled value=''>Select from currency</option>";
  toInput.innerHTML =
    " <option selected disabled value=''>Select to currency</option>";
  currencies.forEach((currency) => {
    fromInput.innerHTML += `<option value=${currency[0]}>${currency[1]}</option>`;
    toInput.innerHTML += `<option value=${currency[0]}>${currency[1]}</option>`;
  });
}
