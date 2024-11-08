"use strict";
const totalAmount = localStorage.getItem("budget") || 0;
const balancelabel = document.querySelector(".balance__label");
balancelabel.innerHTML += `${totalAmount}€`;
const user = localStorage.getItem("userName") || "User";
const welcome = document.querySelector(".welcome");
welcome.innerHTML += `${user} !`;

function getExpenses() {
    const userId = localStorage.getItem("userId"); // Get userId from localStorage

    if (!userId) {
        alert("User is not logged in.");
        return;
    }

    const requestData = {
        userId: userId,
    };

    fetch("php_folder/getExpenses.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
    })
    .then((response) => response.json())
    .then((expenses) => {
        if (expenses.status === "error") {
            alert(expenses.message);
        } else {
            displayExpenses(expenses);
        }
    })
    .catch((error) => {
        console.error("Error fetching expenses:", error);
        alert("Error occurred while fetching expenses");
    });
}
function displayExpenses(expenses) {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML = "<p>No expenses found.</p>";
    } else {
        expenses.forEach((expense) => {
            const expenseItem = document.createElement("div");
            expenseItem.classList.add("expense-item"); // You can add some styling here

            const expenseText = document.createElement("p");
            expenseText.innerHTML = `Amount: $${expense.amount} | Note: ${expense.note}`;

            expenseItem.appendChild(expenseText);
            expenseList.appendChild(expenseItem);
        });
    }
}
getExpenses();
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
    const expensesNote = document.getElementById("expenses-note").value;
    const expensesAmount = parseFloat(document.getElementById("expenses-amount").value);
    const userId = 1;

    if (expensesAmount && expensesNote) {
        const date = new Date().toLocaleDateString("en-US");
        fetch("php_folder/createExpense.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: expensesAmount,
                note: expensesNote,
                userId: userId,
                date: date,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                getExpenses();
            } else {
                alert("Failed to add expense: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Error occurred while adding expense");
        });
        document.getElementById("expenses-note").value = "";
        document.getElementById("expenses-amount").value = "";
    } else {
        alert("Please enter both note and amount");
    }
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
    const formattedDate = date.toLocaleDateString("en-US", options);

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
