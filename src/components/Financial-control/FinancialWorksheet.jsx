import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './styles/components/Form/index';
import Header from './styles/components/Header';
import Resume from './styles/components/Resume';
import Grid from './styles/components/Grid';

const FinancialWorksheet = ({ isLoggedIn, setIsLoggedIn, sheetType, setSheetType }) => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [total, setTotal] = useState(0);
    const history = useNavigate();
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const sectionExists = sections.find((blog) => String(blog.title) === params.taskTitle)

    const getData = async () => {
            if (sectionExists) {
            const res = await
            fetch(`/api/${process.env.REACT_APP_DB}/list/${params.taskTitle}-${sheetType}`, { method:'GET', credentials: 'include' })
            .then(response => response.json())
            .catch(error => {
                setIsLoggedIn(false); history('/');
            })
            if (res.status === 200) {setTransactionsList(res.post || [])} else {setIsLoggedIn(false); history('/')} 
            }
            else {history('/')}
        }

    useEffect(() => {
        setSheetType(sheetType)
        setTransactionsList([])
        isLoggedIn ? getData() : history('/')
        // sections && (Array.from(sections || []).filter((section) => section.title === params.taskTitle)[0] ? setSectionName(sections) : history('/'))
    },[params.taskTitle, isLoggedIn, history]) // eslint-disable-line react-hooks/exhaustive-deps

    function insertDocument(transaction) {
        fetch(`/api/${process.env.REACT_APP_DB}/add/${params.taskTitle}-${sheetType}`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function updateDocument(item) {
        fetch(`/api/${process.env.REACT_APP_DB}/update/${params.taskTitle}-${sheetType}`,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => getData())
    }

    function deleteDocument(item) {
        fetch(`/api/${process.env.REACT_APP_DB}/delete/${params.taskTitle}-${sheetType}`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
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
        <div>
            <Header />
            <Resume income={income} expense={expense} total={total} sheetType={sheetType} />
            <Form insertDocument={insertDocument} sheetType={sheetType}/>
            <Grid rawData={transactionsList} deleteDocument={deleteDocument} updateDocument={updateDocument} sheetType={sheetType}/>
        </div>
    );
};
 
export default FinancialWorksheet;
