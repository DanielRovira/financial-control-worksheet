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
    const [result, setResult] = useState([]);
    const [add, setAdd] = useState();
    const [drawer, setDrawer] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [undoItem, setUndoItem] = useState([]);
    const [undoTrash, setUndoTrash] = useState([]);
    const [checked, setChecked] = useState([]);
    const [archived, setArchived] = useState(false);
    const [loadingData, setLoadingData] = useState();
    const [operationType, setOperationType] = useState();
    const [syncing, setSyncing] = useState(false);
    const history = useNavigate();
    const params = useParams();
    const timer = useRef(null);
    const timeOut = 7000
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

            if (res.status === 200 && res2.status === 200) {
                setLoadingData(false)

                setTransactionsList({
                    financialControl: res.post  || [],
                    todoPayments: res2.post || [],
                    summary: res.post || []
                } || [])
            }
            else {setIsLoggedIn(false); history('/')} 
        }

        else {history('/')}
    }

    useEffect(() => {
        refreshToken()
        setSheetType(sheetType)
        setTransactionsList([])
        setLoadingData(true)
        isLoggedIn ? getData() : history('/')
    },[params.taskTitle, isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        clearTimeout(timer.current)
        setUndoItem([])
        setSheetType(sheetType)
        setChecked([])
        setArchived(false)
    },[history]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleOpenSnackbar = () => {
        setOpenSnackbar(false)
        setTimeout(() => {
            setOpenSnackbar(true)
        }, 50);
    }

    const getDataTimeout = (time) => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            getData()
        }, time || timeOut);
    }

    const handleDeleteSelected = (type, time) => {
        let checkedList = JSON.parse(JSON.stringify(checked));
        let list = (type === 'undo') ? undoItem : checkedList
        setChecked([]);
        
        list.forEach((item, index) => {
            // type === 'undo'
            //     ? deleteDocument(item, 'TRASH')
            //     : deleteDocument(item)
            
            let newItem = JSON.parse(JSON.stringify(item))
            delete newItem._id;
            delete newItem.archived;

            if (type === 'undo') {
                setTransactionsList((prev) =>  ({...prev, [sheetType]: [...prev[sheetType], item]}) )
                // insertDocument(newItem);
                deleteDocument(undoTrash[index], 'TRASH')
                if (index === list.length - 1) {
                    insertDocument(newItem, null, null, true)
                    setUndoTrash([])
                }
                else {insertDocument(newItem)}
            }

            if (type === 'del')  {
                setUndoItem((prev) => [ ...prev, item])
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
                // insertDocument(newItem, 'TRASH');
                index === list.length - 1
                    ? insertDocument(newItem, 'TRASH', item, true)
                    : insertDocument(newItem, 'TRASH', item)
            }

            if (type === 'trash')  {
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
                index === list.length - 1
                    ? deleteDocument(item, null, null, true)
                    : deleteDocument(item)
            }

            if (type === 'restore')  {
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
                // insertDocument(newItem, newItem.costCenter)
                index === list.length - 1
                    ? insertDocument(newItem, newItem.costCenter, item, true)
                    : insertDocument(newItem, newItem.costCenter, item)
            }

            getDataTimeout(time)
        })
    }

    const handleDuplicateSelected = () => {
        let list = JSON.parse(JSON.stringify(checked))
        setChecked([])

        list.forEach((item, index) => {
            let newItem = JSON.parse(JSON.stringify(item))
            delete newItem._id;
            setTransactionsList((prev) =>  ({...prev, [sheetType]: [...prev[sheetType], newItem]}) )

            index === list.length - 1
                ? insertDocument(newItem, null, null, true)
                : insertDocument(newItem)

            getDataTimeout(50)
        })
    }

    const handleSetArchived = (type, time) => {
        let checkedList = JSON.parse(JSON.stringify(checked));
        let list = (type === 'undo') ? undoItem : checkedList
        setChecked([]);
        
        list.forEach((item, index) => {
            type !== 'undo' && setUndoItem((prev) => [ ...prev, item])
            item.archived = !item.archived
            setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
            setTransactionsList((prev) =>  ({...prev, [sheetType]: [...prev[sheetType], item]}) )
            // updateDocument(item)

            index === list.length - 1
            ? updateDocument(item, null, null, true)
            : updateDocument(item)

            getDataTimeout(time)
        })
        setOperationType()
    }

    async function insertDocument(transaction, path, alsoDelete, last) {
        setSyncing(true);
        try {
            const res = await fetch(`/api/${process.env.REACT_APP_DB}/add/${path? path : params.taskTitle}-${sheetType}`,
                {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(transaction)
                });
            const data = await res.json()
            if (res.status === 200) {
                last && setSyncing(false)
                alsoDelete && deleteDocument(alsoDelete)
                path === 'TRASH' && setUndoTrash((prev) => [ ...prev, data])
            }

        } catch (error) {
        console.log(error);
      }
    }

    function updateDocument(item, update, time, last) {
        setSyncing(true);
        fetch(`/api/${process.env.REACT_APP_DB}/update/${params.taskTitle}-${sheetType}`,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        // .then(response => response.json())
        .then(response => last && response.status === 200 && setSyncing(false))
        .then(() => update && getDataTimeout(time))
        .catch(console.error)
    }

    function deleteDocument(item, path, last) {
        // setSyncing(true);
        fetch(`/api/${process.env.REACT_APP_DB}/delete/${path? path : params.taskTitle}-${sheetType}`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => last && response.status === 204 && setSyncing(false))
        .catch(console.error)
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
            summary: calc(transactionsList['financialControl']?.filter(item => !item.archived) || []),
            financialControl: calc(transactionsList['financialControl']?.filter(item => !item.archived) || []),
            todoPayments: calc(transactionsList['todoPayments']?.filter(item => !item.archived) || []),
        }))

        Array.from(sources)?.map((prov) => (
            setResult((prev) => ({ ...prev, [prov.name]:
                calc((transactionsList['financialControl'] || [])?.filter(item => !item.archived).filter((item) => (item.source === prov.name)))
            }))
         ))
    }, [transactionsList]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='FinancialWorksheet'>
            <Header add={add} setAdd={setAdd} setDrawer={setDrawer} sheetType={sheetType} showCalendar={showCalendar} setShowCalendar={setShowCalendar} checked={checked} setChecked={setChecked} handleDeleteSelected={handleDeleteSelected} handleSetArchived={handleSetArchived} handleDuplicateSelected={handleDuplicateSelected} setOperationType={setOperationType} setUndoItem={setUndoItem} handleOpenSnackbar={handleOpenSnackbar} archived={archived} setArchived={setArchived} syncing={syncing} setSyncing={setSyncing} />
            {add && params.taskTitle !== 'TRASH' && archived === false && sheetType !== 'summary' && <Form insertDocument={insertDocument} sheetType={sheetType} setOperationType={setOperationType} getData={getData} setTransactionsList={setTransactionsList} setUndoItem={setUndoItem} />}
            {loadingData ? <LinearProgress /> :
            <>{sheetType === 'summary'
            ? transactionsList['financialControl']?.filter(item => !item.archived)?.length > 0 && <Summary rawData={transactionsList['financialControl']?.filter(item => !item.archived)} setAdd={setAdd} />
            : <Grid rawData={transactionsList[sheetType] || []} updateDocument={updateDocument} sheetType={sheetType} setUndoItem={setUndoItem} checked={checked} setChecked={setChecked} archived={archived} setOperationType={setOperationType} handleOpenSnackbar={handleOpenSnackbar} />
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
            {showCalendar && <Calendar rawData={transactionsList[sheetType]?.filter(item => !item.archived)} setShowCalendar={setShowCalendar} sheetType={sheetType} />}
            <Snackbar timeOut={timeOut} openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} undoItem={undoItem} setUndoItem={setUndoItem} updateDocument={updateDocument} handleDeleteSelected={handleDeleteSelected} operationType={operationType} setOperationType={setOperationType} handleSetArchived={handleSetArchived} getDataTimeout={getDataTimeout} />
        </div>
    );
};
 
export default FinancialWorksheet;
