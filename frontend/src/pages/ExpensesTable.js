
import React from 'react';

function ExpensesTable({ expenses, handleDeleteExpense }) {

    return (
        <div className="expense-list">

            <div className="transaction-heading">
                <div>
                    <h2>Recent Transactions</h2>
                    <p>Your income and expense history</p>
                </div>

                <span className="transaction-count">
                    {expenses?.length || 0} Transactions
                </span>
            </div>

            <div className="transaction-list">

                {expenses?.length > 0 ? (
                    expenses.map((expense) => (
                        <div key={expense._id} className="expense-item">

                            <div className={`transaction-icon ${expense.amount < 0 ? 'expense-icon' : 'income-icon'}`}>
                                {expense.amount < 0 ? '↘' : '↗'}
                            </div>

                            <div className="transaction-info">
                                <div className="expense-description">
                                    {expense.text}
                                </div>

                                <span className={`transaction-type ${expense.amount < 0 ? 'expense-type' : 'income-type'}`}>
                                    {expense.amount < 0 ? 'Expense' : 'Income'}
                                </span>
                            </div>

                            <div className="transaction-right">
                                <div className={`transaction-value ${expense.amount < 0 ? 'negative-value' : 'positive-value'}`}>
                                    {expense.amount < 0 ? '-' : '+'} ₹{Math.abs(Number(expense.amount)).toLocaleString('en-IN')}
                                </div>

                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteExpense(expense._id)}
                                    title="Delete transaction"
                                >
                                    ×
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="empty-transactions">
                        <div className="empty-icon">₹</div>
                        <h3>No transactions yet</h3>
                        <p>Your transactions will appear here once you add them.</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ExpensesTable;
