import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Drawer, LinearProgress } from '@mui/material';
import BottomNavigation from './components/BottomNav';
import Calendar from './components/Calendar';
import Form from './components/Form';
import Grid from './components/Grid';
import Header from './components/Header';
import Resume from './components/Resume';
import Summary from './components/Summary';
import Snackbar from './components/Snackbar';
// const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`)

const FinancialWorksheet = ({ refreshToken, isLoggedIn, setIsLoggedIn, sheetType, setSheetType }) => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [transactionsList2, setTransactionsList2] = useState([]);
    const [result, setResult] = useState([]);
    const [add, setAdd] = useState();
    const [drawer, setDrawer] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [undoItem, setUndoItem] = useState();
    const [checked, setChecked] = useState([]);
    const [filter, setFilter] = useState(false);
    const history = useNavigate();
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const sectionExists = sections.find((section) => String(section.title) === params.taskTitle)
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let sources = Array.from(categoriesList || []).filter(item => item.type === 'source')

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
        refreshToken()
        setSheetType(sheetType)
        setTransactionsList([])
        setTransactionsList2([])
        isLoggedIn ? getData() : history('/')
        // sections && (Array.from(sections || []).filter((section) => section.title === params.taskTitle)[0] ? setSectionName(sections) : history('/'))
    },[params.taskTitle, isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setUndoItem()
        setSheetType(sheetType)
        setChecked([])
    },[history]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDeleteAll = (type) => {
        checked.map((item) => {
            // sendDocumentToTrash(item)
            deleteDocument(item)
            delete item._id
            delete item.archived
            type === 'del' && insertDocument(item, 'TRASH')
            type === 'restore' && insertDocument(item, item.costCenter)
        })
    }

    const handleSetArchived = () => {
        checked.map((item) => {
            updateDocument({ ...item, archived: !item.archived})
        })
    }

    function insertDocument(transaction, path) {
        fetch(`/api/${process.env.REACT_APP_DB}/add/${path? path : params.taskTitle}-${sheetType}`,
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
        setOpenSnackbar(true)
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
        setOpenSnackbar(true)
        fetch(`/api/${process.env.REACT_APP_DB}/delete/${params.taskTitle}-${sheetType}`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(() => getData())
        .then(() => setChecked([]))
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

        Array.from(sources)?.map((prov) => (
            setResult((prev) => ({ ...prev, [prov.name]:
                calc(transactionsList.filter((item) => (item.source === prov.name)))
            }))
         ))
    }, [transactionsList, transactionsList2]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='FinancialWorksheet'>
            <Header add={add} setAdd={setAdd} setDrawer={setDrawer} sheetType={sheetType} showCalendar={showCalendar} setShowCalendar={setShowCalendar} checked={checked} setChecked={setChecked} handleDeleteAll={handleDeleteAll} handleSetArchived={handleSetArchived} filter={filter} setFilter={setFilter} />
            {add && params.taskTitle !== 'TRASH' && <Form insertDocument={insertDocument} sheetType={sheetType} />}
            {transactionsList?.length === 0 ? <LinearProgress /> :
            <>{sheetType === 'summary' ?
            <Summary rawData={transactionsList} setAdd={setAdd} /> :
            <Grid rawData={sheetType === 'financialControl' ? transactionsList : transactionsList2} deleteDocument={deleteDocument} updateDocument={updateDocument} sheetType={sheetType} setUndoItem={setUndoItem} checked={checked} setChecked={setChecked} filter={filter} />
            }</>
            }

            <BottomNavigation section={params.taskTitle} sheetType={sheetType} />
            <Drawer
            anchor='right'
            open={drawer}
            onClose={() => setDrawer(false)}
            sx={{ '.MuiDrawer-paper': { backgroundColor: 'transparent', boxShadow: 'none'} }}
            >
              <Resume result={result} sheetType={sheetType} setDrawer={setDrawer} />
            </Drawer>
            {showCalendar && <Calendar rawData={sheetType === 'todoPayments' ? transactionsList2 : transactionsList} setShowCalendar={setShowCalendar} sheetType={sheetType} />}
            <Snackbar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} undoItem={undoItem} updateDocument={updateDocument} />
        </div>
    );
};
 
export default FinancialWorksheet;
