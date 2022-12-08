import React, { useEffect, useState } from 'react';
import Form from './styles/components/Form/index';
import Header from './styles/components/Header';
import Resume from './styles/components/Resume';
import Grid from './styles/components/Grid';
// import GlobalStyle from './styles/global';

const FinancialWorksheet = () => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);

    function getData() {
        fetch(`/api/${process.env.REACT_APP_DB}/list`, { method:"GET" })
        .then(response => response.json())
        .then(data => setTransactionsList(data))
    };

    useEffect(() => {
        getData()
    },[])

    function insertDocument(transaction) {
        fetch(`/api/${process.env.REACT_APP_DB}/add`,
        {
            method:"POST",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function updateDocument(item) {
        fetch(`/api/${process.env.REACT_APP_DB}/update`,
        {
            method:"PATCH",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function deleteDocument(item) {
        fetch(`/api/${process.env.REACT_APP_DB}/delete`,
        {
            method:"DELETE",
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(item)
        })
        // .then(response => response.json())
        .then(() => getData())
    }


    useEffect(() => {
        const amountExpense = transactionsList
            .filter((item) => item.expense)
            .map((transaction) => Number(transaction.amount));

        const amountIncome = transactionsList
            .filter((item) => !item.expense)
            .map((transaction) => Number(transaction.amount));
        
        const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
        const total = (income - expense).toFixed(2);

        setIncome(Number(income).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        setExpense(Number(expense).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        setTotal(Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));

    }, [transactionsList]);

    return (
        <>
            <Header />
            <Resume income={income} expense={expense} total={total} />
            <Form insertDocument={insertDocument} transactionsList={transactionsList} setTransactionsList={setTransactionsList} />
            <Grid rawData={transactionsList} deleteDocument={deleteDocument} updateDocument={updateDocument} />
            {/* <GlobalStyle /> */}
        </>
    );
};
 
export default FinancialWorksheet;