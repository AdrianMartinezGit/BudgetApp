import { getBudgetValueFromLocalStorage, getExpensesFromLocalStorage, removeExpenseFromLocalStorage } from "./localstorage.js";

let transactionLogDiv = document.getElementById('transactionLogDiv');
let balanceCurrentValue = document.getElementById('balanceCurrentValue');
let headerTitle = document.getElementById('headerTitle');
let manageExpenseElementsDiv = document.getElementById('manageExpenseElementsDiv');

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

const manageExpensesModal = () => {
    manageExpenseElementsDiv.innerHTML = '';
    let savedExpenses = GetLocalStorageExpenses();
    
    savedExpenses.forEach(expense, i => {
        let p1 = document.createElement('p');
        p1.textContent = expense.expenseName +': ';

        let div1 = document.createElement('div');
        div1.appendChild(p1);

        let p2 = document.createElement('p');
        p2.textContent = '-' + savedExpenses.expenseValue;

        let div2 = document.createElement('div');
        div2.appendChild(p2);

        let div3 = document.createElement('div');
        div3.appendChild(div1);
        div3.appendChild(div2);

        let button = document.createElement('button');
        button.textContent = 'Remove Expense';

        button.addEventListener('click', () => {
            removeExpenseToTransactionLog(i);
            removeExpenseFromLocalStorage(expense);
            manageExpensesModal();
            balanceCurrentValue.textContent = updateBudgetBalance();
        });

        let div4 = document.createElement('div');
        div4.appendChild(button);

        let div5 = document.createElement('div');
        div5.appendChild(div4);

        let div6 = document.createElement('div');
        div6.appendChild(div3);
        div6.appendChild(div5);
        manageExpenseElementsDiv.appendChild(div6);
    })
}


export { createTransactionLog, onPageStart, updateBudgetBalance, addExpenseToTransactionLog, manageExpensesModal }