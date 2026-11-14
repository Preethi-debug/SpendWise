
import React from 'react';

function ExpenseDetails({ incomeAmount, expenseAmount }) {
    const balance = incomeAmount - expenseAmount;

    return (
        <div className="finance-overview">

            <div className="balance-card">
                <p className="card-label">Total Balance</p>
                <h2>₹{balance.toLocaleString('en-IN')}</h2>
                <span className="balance-caption">
                    Your available balance
                </span>
            </div>

            <div className="amounts-container">

                <div className="summary-card income-card">
                    <div className="summary-icon">↗</div>
                    <p>Total Income</p>
                    <h2 className="income-amount">
                        + ₹{incomeAmount.toLocaleString('en-IN')}
                    </h2>
                </div>

                <div className="summary-card expense-card">
                    <div className="summary-icon">↘</div>
                    <p>Total Expenses</p>
                    <h2 className="expense-amount">
                        - ₹{expenseAmount.toLocaleString('en-IN')}
                    </h2>
                </div>

            </div>
        </div>
    );
}

export default ExpenseDetails;
