"use strict";
const totalAmount = localStorage.getItem("budget") || 0;
const balancelabel = document.querySelector(".balance__label");
balancelabel.innerHTML += `${totalAmount}€`;
const user = localStorage.getItem("userName") || "User";
const welcome = document.querySelector(".welcome");
welcome.innerHTML += `${user} !`;

const displayMovements = function (movements) {
    const containerMovements = document.getElementById("containerMovements");
    containerMovements.innerHTML = "";
    movements.forEach(function (mov, i) {
        const type = mov.type;
        const div = document.createElement("div");
        div.classList.add("movements__row");
        const html = `
        <div class="movements__row">
        <svg onclick="dlt(${mov.id})"  class="ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        <svg  onclick="edit(${mov.id})" class="ico"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>
          <div class="movements__type movements__type--${type}">
            ${type}
          </div>
          <div class="movements__date">${mov.date}</div>
          <p class="movements__note"> ${mov.note} </p>

          <div class="movements__value">${mov.amount}€</div>
        </div>
      `;

        containerMovements.insertAdjacentHTML("afterbegin", html);
    });
};
document.addEventListener("DOMContentLoaded", () => {
    let movs = JSON.parse(localStorage.getItem("movements")) || [];

    const displayMovements = function (movements) {
        const containerMovements = document.querySelector("#containerMovements");

        movements.forEach(function (mov, i) {
            const type = mov.type;
            const movementRow = document.createElement("div");
            movementRow.classList.add("movements__row");
            movementRow.innerHTML = `
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__date">${mov.date}</div>
        <div class="movements__value">${mov.amount}€</div>
      `;

            containerMovements.appendChild(movementRow);
        });
    };

    updateUI(movs);
});

const calcDisplayBalance = function (totalAmount, movements) {
    const balance = document.querySelector("#balance__value");
    const incomes = movements.filter((mov) => mov.type === "income").reduce((acc, mov) => acc + mov.amount, 0);
    const outcomes = movements.filter((mov) => mov.type === "expenses").reduce((acc, mov) => acc + mov.amount, 0);
    const balanceValue = +totalAmount + incomes - outcomes;
    balance.innerHTML = `Current balance:  ${balanceValue}€`;
};

const calcDisplaySummary = function (movements) {
    let incomes;
    let outcomes;
    movements.forEach((mov) => {
        if (mov.type === "income") incomes += mov.amount;
        else if (mov.type === "expenses") outcomes += mov.amount;
    });
};

const updateUI = function (movements) {
    // Display movements
    displayMovements(movements);

    // Display balance
    calcDisplayBalance(totalAmount, movements);

    // Display summary
    calcDisplaySummary(movements);
};
function expensesSubmit() {
    let movements = JSON.parse(localStorage.getItem("movements")) || [];

    const expensesNote = document.getElementById("expenses-note").value;
    const expensesAmount = parseFloat(document.getElementById("expenses-amount").value);
    if (expensesAmount && expensesNote) {
        update(movements, movements.length + 1, "expenses", expensesNote, expensesAmount);
        updateUI(movements);
        document.getElementById("expenses-note").value = "";
        document.getElementById("expenses-amount").value = "";
    } else alert("Please enter both note and amount");
}

function incomeSubmit() {
    let movements = JSON.parse(localStorage.getItem("movements")) || [];

    const incomeNote = document.getElementById("income-note").value;
    const incomeAmount = parseFloat(document.getElementById("income-amount").value);
    if (incomeAmount && incomeNote) {
        update(movements, movements.length + 1, "income", incomeNote, incomeAmount);
        updateUI(movements);
        document.getElementById("income-note").value = "";
        document.getElementById("income-amount").value = "";
    } else alert("Please enter both note and amount");
}

function update(movements, id, type, note, amount) {
    const date = new Date();
    const options = {year: "numeric", month: "2-digit", day: "2-digit"};
    const formattedDate = date.toLocaleDateString("en-US", options); // Example format: MM/DD/YYYY

    const obj = {
        id,
        type,
        note,
        amount,
        date: formattedDate,
    };
    movements.push(obj);
    localStorage.setItem("movements", JSON.stringify(movements));
}

function clearMovements() {
    localStorage.removeItem("movements");
    updateUI([]);
}

function sort() {
    let movements = JSON.parse(localStorage.getItem("movements") || "[]");
    let key = document.getElementById("sort-options").value;
    let movs;
    switch (key) {
        case "by-max":
            movs = movements.sort((a, b) => b.amount - a.amount);
            break;
        case "by-min":
            movs = movements.sort((a, b) => a.amount - b.amount);
            break;
        case "by-date":
            movs = movements.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case "by-income":
            movs = movements.sort((a, b) => a.type.localeCompare(b.type));
            break;
        case "by-expenses":
            movs = movements.sort((a, b) => b.type.localeCompare(a.type));
            break;
        case "by-notes":
            movs = movements.sort((a, b) => a.note.localeCompare(b.note));
            break;
        default:
            break;
    }
    updateUI(movs);
}
function dlt(id) {
    let movements = JSON.parse(localStorage.getItem("movements")) || [];
    movements = movements.filter((movements) => movements.id !== id);
    updateUI(movements);
    localStorage.setItem("movements", JSON.stringify(movements));
}

function edit(id) {
    const card = document.getElementById("inputCard");
    card.style.display = card.style.display === "none" || card.style.display === "" ? "block" : "none";
    const cardTitle = document.querySelector(".card__title");
    cardTitle.innerHTML = id;
}

function SubmitCard() {
    const cardTitle = document.querySelector(".card__title");
    let id = +cardTitle.innerHTML;
    const movements = JSON.parse(localStorage.getItem("movements")) || [];
    const note = document.getElementById("input1").value;
    const amount = document.getElementById("input2").value;
    movements[id - 1].note = note;
    movements[id - 1].amount = +amount;
    updateUI(movements);
    localStorage.setItem("movements", JSON.stringify(movements));
    const card = document.getElementById("inputCard");
    card.style.display = card.style.display === "none" || card.style.display === "" ? "block" : "none";
    note.value = "";
    amount.value = "";
}
function toggleCard() {
    const card = document.getElementById("inputCard");
    card.style.display = card.style.display === "none" || card.style.display === "" ? "block" : "none";
    const noteInput = document.getElementById("input1");
    const amountInput = document.getElementById("input2");
    noteInput.value = "";
    amountInput.value = "";
}
fetch("php_folder/connection.php")
.then((response) => {
    if (!response.ok) {
        console.log("fetching failed");
    }
    return response.json();
})
.then((data) => {
    if (data.status === "success") {
        console.log(data.message);
    } else {
        console.error(data.message);
    }
})
.catch((error) => console.error("Fetch error:", error));
