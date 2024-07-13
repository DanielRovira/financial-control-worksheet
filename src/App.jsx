import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import GlobalStyle from './components/global';
import FinancialWorksheet from './components/Financial-control/routes';
import TaskList from './components/TaskList/TaskList';
import Contacts from './components/Contacts/Contacts';
import PurchaseRequests from './components/PurchaseRequests/PurchaseRequests';
import Sidebar from './components/Main/Sidebar';
import Header from './components/Main/Header';
import Login from './components/Main/Login';
import Main from './components/Main/Main';
import Settings from './components/Main/Settings';
// import Callback from './components/Main/Callback';
import manifestDetails from './components/manifestDetails.js';
import  { Backdrop, CircularProgress } from '@mui/material';

window.addEventListener("resize", function () {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
});

document.title = process.env.REACT_APP_NAME
document.querySelector('link[rel=icon]').href = `${process.env.REACT_APP_LOGO}.png`
document.querySelector('link[rel=apple-touch-icon]').href = `${process.env.REACT_APP_LOGO}/apple-touch-icon.png`
document.querySelector('link[rel=apple-touch-startup-image]').href = `${process.env.REACT_APP_LOGO}/apple_splash.png`

const stringManifest = JSON.stringify(manifestDetails);
const blob = new Blob([stringManifest], {type: 'application/json'});
const manifestURL = URL.createObjectURL(blob);
document.getElementById('manifest-placeholder').setAttribute('href', manifestURL);

const App = () => {
    const history = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [openSidebar, setOpenSidebar] = useState(false);
    const [mainSheetType, setMainSheetType] = useState();
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
            sendLogoutReq();
        })
    }

    const oauthLogin = async () => {
        const res = await fetch(`/api/getUser`, { method:'GET', credentials: 'include' })
        .then(response => response.json())
        if (!res.user) {
            return ;
        }

        const res2 = await fetch(`/api/tokenLogin`, {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                user: res.user,
              })
        })
        .then(response => response.json())

        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify({name: res.user.name, email: res.user.email}));
        setIsLoggedIn(true);
        setLoading(false);

    };

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
        // setLoading(true);
        //  refreshToken();      //RETIREI PRO GOOGLE AUTH FUNCIONAR
        oauthLogin();
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     !isLoggedIn && sendLogoutReq();
    // },[isLoggedIn, history]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
            const interval = setInterval(() => {
                refreshToken() 
            }, 600000) // Call API every 10 minutes
            return () => clearInterval(interval)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='App'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div ref={sidebar}>
                {isLoggedIn && !loading ? <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} mainSheetType={mainSheetType} setMainSheetType={setMainSheetType} style={{ overflow: 'hidden' }} /> : ""}
                <Header sendLogoutReq={sendLogoutReq} isLoggedIn={isLoggedIn} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            </div>
                <Routes>
                    <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setLoading={setLoading} />} />
                    <Route path="/main" element={<Main refreshToken={refreshToken} isLoggedIn={isLoggedIn} setMainSheetType={setMainSheetType} />} />
                    <Route path="/settings" element={<Settings  categories={categories} setCategories={setCategories} sections={sections} setSections={setSections} set setMainSheetType={setMainSheetType} refreshToken={refreshToken} />} />
                    <Route path="/FinancialWorksheet/*" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setMainSheetType={setMainSheetType} />} />
                    <Route path="/TaskList/*" element={<TaskList setMainSheetType={setMainSheetType} />} />
                    <Route path="/Contacts/*" element={<Contacts setMainSheetType={setMainSheetType} />} />
                    <Route path="/PurchaseRequests/*" element={<PurchaseRequests setMainSheetType={setMainSheetType} />} />
                </Routes> 
            <GlobalStyle />
        </div>
    )
};

export default App;
