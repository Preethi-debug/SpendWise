
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    // useMemo: Calculate income and expenses efficiently
    const { incomeAmount, expenseAmount } = useMemo(() => {
        const amounts = expenses.map(
            (item) => Number(item.amount) || 0
        );

        const income = amounts
            .filter((item) => item > 0)
            .reduce((acc, item) => acc + item, 0);

        const exp = amounts
            .filter((item) => item < 0)
            .reduce((acc, item) => acc + item, 0) * -1;

        return {
            incomeAmount: income,
            expenseAmount: exp
        };
    }, [expenses]);

    // useCallback: Memoize logout function
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }, [navigate]);

    // useCallback: Memoize fetch function
    const fetchExpenses = useCallback(async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };

            const response = await fetch(url, headers);

            if (response.status === 403) {
                navigate('/login');
                return;
            }

            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    }, [navigate]);

    // Fetch expenses when component loads
    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    // useCallback: Memoize add function
    const addExpense = useCallback(async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            };

            const response = await fetch(url, headers);

            if (response.status === 403) {
                navigate('/login');
                return;
            }

            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
            handleSuccess('Expense added successfully');
        } catch (err) {
            handleError(err);
        }
    }, [navigate]);

    // useCallback: Memoize delete function
    const handleDeleteExpense = useCallback(async (expenseId) => {
        try {
            const url = `${APIUrl}/expenses/${expenseId}`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            };

            const response = await fetch(url, headers);

            if (response.status === 403) {
                navigate('/login');
                return;
            }

            const result = await response.json();
            console.log(result.data);
            setExpenses(result.data);
            handleSuccess('Expense deleted successfully');
        } catch (err) {
            handleError(err);
        }
    }, [navigate]);

    return (
        <div>
            <div className='user-section'>
                <h1>Welcome {loggedInUser}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <ExpenseDetails
                incomeAmount={incomeAmount}
                expenseAmount={expenseAmount}
            />

            <ExpenseTrackerForm addExpense={addExpense} />

            <ExpensesTable
                expenses={expenses}
                handleDeleteExpense={handleDeleteExpense}
            />

            <ToastContainer />
        </div>
    );
}

export default Home;
