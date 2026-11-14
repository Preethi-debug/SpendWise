const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');
const router = require('express').Router();


// fetch all the expenses user based on user_id
router.get('/', fetchExpenses);
// add Expenses
router.post('/', addExpenses);
//delete expenses
router.delete('/:expenseId', deleteExpenses);

module.exports = router;