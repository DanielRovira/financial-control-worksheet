// import './styles.css'
// import { List, ListSubheader } from '@mui/material';
// import NestedList from '../Sidebar/NestedList';
import { useEffect } from 'react';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`)

const PurchaseRequests = ({ setMainSheetType }) => {
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];

    
    useEffect(() => {
        setMainSheetType('PurchaseRequests');
    }, [setMainSheetType]);

    return (
        <div className=''>
            <div className=''>
                <h1>{lang.PurchaseRequests}</h1>
            </div>
            <div className=''>
            </div>
        </div>
    )
}

export default PurchaseRequests