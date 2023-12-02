import './styles/Main.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import { List, ListSubheader } from '@mui/material';
// import NestedList from './NestedList';
import TaskList from '../TaskList/TaskList';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Main = ({ sections, refreshToken, isLoggedIn, setMainSheetType, setLoading }) => {
    const history = useNavigate();
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const user = JSON.parse(localStorage.getItem("user")) || [];

    useEffect(() => {
        // setLoading(true);
        refreshToken();
        setMainSheetType('Main');
        // !isLoggedIn && history('/')
    }, [isLoggedIn, history])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className='MainContainer'>
            <div className='Header'>
                <h1>{lang.welcome} {user.name}!</h1>
            </div>
            <div className='SubContainer'>
                <TaskList setMainSheetType={setMainSheetType} />
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