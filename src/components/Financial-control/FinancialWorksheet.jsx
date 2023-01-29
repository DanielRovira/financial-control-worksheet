import { useEffect, useState } from 'react';
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
    const [undoItem, setUndoItem] = useState([]);
    const [checked, setChecked] = useState([]);
    const [filter, setFilter] = useState(false);
    const [loadingData, setLoadingData] = useState();
    const [operationType, setOperationType] = useState();
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
            setChecked([])
            if (res.status === 200 && res2.status === 200) {setTransactionsList(res.post || []); setTransactionsList2(res2.post || []); setLoadingData(false)} else {setIsLoggedIn(false); history('/')} 
            }
            else {history('/')}
        }

    useEffect(() => {
        refreshToken()
        setSheetType(sheetType)
        setTransactionsList([])
        setTransactionsList2([])
        setLoadingData(true)
        isLoggedIn ? getData() : history('/')
        // sections && (Array.from(sections || []).filter((section) => section.title === params.taskTitle)[0] ? setSectionName(sections) : history('/'))
    },[params.taskTitle, isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setUndoItem([])
        setSheetType(sheetType)
        setChecked([])
        setFilter(false)
    },[history]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleOpenSnackbar = () => {
        setOpenSnackbar(false)
        setTimeout(() => {
            setOpenSnackbar(true)
        }, 5);
    }
// eslint-disable-line
    const handleDeleteSelected = (type) => {
        (type === 'undo' || type === 'undoDuplicate' ? undoItem : checked).forEach((item, index) => {
            type === 'undo'
                ? deleteDocument(item, 'TRASH')
                : index === (type === 'undo' || type === 'undoDuplicate' ? undoItem : checked).length - 1
                    ? deleteDocument(item)
                    : deleteDocument(item, params.taskTitle);
            
            let newItem = JSON.parse(JSON.stringify(item))
            delete newItem._id;
            delete newItem.archived;
            type === 'del' && insertDocument(newItem, 'TRASH');
            type === 'restore' && insertDocument(newItem, newItem.costCenter);
            type === 'undo' && insertDocument(newItem);
        })
        setUndoItem([]);
        // setChecked([]);
    }

    const handleDuplicateSelected = () => {
        checked.forEach((item) => {
            let newItem = JSON.parse(JSON.stringify(item))
            delete newItem._id;
            insertDocument(newItem);
        })
    }

    const handleSetArchived = (type) => {
        (type === 'archive' ? undoItem : checked).forEach((item, index) => {
            index === (type === 'archive' ? undoItem : checked).length - 1
            ? updateDocument({ ...item, archived: !item.archived}, true)
            : updateDocument({ ...item, archived: !item.archived})
        })
        // setChecked([])
        setOperationType()
    }

    function insertDocument(transaction, path) {
        params.taskTitle !== 'TRASH' && handleOpenSnackbar();
        fetch(`/api/${process.env.REACT_APP_DB}/add/${path? path : params.taskTitle}-${sheetType}`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(response => setUndoItem((prev) => [ ...prev, response]))
        .then(() => !path && getData())
    }

    function updateDocument(item, update) {
        params.taskTitle !== 'TRASH' && handleOpenSnackbar();
        fetch(`/api/${process.env.REACT_APP_DB}/update/${params.taskTitle}-${sheetType}`,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(response => setUndoItem((prev) => [ ...prev, response]))
        .then(() => update && getData())
    }

    function deleteDocument(item, path) {
        params.taskTitle !== 'TRASH' && handleOpenSnackbar();
        fetch(`/api/${process.env.REACT_APP_DB}/delete/${path? path : params.taskTitle}-${sheetType}`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(() => !path && getData())
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
            <Header add={add} setAdd={setAdd} setDrawer={setDrawer} sheetType={sheetType} showCalendar={showCalendar} setShowCalendar={setShowCalendar} checked={checked} setChecked={setChecked} handleDeleteSelected={handleDeleteSelected} handleSetArchived={handleSetArchived} handleDuplicateSelected={handleDuplicateSelected} filter={filter} setFilter={setFilter} setOperationType={setOperationType} setUndoItem={setUndoItem} />
            {add && params.taskTitle !== 'TRASH' && filter === false && <Form insertDocument={insertDocument} sheetType={sheetType} setOperationType={setOperationType} />}
            {loadingData ? <LinearProgress /> :
            <>{sheetType === 'summary'
            ? transactionsList?.length > 0 &&<Summary rawData={transactionsList} setAdd={setAdd} />
            : <Grid rawData={sheetType === 'financialControl' ? transactionsList : transactionsList2} deleteDocument={deleteDocument} updateDocument={updateDocument} sheetType={sheetType} setUndoItem={setUndoItem} checked={checked} setChecked={setChecked} filter={filter} setOperationType={setOperationType} />
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
            <Snackbar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} undoItem={undoItem} setUndoItem={setUndoItem} updateDocument={updateDocument} handleDeleteSelected={handleDeleteSelected} operationType={operationType} setOperationType={setOperationType} handleSetArchived={handleSetArchived} />
        </div>
    );
};
 
export default FinancialWorksheet;
