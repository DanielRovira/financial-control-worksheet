import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Drawer, LinearProgress } from '@mui/material';
import { useClickAway } from 'react-use';
import {useDropzone} from 'react-dropzone'
import BottomNavigation from './components/BottomNav';
import Calendar from './components/Calendar';
import EmpityFolder from './components/EmpityFolder';
import Form from './components/Form';
import Grid from './components/Grid';
import Header from './components/Header';
import Main from './components/Main';
import Resume from './components/Resume';
import Sidebar from './components/Sidebar';
import Summary from './components/Summary';
import Snackbar from './components/Snackbar';
import UploadFile from './components/UploadFile';

const FinancialWorksheet = ({ refreshToken, isLoggedIn, setIsLoggedIn, sheetType }) => {
    const [transactionsList, setTransactionsList] = useState([]);
    const [result, setResult] = useState([]);
    const [add, setAdd] = useState();
    const [drawer, setDrawer] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [undoItem, setUndoItem] = useState([]);
    // const [undoTrash, setUndoTrash] = useState([]);
    const [checked, setChecked] = useState([]);
    const [archived, setArchived] = useState(false);
    const [loadingData, setLoadingData] = useState();
    const [operationType, setOperationType] = useState();
    const [syncing, setSyncing] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [uploadedData, setUploadedData] = useState();
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const history = useNavigate();
    const params = useParams();
    const timer = useRef(null);
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const sectionExists = sections.find((section) => String(section.title) === params.taskTitle)
    const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
    let sources = Array.from(categoriesList || []).filter(item => item.type === 'source')
    
    const sidebar = useRef(null);
    const collapseSidebar = () => { openSidebar && setOpenSidebar(false) }
    useClickAway(sidebar, collapseSidebar);

    const getData = async () => {
        if (sheetType !== undefined ){
        if (sectionExists) {
            const res = await
            fetch(`/api/finances/list/${params.taskTitle}-financialControl`, { method:'GET', credentials: 'include' })
                .then(response => response.json())
                .catch(error => {
                    setIsLoggedIn(false); history('/');
                })

            const res2 = await
            fetch(`/api/finances/list/${params.taskTitle}-todoPayments`, { method:'GET', credentials: 'include' })
                .then(response => response.json())
                .catch(error => {
                    setIsLoggedIn(false); history('/');
                })

            if (res?.status === 200 && res2?.status === 200 ) {
                setLoadingData(false)

                setTransactionsList({
                    financialControl: res.post || [],
                    todoPayments: res2.post || [],
                    summary: res.post || []
                } || [])
            }
            else {setIsLoggedIn(false); history('/')} 
        }

        else {history('/')}
    }}

    useEffect(() => {
        refreshToken()
        setTransactionsList([])
        setLoadingData(true)
        isLoggedIn ? getData() : history('/')
    },[params.taskTitle, isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        clearTimeout(timer.current)
        setUndoItem([])
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
        }, time || 100);
    }

    const handleEditSelected = (type, info) => {
        let checkedList = JSON.parse(JSON.stringify(checked));
        let list = (type === 'undo') ? undoItem : checkedList
        setChecked([]);
        
        list.forEach((item, index) => {
            let newItem = JSON.parse(JSON.stringify(item))
            type !== 'undo' && setUndoItem((prev) => [ ...prev, newItem])

            if (type === 'del')  {
                newItem.deleted = newItem.deleted === undefined ? false : newItem.deleted
                item.deleted = !item.deleted
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
            }

            if (type === 'trash')  {
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
                index === list.length - 1 ? deleteDocument(item, true) : deleteDocument(item)
  
                getDataTimeout()
                return
            }

            if (type === 'archive')  {
                item.archived = !item.archived
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
                setTransactionsList((prev) =>  ({...prev, [sheetType]: [...prev[sheetType], item]}) )
            }

            if (type === 'move')  {
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
                item.costCenter = info
            }

            if (type === 'markAsPayd')  {
                setTransactionsList((prev) => ({...prev, [sheetType]: prev[sheetType].filter(it => it._id !== item._id)}))
                
                if (sheetType === 'financialControl') {
                    item.status = 'todoPayments'
                    setTransactionsList((prev) =>  ({...prev, 'todoPayments': [...prev['todoPayments'], item]}) )
                }
        
                if (sheetType === 'todoPayments') {
                    item.status = 'financialControl'
                    setTransactionsList((prev) =>  ({...prev, 'financialControl': [...prev['financialControl'], item]}) )
                }
            }

            if (type === 'duplicate')  {
                delete newItem._id;
                setTransactionsList((prev) =>  ({...prev, [sheetType]: [...prev[sheetType], newItem]}) )
                index === list.length - 1 ? insertDocument(newItem, true) : insertDocument(newItem)
                getDataTimeout()
                return
            }
            index === list.length - 1 ? updateDocument(item, true) : updateDocument(item)
            getDataTimeout()
        })
        setOperationType()
    }

    async function insertDocument(item, last) {
        setSyncing(true);
        await fetch(`/api/finances/add/${params.taskTitle}`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => last && response.status === 200 && setSyncing(false))
        .catch(console.error)
    }

    async function updateDocument(item, last) {
        setSyncing(true);
        await fetch(`/api/finances/update/${params.taskTitle}`,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => last && response.status === 200 && setSyncing(false))
        .catch(console.error)
    }

    async function deleteDocument(item, last) {
        // setSyncing(true);
        await fetch(`/api/finances/delete/${params.taskTitle}`,
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
    
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({noClick: true, maxFiles:1})

    useEffect(() => {
        isDragActive && setAdd(true)
    }, [isDragActive]);

    return (<>
            <div ref={sidebar}>
                <Sidebar  sections={sections} style={{ overflow: 'hidden' }} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} sheetType={sheetType} />
            </div>
            {sheetType === undefined ? <Main setOpenSidebar={setOpenSidebar} /> : 
            <div className='FinancialWorksheet' {...getRootProps()}>
                <input {...getInputProps()} />
                    <UploadFile isDragActive={isDragActive} acceptedFiles={acceptedFiles} setUploadedData={setUploadedData} insertDocument={insertDocument} taskTitle={params.taskTitle} />
                    <Header add={add} setAdd={setAdd} setDrawer={setDrawer} sheetType={sheetType} showCalendar={showCalendar} setShowCalendar={setShowCalendar} checked={checked} setChecked={setChecked} handleEditSelected={handleEditSelected} setOperationType={setOperationType} setUndoItem={setUndoItem} handleOpenSnackbar={handleOpenSnackbar} archived={archived} setArchived={setArchived} syncing={syncing} setSyncing={setSyncing} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                    {add && params.taskTitle !== 'TRASH' && archived === false && sheetType !== 'summary' && (user.type === 'admin' ? true : user.permissions[params.taskTitle][sheetType] === 'edit') && <Form insertDocument={insertDocument} sheetType={sheetType} getDataTimeout={getDataTimeout} setTransactionsList={setTransactionsList} setUndoItem={setUndoItem} uploadedData={uploadedData} />}
                    {loadingData ? <LinearProgress /> :
                    <>
                        {/* {transactionsList[sheetType]?.length === 0 ? <EmpityFolder /> : */}
                        <>
                            {sheetType === 'summary'
                            ? transactionsList['financialControl']?.filter(item => !item.archived)?.length > 0 ? <Summary rawData={transactionsList['financialControl']?.filter(item => !item.archived)} setAdd={setAdd} /> : null
                            : <Grid rawData={transactionsList[sheetType] || []} updateDocument={updateDocument} sheetType={sheetType} setUndoItem={setUndoItem} checked={checked} setChecked={setChecked} archived={archived} setOperationType={setOperationType} handleOpenSnackbar={handleOpenSnackbar} setAdd={setAdd} section={params.taskTitle} syncing={syncing} />
                            }
                        </>
                         {/* } */}
                    </>}
                    {transactionsList[sheetType]?.length === 0 && <EmpityFolder />}
                    <BottomNavigation section={params.taskTitle} sheetType={sheetType} />
                    <Drawer
                    anchor='right'
                    open={drawer}
                    onClose={() => setDrawer(false)}
                    sx={{ '.MuiDrawer-paper': { backgroundColor: 'transparent', boxShadow: 'none'} }}
                    >
                      <Resume result={result} sheetType={sheetType} setDrawer={setDrawer} />
                    </Drawer>
                    {showCalendar && <Calendar rawData={transactionsList[sheetType]?.filter(item => !item.archived)} setShowCalendar={setShowCalendar} />}
                    <Snackbar openSnackbar={openSnackbar} setOpenSnackbar={setOpenSnackbar} undoItem={undoItem} setUndoItem={setUndoItem} updateDocument={updateDocument} handleEditSelected={handleEditSelected} operationType={operationType} setOperationType={setOperationType} getDataTimeout={getDataTimeout} />
            </div>  }
            </>
    );
};
 
export default FinancialWorksheet;
