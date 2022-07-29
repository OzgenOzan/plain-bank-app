"use strict";

const account1 = {
  owner: "Ozan Özgen",
  pin: 1111,

  locale: "tr-TR", // de-DE
};

const accounts = [account1];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");

const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");

const btnLogin = document.querySelector(".login__btn");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

let currentAccount, time;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    window.location.replace("https://www.google.com/");

    // Display UI and message
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    // const locale = acc.locale;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    if (time) clearInterval(time);
    time = startTimer();

    // Update UI
    updateUI(currentAccount);
  }
});
