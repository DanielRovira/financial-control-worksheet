import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NestedList from './NestedList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

function Main({ isLoggedIn }) {
    const history = useNavigate();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    useEffect(() => {
        !isLoggedIn && history('/')
    }, [isLoggedIn])  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ display: 'grid', justifyContent: 'center', rowGap: '30px', paddingTop: '50px' }}>
            <List
                  sx={{ width: '300px', maxWidth: 360, bgcolor: 'background.paper' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader" style={{ color: 'black', textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>
                        {lang.costCenter}
                    </ListSubheader>
                  }
                >
                {Array.from(sections).map((section, index) => (
                    <NestedList key={index} section={section} hideTitle={true} />
                ))}
            </List>
        </div>
    )
}

export default Main