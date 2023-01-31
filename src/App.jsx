import { Route, Routes, useNavigate } from 'react-router-dom';
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
document.querySelector('link[rel=icon]').href = `${process.env.REACT_APP_LOGO}.png`
document.title = process.env.REACT_APP_NAME

const App = () => {
    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [openSidebar, setOpenSidebar] = useState(false);
    const [sheetType, setSheetType] = useState();
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState(JSON.parse(localStorage.getItem("sections")) || []);
    const [categories, setCategories] = useState(JSON.parse(localStorage.getItem("categories")) || []);
    const sidebar = useRef(null);
    const collapseSidebar = () => { openSidebar && setOpenSidebar(false) }
    useClickAway(sidebar, collapseSidebar);

    const refreshToken = async () => {
        getSections();
        getCategories();
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
        .then(response => localStorage.setItem('sections', JSON.stringify(response.sort((a, b) => a.name.localeCompare(b.name)))))
        .then(() => setSections(JSON.parse(localStorage.getItem("sections")) || []))
        .then(() => setLoading(false))
    }

    const getCategories = async () => {
        await fetch(`/api/${process.env.REACT_APP_DB}/categories`, { method:'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => localStorage.setItem('categories', JSON.stringify(response.sort((a, b) => a.name.localeCompare(b.name)))))
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
            {isLoggedIn && !loading ? <Sidebar sections={sections} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} style={{ overflow: 'hidden' }} /> : ""}
            <Header sendLogoutReq={sendLogoutReq} isLoggedIn={isLoggedIn} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} sheetType={sheetType} />
            </div>
                <Routes>
                    <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoading={setLoading} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/main" element={<Main sections={sections} refreshToken={refreshToken} isLoggedIn={isLoggedIn} setSheetType={setSheetType} setLoading={setLoading} />} />
                    <Route path="/settings" element={<Settings  categories={categories} setCategories={setCategories} sections={sections} setSections={setSections} set setSheetType={setSheetType} refreshToken={refreshToken} />} />
                    <Route path="/summary/:taskTitle" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'summary'} setSheetType={setSheetType} />} />
                    <Route path="/financialControl/:taskTitle" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'financialControl'} setSheetType={setSheetType} />} />
                    <Route path="/todoPayments/:taskTitle" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'todoPayments'} setSheetType={setSheetType} />} />
                    <Route path="/trash" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'trash'} setSheetType={setSheetType} />} />
                </Routes> 
            <GlobalStyle />
        </div>
    )
};

export default App;
