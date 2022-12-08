import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ProSidebarProvider } from "react-pro-sidebar";
import GlobalStyle from './components/Financial-control/styles/global';
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet'
import Sidebarr from './components/Sidebar/Sidebar'
import Header from "./components/Header";
import Login from "./components/Login";
import axios from 'axios';

const App = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const refreshToken = async () => {
        const res = await axios
          .get("http://localhost:3001/api/refresh", {
            withCredentials: true,
          })
          .catch((err) => console.log(err));
    
        const data = await res.data;
        data.user ? localStorage.setItem("isLoggedIn", JSON.stringify(true)) : localStorage.setItem("isLoggedIn", JSON.stringify(false))
        console.log(isLoggedIn)
        return data;
    };

    refreshToken()

    return (
        <ProSidebarProvider>
            <Router>
                <Sidebarr />
                <Header />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        {isLoggedIn && <Route path="/user" element={<FinancialWorksheet />} />}{<Route path="/" element={<Login/>} />}
                    </Routes>
            </Router>    
            <GlobalStyle />
        </ProSidebarProvider>
    )
};

export default App;