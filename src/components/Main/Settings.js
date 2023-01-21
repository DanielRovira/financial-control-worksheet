import './styles/Main.css'
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NestedList from './NestedList';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

function Settings ({  }) {
    const history = useNavigate();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];


    return (
        <div className='MainContainer'>
            <List
                subheader={
                    <ListSubheader>
                        <h2>{lang.costCenter}</h2>
                    </ListSubheader>
                  }
                >
                {Array.from(sections).map((section, index) => (
                    <NestedList key={index} section={section} hideTitle={true} arrow={true} />
                ))}
            </List>
        </div>
    )
}

export default Main