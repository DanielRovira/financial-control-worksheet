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
import Settings from './components/Main/Settings';
import  { Backdrop, CircularProgress } from '@mui/material';
    
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const App = () => {
    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    // const [accName, setAccName] = useState(localStorage.getItem('user'));
    const [openSidebar, setOpenSidebar] = useState(false);
    const [sheetType, setSheetType] = useState();
    const [loading, setLoading] = useState(false);
    const sidebar = useRef(null);
    const collapseSidebar = () => { openSidebar && setOpenSidebar(false) }
    useClickAway(sidebar, collapseSidebar);

    const refreshToken = async () => {
        setLoading(true);
        await fetch(`/api/refreshtoken`, { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => response.message && sendLogoutReq())
        .catch(error => {
            clearLogin();
        })
    }
    
    const getSections = async () => {
        await fetch(`/api/${process.env.REACT_APP_DB}/sections`, { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => localStorage.setItem('sections', JSON.stringify(response)))
        .then(() => setLoading(false))
    }

    const getCategories = async () => {
        await fetch(`/api/${process.env.REACT_APP_DB}/categories`, { method:'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => localStorage.setItem('categories', JSON.stringify(response)))
    }
    
    const sendLogoutReq = async () => {
        clearLogin();
        await fetch(`/api/logout`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then(response => response.json())
    };

    const clearLogin = () => {
        setIsLoggedIn(false);
        // setAccName(null);
        setLoading(false);
        localStorage.clear();
        history('/');
    }

    useEffect(() => {
        getSections();
        getCategories();
        !isLoggedIn && sendLogoutReq();
    },[isLoggedIn, history]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='App'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div ref={sidebar}>
            {isLoggedIn && !loading ? <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} style={{ overflow: 'hidden' }} /> : ""}
            <Header sendLogoutReq={sendLogoutReq} isLoggedIn={isLoggedIn} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} sheetType={sheetType} />
            </div>
                <Routes>
                    <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/main" element={<Main refreshToken={refreshToken} isLoggedIn={isLoggedIn} setSheetType={setSheetType} />} />
                    <Route path="/settings" element={<Settings setSheetType={setSheetType} getSections={getSections} getCategories={getCategories} />} />
                    <Route path="/financial-summary/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'summary'} setSheetType={setSheetType} />} />
                    <Route path="/financial-control/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'financialControl'} setSheetType={setSheetType} />} />
                    <Route path="/financial-todos/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'todoPayments'} setSheetType={setSheetType} />} />
                </Routes> 
            <GlobalStyle />
        </div>
    )
};

export default App;
