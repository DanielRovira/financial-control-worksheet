import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Form from './styles/components/Form/index';
import Header from './styles/components/Header';
import Resume from './styles/components/Resume';
import Grid from './styles/components/Grid';

const FinancialWorksheet = ({ isLoggedIn, setIsLoggedIn, refreshToken, setType }) => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);
    const [sectionName, setSectionName] = useState([]);
    const history = useNavigate();
    const params = useParams();

    const getData = async () => {
        const res = await
        fetch(`${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_DB}/list/${params.taskTitle}`, { method:"GET", credentials: "include" })
        .then(response => response.json())
        setTransactionsList(res.post || [])
        setIsLoggedIn(res.status || false)
        !res.status ? localStorage.clear() : void(0)
    }

    // function getSections() {
    //     fetch(`${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_DB}/sections`, { method:"GET", credentials: "include" })
    //     .then(response => response.json())
    //     .then((data) => data ? (Array.from(data).filter((sec) => sec.title === params.taskTitle)[0] ? setSectionName(data) : history("/")) : null(0))
    // }

//    function getData() {
//         fetch(`${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_DB}/list/${params.taskTitle}`, { method:"GET", credentials: "include" })
//         .then(response => response.json())
//         .then(data => setTransactionsList(data))}

    const getSections = async () => {
        const res = await
        fetch(`${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_DB}/sections`, { method:"GET", credentials: "include" })
        .then(response => response.json())
        setIsLoggedIn(res.status)
        !res.status ? localStorage.clear() : void(0)
        res ? (Array.from(res.post || []).filter((sec) => sec.title === params.taskTitle)[0] ? setSectionName(res.post) : history("/")) : null(0)
    }



    useEffect(() => {
        const loggedIn = () => {setType("Controle Financeiro"); getSections(); getData()}
        isLoggedIn ? loggedIn() : history("/")
    },[params.taskTitle, isLoggedIn, history]) // eslint-disable-line react-hooks/exhaustive-deps

    function insertDocument(transaction) {
        fetch(`${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_DB}/add/${params.taskTitle}`,
        {
            method:"POST",
            headers: { 'Content-Type': "application/json" },
            credentials: "include",
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function updateDocument(item) {
        fetch(`${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_DB}/update/${params.taskTitle}`,
        {
            method:"PATCH",
            headers: { 'Content-Type': "application/json" },
            credentials: "include",
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function deleteDocument(item) {
        fetch(`${process.env.REACT_APP_BACKEND}/api/${process.env.REACT_APP_DB}/delete/${params.taskTitle}`,
        {
            method:"DELETE",
            headers: { 'Content-Type': "application/json" },
            credentials: "include",
            body: JSON.stringify(item)
        })
        .then(() => getData())
    }


    useEffect(() => {
        const amountExpense = Array.from(transactionsList)
            .filter((item) => item.expense)
            .map((transaction) => Number(transaction.amount));

        const amountIncome = Array.from(transactionsList)
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
            <Header sectionName={sectionName} />
            <Resume income={income} expense={expense} total={total} />
            <Form insertDocument={insertDocument} transactionsList={transactionsList} setTransactionsList={setTransactionsList} />
            <Grid rawData={transactionsList} deleteDocument={deleteDocument} updateDocument={updateDocument} />
        </>
    );
};
 
export default FinancialWorksheet;
