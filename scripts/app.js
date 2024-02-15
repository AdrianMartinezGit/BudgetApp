import { onPageStart, updateBudgetBalance, createTransactionLog } from './functions.js'
import { updateBudgetValueFromLocalStorage, saveExpenseToLocalStorage } from './localstorage.js'

let manageExpensesBtn = document.getElementById('manageExpensesBtn');

let modalUpdateBudgetBtn = document.getElementById('modalUpdateBudgetBtn');
let modalAddExpenseBtn = document.getElementById('modalAddExpenseBtn');

let expenseNameInput = document.getElementById('expenseNameInput');
let expenseValueInput = document.getElementById('expenseValueInput');

let budgetUpdateInput = document.getElementById('budgetUpdateInput');

let balanceCurrentValue = document.getElementById('balanceCurrentValue');

if (modalUpdateBudgetBtn !== null) {
    modalUpdateBudgetBtn.addEventListener('click', () => {
        updateBudgetValueFromLocalStorage(budgetUpdateInput.value);
        balanceCurrentValue.textContent = updateBudgetBalance();
        createTransactionLog();
    })
}

if (manageExpensesBtn !== null) {
    manageExpensesBtn.addEventListener('click', () => {
        //ManageExpensesModal();
    })
}

if (modalAddExpenseBtn !== null) {
    modalAddExpenseBtn.addEventListener('click', () => {
        let expense = {
            expenseName: expenseNameInput.value,
            expenseValue: expenseValueInput.value
        };
    
        saveExpenseToLocalStorage(expense);
        expenseNameInput.value = '';
        expenseValueInput.value = '';
        expenseValueInput.textContent = updateBudgetBalance();
    })
}

onPageStart();