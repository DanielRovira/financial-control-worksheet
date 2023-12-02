import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import FinancialWorksheet from './FinancialWorksheet';

const FinancialWorksheetRoutes = ({ refreshToken, isLoggedIn, setIsLoggedIn, setMainSheetType }) => {

    useEffect(() => {
        setMainSheetType('FinancialWorksheet');
    }, [setMainSheetType]);

return (
    <>
        <Routes>
            <Route path="*" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={undefined} />} />
            <Route path="/summary/:taskTitle" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'summary'} />} />
            <Route path="/financialControl/:taskTitle" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'financialControl'} />} />
            <Route path="/todoPayments/:taskTitle" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'todoPayments'} />} />
            <Route path="/trash" element={<FinancialWorksheet refreshToken={refreshToken} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} sheetType={'trash'} />} />
        </Routes> 
    </>
);
};

export default FinancialWorksheetRoutes;