import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import GlobalStyle from './components/global';
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet';
import Sidebar from './components/Main/Sidebar2';
import Header from './components/Main/Header';
import Login from './components/Main/Login';
import Main from './components/Main/Main';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [accName, setAccName] = useState(localStorage.getItem('userName'));
    const [open, setOpen] = useState(false);
    const [sheetType, setSheetType] = useState();
    const sidebar = useRef(null);
    const collapseSidebar = () => { open && setOpen(false) }
    useClickAway(sidebar, collapseSidebar);

    useEffect(() => {
        !isLoggedIn && localStorage.clear()
    },[isLoggedIn])

    return (
        <>
            {/* <Router basename='/financial-control-worksheet'>  // For using on GitHub Pages */} 
            <Router>
                <div ref={sidebar}>
                {isLoggedIn ? <Sidebar open={open} setOpen={setOpen} /> : ""}
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAccName={setAccName} open={open} setOpen={setOpen} sheetType={sheetType} />
                </div>
                    <Routes>
                        <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAccName={setAccName} />} />
                        <Route path="/main" element={<Main isLoggedIn={isLoggedIn} setSheetType={setSheetType} />} />
                        <Route path="/financial-control/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'financialControl'} setSheetType={setSheetType} />} />
                        <Route path="/financial-todos/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'todoPayments'} setSheetType={setSheetType} />} />
                    </Routes>
            </Router>    
            <GlobalStyle />
        </>
    )
};

export default App;
