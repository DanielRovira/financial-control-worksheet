import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useEffect, useState } from 'react';
import GlobalStyle from './components/global';
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet';
import FinancialTodos from './components/Financial-control/FinancialTodos';
import Sidebar from './components/Main/Sidebar';
import Header from './components/Main/Header';
import Login from './components/Main/Login';
import Main from './components/Main/Main';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
    const [accName, setAccName] = useState(localStorage.getItem('userName'));
    const [categories, setCategories] = useState([]);

    const getSections = async () => {
        const res = await 
            fetch(`/api/${process.env.REACT_APP_DB}/sections`,
            {
                method: 'GET',
                credentials: 'include'
            })
        .then(response => response.json())
        localStorage.setItem('sections', JSON.stringify(res))
    }

    const getCategories = async () => {
        const res = await
        fetch(`/api/${process.env.REACT_APP_DB}/categories`, { method:'GET', credentials: 'include' })
        .then(response => response.json())
        setCategories(res)
    }

    // const refreshToken = async () => {
    //     const res = await
    //         fetch(`/api/refresh`,
    //         {
    //             method: 'GET',
    //             credentials: 'include',
    //         })
    //     .then(response => response.json())

    //     const setLogin = () => {
    //         localStorage.setItem('isLoggedIn', JSON.stringify(true))
    //         localStorage.setItem('userName', res.user.name)
    //         setAccName(res.user.name)
    //     }

    //     setIsLoggedIn(res.status || false)
    //     res.user ? setLogin() : localStorage.clear()
    // };

    useEffect(() => {
        // setSections([])
        !isLoggedIn && localStorage.clear()
    },[isLoggedIn])

    return (
        <ProSidebarProvider>
            {/* <Router basename='/financial-control-worksheet'> */}
            <Router>
                {isLoggedIn ? <Sidebar accName={accName} /> : ""}
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAccName={setAccName} />
                    <Routes>
                        <Route path="*" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} getSections={getSections} getCategories={getCategories} setAccName={setAccName} />} />
                        <Route path="/main" element={<Main isLoggedIn={isLoggedIn} />} />
                        <Route path="/financial-control/:taskTitle" element={<FinancialWorksheet isLoggedIn={isLoggedIn} categories={categories} />} />
                        <Route path="/financial-todos/:taskTitle" element={<FinancialTodos isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setAccName={setAccName} />} />
                    </Routes>
            </Router>    
            <GlobalStyle />
        </ProSidebarProvider>
    )
};

export default App;
