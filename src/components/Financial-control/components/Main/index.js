import './styles.css'
import { List, ListSubheader } from '@mui/material';
import NestedList from '../Sidebar/NestedList';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Main = ({ setOpenSidebar }) => {
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];
    setOpenSidebar(true)
    return (
        <div className='FinancialWorksheetMainContainer'>
            <div className='Header'>
                {/* <h1>{lang.FinancialWorksheet}</h1> */}
            </div>
            <div className='SubContainer'>
                {/* <List
                    subheader={
                        <ListSubheader>
                            <h2>{lang.sections}</h2>
                        </ListSubheader>
                      }
                    >
                    {Array.from(sections).filter((section) => section.title !== 'TRASH').map((section, index) => (
                        <NestedList key={index} section={section} hideTitle={true} arrow={true} />
                    ))}
                </List> */}
            </div>
        </div>
    )
}

export default Main