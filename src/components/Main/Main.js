import './styles/Main.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { List, ListSubheader } from '@mui/material';
// import NestedList from './NestedList';
import TaskList from '../TaskList/TaskList';
import FinancialWorksheetMain from '../Financial-control/components/Main'


const Main = ({ refreshToken, isLoggedIn, setMainSheetType, setLoading }) => {
    const history = useNavigate();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const user = JSON.parse(localStorage.getItem("user")) || [];

    useEffect(() => {
        // setLoading(true);
        refreshToken();
        setMainSheetType('Main');
        // !isLoggedIn && history('/')

    }, [isLoggedIn, history])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='MainContainer'>
            <div className='MainSubContainer'>
                {sections.length > 0 && Object.entries(user['permissions'] || []).map(perm => (perm[1])).map(each => (Object.hasOwn(each, 'todoPayments' || 'financialControl'))).includes(true) &&
                <FinancialWorksheetMain />}
                <TaskList setMainSheetType={undefined} />
            </div>
        </div>
    )
}

export default Main