import './styles/Main.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { List, ListSubheader } from '@mui/material';
// import NestedList from './NestedList';
import TaskList from '../TaskList/TaskList';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Main = ({ sections, refreshToken, isLoggedIn, setSheetType, setLoading }) => {
    const history = useNavigate();
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];

    useEffect(() => {
        // setLoading(true);
        refreshToken();
        setSheetType('');
        // !isLoggedIn && history('/')
    }, [isLoggedIn, history])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='MainContainer'>
            <div className='Header'>
                <h1>{lang.welcome}</h1>
            </div>
            <div className='SubContainer'>
                <TaskList/>
            </div>
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
    )
}

export default Main