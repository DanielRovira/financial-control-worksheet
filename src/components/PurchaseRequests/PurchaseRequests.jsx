import './styles.css'
// import { List, ListSubheader } from '@mui/material';
import Grid from './components/Grid';
import Header from './components/Header';
import EmpityFolder from '../Financial-control/components/EmpityFolder'
import { useEffect } from 'react';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`)

const PurchaseRequests = ({ mainSheetType, setMainSheetType }) => {
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];

    
    useEffect(() => {
        setMainSheetType('PurchaseRequests');
    }, [setMainSheetType]);

    return (
        <div className='PurchaseRequests'>
            <div className='PurchaseRequestsSub'>
                <Header mainSheetType={mainSheetType} />
                <Grid />
                <EmpityFolder />
            </div>
        </div>
    )
}

export default PurchaseRequests