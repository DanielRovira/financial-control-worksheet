import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './styles/components/Form/index';
import Header from './styles/components/Header';
import Resume from './styles/components/Resume';
import Grid from './styles/components/Grid';
import Summary from './styles/components/Summary';
import BottomNavigation from './styles/components/BottomNav';
import Drawer from '@mui/material/Drawer';
// const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`)

const FinancialWorksheet = ({ isLoggedIn, setIsLoggedIn, sheetType, setSheetType }) => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [transactionsList2, setTransactionsList2] = useState([]);
    const [result, setResult] = useState([]);
    const [add, setAdd] = useState();
    const [drawer, setDrawer] = useState(false);
    const history = useNavigate();
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const sectionExists = sections.find((blog) => String(blog.title) === params.taskTitle)
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let provenience = Array.from(categoriesList || []).filter(item => item.type === 'provenience').sort((a, b) => a.name.localeCompare(b.name))

    const getData = async () => {
            if (sectionExists) {
            const res = await
            fetch(`/api/${process.env.REACT_APP_DB}/list/${params.taskTitle}-financialControl`, { method:'GET', credentials: 'include' })
                .then(response => response.json())
                .catch(error => {
                    setIsLoggedIn(false); history('/');
                })
            const res2 = await
            fetch(`/api/${process.env.REACT_APP_DB}/list/${params.taskTitle}-todoPayments`, { method:'GET', credentials: 'include' })
                .then(response => response.json())
                .catch(error => {
                    setIsLoggedIn(false); history('/');
                })
            if (res.status === 200 && res2.status === 200) {setTransactionsList(res.post || []); setTransactionsList2(res2.post || [])} else {setIsLoggedIn(false); history('/')} 
            }
            else {history('/')}
        }

    useEffect(() => {
        setSheetType(sheetType)
        setTransactionsList([])
        setTransactionsList2([])
        isLoggedIn ? getData() : history('/')
        // sections && (Array.from(sections || []).filter((section) => section.title === params.taskTitle)[0] ? setSectionName(sections) : history('/'))
    },[params.taskTitle, isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

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
        const calc = (list) => {
            const amountExpense = Array.from(list)
                .filter((item) => item.expense)
                .map((transaction) => Number(transaction.amount));
            
            const amountIncome = Array.from(list)
                .filter((item) => !item.expense)
                .map((transaction) => Number(transaction.amount));
            
            const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
            const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);
            const total = (income - expense).toFixed(2);
            
            return {expense, income, total}
        }

        setResult((prev) => ({ ...prev,
            summary: calc(transactionsList),
            financialControl: calc(transactionsList),
            todoPayments: calc(transactionsList2),
        }))

        Array.from(provenience)?.map((prov) => (
            setResult((prev) => ({ ...prev, [prov.name]:
                calc(transactionsList.filter((item) => (item.source === prov.name)))
            }))
         ))
    }, [transactionsList, transactionsList2, provenience]);

    return (
        <div className='FinancialWorksheet'>
            <Header add={add} setAdd={setAdd} setDrawer={setDrawer} sheetType={sheetType} />
            {add && <Form insertDocument={insertDocument} sheetType={sheetType}/>}
            {sheetType !== 'summary' && <Grid rawData={sheetType === 'financialControl' ? transactionsList : transactionsList2} deleteDocument={deleteDocument} updateDocument={updateDocument} sheetType={sheetType}/>}
            {sheetType === 'summary' && <Summary rawData={transactionsList} setAdd={setAdd} />}
            <BottomNavigation section={params.taskTitle} sheetType={sheetType} />
            <Drawer
            anchor='right'
            open={drawer}
            onClose={() => setDrawer(false)}
            sx={{ '.MuiDrawer-paper': { backgroundColor: 'transparent', boxShadow: 'none'} }}
            >
              <Resume result={result} sheetType={sheetType} setDrawer={setDrawer} />
          </Drawer>
        </div>
    );
};
 
export default FinancialWorksheet;
