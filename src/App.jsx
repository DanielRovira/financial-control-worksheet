import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import FinancialWorksheet from './FinancialWorksheet'

const App = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<FinancialWorksheet/>} />
                    <Route path="/financial-control-worksheet" element={<FinancialWorksheet/>} />
                </Routes>
        </Router>    
    )
};

export default App;