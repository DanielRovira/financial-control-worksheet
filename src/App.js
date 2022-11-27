import React, { useEffect, useState } from 'react';
import Form from './styles/components/Form/index';
import Header from './styles/components/Header';
import Resume from './styles/components/Resume';
import Grid from './styles/components/Grid';
import GlobalStyle from './styles/global';

const App = () => {
    const data = localStorage.getItem("transactions");
    const [transactionsList, setTransactionsList] = useState(
        data ? JSON.parse(data) : []
    );
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);

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

        // setIncome(`R$ ${income}`);
        // setExpense(`R$ ${expense}`);
        // setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);
        // console.log(Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
        setIncome(Number(income).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        setExpense(Number(expense).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
        setTotal(Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));


    }, [transactionsList]);

    const handleAdd = (transaction) => {
        const newArrayTransactions = [transaction, ...transactionsList];

        setTransactionsList(newArrayTransactions);

        localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
    };

    return (
        <>
            <Header />
            <Resume income={income} expense={expense} total={total} />
            <Form handleAdd={handleAdd} transactionsList={transactionsList} setTransactionsList={setTransactionsList} />
            <Grid itens={transactionsList} setItens={setTransactionsList} />
            <GlobalStyle />
        </>
    );
};
 
export default App;