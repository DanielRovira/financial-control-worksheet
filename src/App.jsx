import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import FinancialWorksheet from './components/Financial-control/FinancialWorksheet'
import Sidebarr from './components/Sidebar/Sidebar'
import { ProSidebarProvider } from "react-pro-sidebar";

const App = () => {
    return (
        <ProSidebarProvider>
            <Router>
                <Sidebarr />
                    <Routes>
                        <Route path="/" element={<FinancialWorksheet/>} />
                        <Route path="/financial-control-worksheet" element={<FinancialWorksheet/>} />
                    </Routes>
            </Router>    
        </ProSidebarProvider>
    )
};

export default App;