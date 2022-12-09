import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProSidebarProvider } from "react-pro-sidebar";
import GlobalStyle from './components/Financial-control/styles/global';
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet'
import Sidebarr from './components/Sidebar/Sidebar'
import Header from "./components/Header";
import Login from "./components/Login";
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {
    // const isLoggedIn = localStorage.getItem("isLoggedIn");
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
    const [accName, setAccName] = useState(localStorage.getItem("userName"))

    const refreshToken = async () => {
        const res = await axios
          .get("http://localhost:3001/api/refresh", {
            withCredentials: true,
          })
          .then(localStorage.clear())
          .catch((err) => console.log(err));
    
        const data = await res.data;
        const setLogin = () => {
            localStorage.setItem("isLoggedIn", JSON.stringify(true))
            localStorage.setItem("userName", res.data.user.name)
            setAccName(res.data.user.name)
        }

        data.user ? setLogin() : localStorage.clear()
        // console.log(isLoggedIn)
        return data;
    };

    refreshToken()

    return (
        <ProSidebarProvider>
            <Router>
                <Sidebarr />
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} accName={accName} setAccName={setAccName} />
                    <Routes>
                        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} refreshToken={refreshToken} />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} refreshToken={refreshToken} />} />
                        <Route path="/user" element={<FinancialWorksheet />} />
                    </Routes>
            </Router>    
            <GlobalStyle />
        </ProSidebarProvider>
    )
};

export default App;