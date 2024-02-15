import { addExpenseToTransactionLog } from './functions.js'

const getBudgetValueFromLocalStorage = () => {
    let storedData = localStorage.getItem('budgetValue');

    if (storedData == null){
        return [0.00];
    }

    return JSON.parse(storedData);
}


const updateBudgetValueFromLocalStorage = (value) => {
    let budgetValue = getBudgetValueFromLocalStorage();

    budgetValue = Number(value).toFixed(2);
    localStorage.setItem('budgetValue', JSON.stringify(budgetValue));
    return budgetValue;
}

const saveExpenseToLocalStorage = (object) => {
    let expenses = getExpensesFromLocalStorage();
    let duplicateExpense = false;
    
    expenses.forEach(expense => {
        if (expense.expenseName = object.expenseName) {
            duplicateExpense = true;
        }
    });

    if (duplicateExpense) { 
        alert('No Duplicate Names Found') 
    }
    else {
        expenses.push(object);
        localStorage.setItem('Expenses', JSON.stringify(expenses));
        addExpenseToTransactionLog();
    }
}

const getExpensesFromLocalStorage = () => {
    let storedData = localStorage.getItem('Expenses');

    if (storedData == null){
        return [];
    }
    return JSON.parse(storedData);
}

function removeExpenseFromLocalStorage(object){
    let expenses = getExpensesFromLocalStorage();
    let index = 0;

    expenses.forEach(expense, i => {
        if (expense.expenseName == object.expenseName) {
            index = i;
        } 
    })

    expenses.splice(index, 1);
    localStorage.setItem('Expenses', JSON.stringify(expenses));
}

export { getBudgetValueFromLocalStorage, updateBudgetValueFromLocalStorage, saveExpenseToLocalStorage, getExpensesFromLocalStorage, removeExpenseFromLocalStorage };