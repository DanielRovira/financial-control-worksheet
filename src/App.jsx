import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProSidebarProvider } from "react-pro-sidebar";
import { useEffect, useState } from 'react';
import GlobalStyle from './components/global';
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet';
import Sidebar from './components/Main/Sidebar';
import Header from "./components/Main/Header";
import Login from "./components/Main/Login";
import Main from "./components/Main/Main";
import axios from 'axios';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));
    const [accName, setAccName] = useState(localStorage.getItem("userName"));
    const [sections, setSections] = useState([]);

    function getData() {
        fetch(`/api/${process.env.REACT_APP_DB}/sections`, { method:"GET" })
        .then(response => response.json())
        .then(data => setSections(data))
    }

    useEffect(() => {
        setSections([])
        getData()
    },[isLoggedIn])

    const refreshToken = async () => {
        const res = await axios
          .get("/api/refresh", {
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
        return data;
    };

    refreshToken()

    return (
        <ProSidebarProvider>
            <Router>
                {isLoggedIn ? <Sidebar sections={sections} /> : ""}
                
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} accName={accName} setAccName={setAccName} />
                    <Routes>
                        <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} refreshToken={refreshToken} />} />
                        <Route path="/main" element={<Main sections={sections} />} />
                        <Route path="/financial-control/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} refreshToken={refreshToken} />} />
                    </Routes>
            </Router>    
            <GlobalStyle />
        </ProSidebarProvider>
    )
};

export default App;