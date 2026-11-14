
import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseTrackerForm({ addExpense }) {
    const [expenseInfo, setExpenseInfo] = useState({
        text: '',
        amount: '',
        type: 'expense'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExpenseInfo({
            ...expenseInfo,
            [name]: value
        });
    };

    const handleExpense = (e) => {
        e.preventDefault();

        const { text, amount, type } = expenseInfo;

        if (!text.trim() || amount === '' || Number(amount) <= 0) {
            handleError('Please enter a valid description and amount');
            return;
        }

        const finalAmount = type === 'income'
            ? Math.abs(Number(amount))
            : -Math.abs(Number(amount));

        addExpense({
            text,
            amount: finalAmount
        });

        setExpenseInfo({
            text: '',
            amount: '',
            type: 'expense'
        });
    };

    return (
        <div className="container transaction-form">
            <div className="form-heading">
                <div>
                    <h1>Add Transaction</h1>
                    <p>Record your income and expenses</p>
                </div>
                <div className="form-icon">＋</div>
            </div>

            <form onSubmit={handleExpense}>
                <div>
                    <label>Description</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="text"
                        placeholder="e.g. Shopping, Salary, Bonus..."
                        value={expenseInfo.text}
                    />
                </div>

                <div>
                    <label>Amount (₹)</label>
                    <input
                        onChange={handleChange}
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        min="0"
                        step="any"
                        value={expenseInfo.amount}
                    />
                </div>

                <div>
                    <label>Transaction Type</label>
                    <select
                        name="type"
                        value={expenseInfo.type}
                        onChange={handleChange}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <button type="submit" className="add-transaction-btn">
                    + Add Transaction
                </button>
            </form>
        </div>
    );
}

export default ExpenseTrackerForm;
