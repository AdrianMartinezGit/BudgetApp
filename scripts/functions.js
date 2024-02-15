import { getBudgetValueFromLocalStorage, getExpensesFromLocalStorage, removeExpenseFromLocalStorage } from "./localstorage.js";

let transactionLogDiv = document.getElementById('transactionLogDiv');
let balanceCurrentValue = document.getElementById('balanceCurrentValue');
let headerTitle = document.getElementById('headerTitle');

const onPageStart = () => {
    balanceCurrentValue.textContent = updateBudgetBalance();
    createTransactionLog();
}

const balanceCheck = (balance) => {
    if (balance < 0) { 
        headerTitle.textContent = `Uh oh, it seems like you're going over-budget, might have to adjust your budget.` 
    } else { 
        headerTitle.textContent = 'My Budget Manager App'; 
    }
}

const updateBudgetBalance = () => {
    let balance = Number(getBudgetValueFromLocalStorage());

    let savedExpenses = getExpensesFromLocalStorage();
    
    savedExpenses.forEach(expense => {
        balance -= Number(expense.expenseValue);
    })

    balanceCheck(balance);
    
    return balance.toFixed(2);
}

const createTransactionLog = () => {
    transactionLogDiv.innerHTML = '';

    let p1 = document.createElement('p');
    p1.textContent = 'Budget: ';
    
    let p2 = document.createElement('p');
    p2.textContent = getBudgetValueFromLocalStorage();

    let div = document.createElement('div');
    div.appendChild(p1);
    div.appendChild(p2);
    transactionLogDiv.appendChild(div);

    let savedExpenses = getExpensesFromLocalStorage();
    savedExpenses.forEach(expense => {
        let p1 = document.createElement('p');
        p1.textContent = expense.expenseName + ': ';

        let p2 = document.createElement('p');
        p2.textContent = '-' + expense.expenseValue;

        let div = document.createElement('div');
        div.appendChild(p1);
        div.appendChild(p2);
        transactionLogDiv.appendChild(div);
    });
}

const addExpenseToTransactionLog = () => {
    let savedExpenses = getExpensesFromLocalStorage();

    let p1 = document.createElement('p');
    p1.textContent = 'Added ' + savedExpenses[savedExpenses.length -1].expenseName + ': ';

    let p2 = document.createElement('p');
    p2.textContent = '-' + savedExpenses[savedExpenses.length -1].expenseValue;

    let div = document.createElement('div');
    div.appendChild(p1);
    div.appendChild(p2);
    transactionLogDiv.appendChild(div);
}

const removeExpenseToTransactionLog = (index) => {
    let savedExpenses = getExpensesFromLocalStorage();

    let p1 = document.createElement('p');
    p1.textContent = 'Removed ' + savedExpenses[index].expenseName + ': ';

    let p2 = document.createElement('p');
    p2.textContent = '+' + savedExpenses[index].expenseValue;

    let div = document.createElement('div');
    div.appendChild(p1);
    div.appendChild(p2);
    transactionLogDiv.appendChild(div);
}


export { createTransactionLog, onPageStart, updateBudgetBalance, addExpenseToTransactionLog }