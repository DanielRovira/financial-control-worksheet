import './styles/Main.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { List, ListSubheader } from '@mui/material';
// import NestedList from './NestedList';
import TaskList from '../TaskList/TaskList';
// const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);
import FinancialWorksheetMain from '../Financial-control/components/Main'

const Main = ({ sections, refreshToken, isLoggedIn, setMainSheetType, setLoading }) => {
    const history = useNavigate();
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];
    // const user = JSON.parse(localStorage.getItem("user")) || [];

    useEffect(() => {
        // setLoading(true);
        refreshToken();
        setMainSheetType('Main');
        // !isLoggedIn && history('/')

        // history('/FinancialWorksheet')  //Enquanto não faz a pagina inicial

    }, [isLoggedIn, history])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='MainContainer'>
            <div className='SubContainer'>
                <FinancialWorksheetMain />
                <TaskList setMainSheetType={undefined} />
            </div>
        </div>
    )
}

export default Main