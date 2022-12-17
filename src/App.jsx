import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProSidebarProvider } from "react-pro-sidebar";
import { useEffect, useState } from 'react';
import GlobalStyle from './components/global';
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet';
import Sidebar from './components/Main/Sidebar';
import Header from "./components/Main/Header";
import Login from "./components/Main/Login";
import Main from "./components/Main/Main";


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
    const [accName, setAccName] = useState(localStorage.getItem("userName"));
    const [sections, setSections] = useState([]);
    const [type, setType] = useState();

    useEffect(() => {
        setSections([])
        isLoggedIn ? refreshToken() : void(0)
    },[isLoggedIn])

    const refreshToken = async () => {
        function getData() {
            fetch(`${process.env.REACT_APP_BACKEND}/api/financial-control/sections`,
            {
                method:"GET",
                credentials: "include"
            })
            .then(response => response.json())
            .then(data => setSections(data.post || []))
        }
        getData()
        const res = await
            fetch(`${process.env.REACT_APP_BACKEND}/api/refresh`,
            {
                method:"GET",
                credentials: "include",
            })
        .then(response => response.json())
        .then(localStorage.clear())
        setIsLoggedIn(res.status)
        const setLogin = () => {
            localStorage.setItem("isLoggedIn", JSON.stringify(true))
            localStorage.setItem("userName", res.user.name)
            setAccName(res.user.name)
        }

        res.user ? setLogin() : localStorage.clear()
    };

    return (
        <ProSidebarProvider>
            <Router>
                {isLoggedIn ? <Sidebar sections={sections} accName={accName} /> : ""}
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} accName={accName} setAccName={setAccName} type={type} setType={setType} />
                    <Routes>
                        <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} refreshToken={refreshToken} />} />
                        <Route path="/main" element={<Main sections={sections} isLoggedIn={isLoggedIn} />} />
                        <Route path="/financial-control/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} refreshToken={refreshToken} setType={setType} />} />
                    </Routes>
            </Router>    
            <GlobalStyle />
        </ProSidebarProvider>
    )
};

export default App;
