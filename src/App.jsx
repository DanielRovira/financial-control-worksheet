import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import GlobalStyle from './components/global';
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet';
import Sidebar from './components/Main/Sidebar';
import Header from './components/Main/Header';
import Login from './components/Main/Login';
import Signup from './components/Main/Signup';
import Main from './components/Main/Main';

const App = () => {
    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [accName, setAccName] = useState(localStorage.getItem('userName'));
    const [open, setOpen] = useState(false);
    const [sheetType, setSheetType] = useState();
    const sidebar = useRef(null);
    const collapseSidebar = () => { open && setOpen(false) }
    useClickAway(sidebar, collapseSidebar);

    const refreshToken = async () => {
        await fetch(`/api/refreshtoken`, { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => response.message && (setIsLoggedIn(false), history('/')))
        .catch(error => {
            setIsLoggedIn(false); history('/');
        })
    }

    useEffect(() => {
        refreshToken()
        !isLoggedIn && localStorage.clear(); 
    },[isLoggedIn, history]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <div ref={sidebar}>
            {isLoggedIn ? <Sidebar open={open} setOpen={setOpen} style={{ overflow: 'hidden' }} /> : ""}
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} accName={accName} setAccName={setAccName} open={open} setOpen={setOpen} sheetType={sheetType} />
            </div>
                <Routes>
                    <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAccName={setAccName} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/main" element={<Main refreshToken={refreshToken} isLoggedIn={isLoggedIn} setSheetType={setSheetType} />} />
                    <Route path="/financial-summary/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'summary'} setSheetType={setSheetType} />} />
                    <Route path="/financial-control/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'financialControl'} setSheetType={setSheetType} />} />
                    <Route path="/financial-todos/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'todoPayments'} setSheetType={setSheetType} />} />
                </Routes> 
            <GlobalStyle />
        </>
    )
};

export default App;
