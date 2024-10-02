import './styles.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import Form from './components/Form';
import Grid from './components/Grid';
import Header from './components/Header';
import EmpityFolder from '../Financial-control/components/EmpityFolder'
// const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`)

const PurchaseRequests = ({ mainSheetType, setMainSheetType, setIsLoggedIn, refreshToken, isLoggedIn }) => {
    const history = useNavigate();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const [purchasesData, setPurchasesData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [add, setAdd] = useState();
    const [editItem, setEditItem] = useState();
    const [checked, setChecked] = useState([]);

    const getData = async () => {
        const res = await
        fetch(`/api/purchases/list`, { method:'GET', credentials: 'include' })
            .then(response => response.json())
            .catch(error => {
                setIsLoggedIn(false);
            })

        if (res?.status === 200) {
            setLoadingData(false)
            setPurchasesData(res.post)
        }
    }

    async function insertDocument(transaction) {
        // setSyncing(true);
        try {
            await fetch(`/api/purchases/add`,
                {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(transaction)
                })
            // const data = await res.json()
            .then(response => response.json())
            .then(() => getData())
        } catch (error) {
        console.log(error);
      }
    }

    function updateDocument(item) {
        console.log(item)
        // setSyncing(true);
        fetch(`/api/purchases/update`,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        // .then(response => response.json())
        .then(() => getData())
        .catch(console.error)
    }

    function deleteDocument(item) {
        // setSyncing(true);
        fetch(`/api/purchases/delete`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        // .then(response => last && response.status === 204 && setSyncing(false))
        .catch(console.error)
    }

    const handleDeleteSelected = () => {
        let checkedList = JSON.parse(JSON.stringify(checked));
        setChecked([]);
        
        checkedList.forEach((item, index) => {            
            setPurchasesData((prev) => ([...prev.filter(it => it._id !== item._id)]))
            index === checkedList.length - 1
                ? deleteDocument(item)
                : deleteDocument(item)
        })
    }

    const handleEdit = (item) => {
        setEditItem(item)
        setAdd(true)
    }

    useEffect(() => {
        refreshToken()
        setPurchasesData([])
        setLoadingData(true)
        isLoggedIn ? getData() : history('/')
    },[isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        setMainSheetType('PurchaseRequests');
    }, [setMainSheetType]);

    return (
        <div className='PurchaseRequests'>
            <div className='PurchaseRequestsSub'>
                <Header mainSheetType={mainSheetType} add={add} setAdd={setAdd} handleDeleteSelected={handleDeleteSelected} />
                {add && <Form editItem={editItem} setEditItem={setEditItem} setAdd={setAdd} sections={sections} insertDocument={insertDocument} updateDocument={updateDocument} />}
                {loadingData ? <LinearProgress /> :
                    <>
                        <Grid purchasesData={purchasesData} checked={checked} setChecked={setChecked} handleEdit={handleEdit} />
                        {purchasesData?.length === 0 && <EmpityFolder />}
                    </>
                }
            </div>
        </div>
    )
}

export default PurchaseRequests