// import './styles.css'
// import { List, ListSubheader } from '@mui/material';
// import NestedList from '../Sidebar/NestedList';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`)

const Contacts = () => {
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];
    return (
        <div className=''>
            <div className=''>
                <h1>{lang.FinancialWorksheet}</h1>
            </div>
            <div className=''>
            </div>
        </div>
    )
}

export default Contacts