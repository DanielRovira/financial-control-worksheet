import React from 'react';
import './styles/Settings.css'
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider, IconButton, List, ListItem, ListItemText, ListSubheader, TextField } from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Settings = ({ setSheetType, getSections, getCategories }) => {
    // const history = useNavigate();
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const CategoriesListItem = new Set(Array.from(categories)?.map((item) => item.type));
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState();

    function insertDocument(transaction) {
        categories.push(transaction)
        fetch(`/api/${process.env.REACT_APP_DB}/add/categories`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        .then(() => {getSections(); getCategories()})
    }

    function deleteDocument(item) {
        fetch(`/api/${process.env.REACT_APP_DB}/delete/categories`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        .then(() => {getSections(); getCategories()})
    }

    const transaction = {
            name: value,
            type: showInput,
    }

    const handleClick = (CategoriesListItem) => {
        setTimeout(() => {  
            setValue();
            setShowInput(CategoriesListItem);
        }, 10);
    }

    useEffect(() => {
        setSheetType('settings')
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const CategoriesList = ({ CategoriesListItem }) => {
       return (
            <List
                onMouseEnter={() => setShowAdd(CategoriesListItem)}
                onMouseLeave={() => setShowAdd(null)}
                subheader={
                    <ListSubheader sx={{ display: 'flex', justifyContent:'space-between'}}>
                        <h2>{lang[`${CategoriesListItem}`]}s</h2>
                        {showAdd === CategoriesListItem &&
                        <IconButton onMouseDown={() => handleClick(CategoriesListItem)}>
                            <AddCircleIcon />
                        </IconButton>}
                    </ListSubheader>
                }
            >
                {showInput === CategoriesListItem &&
                    <ListItem dense >
                        <TextField
                            autoFocus
                            value={value}
                            size="small"
                            variant="standard"
                            margin="none"
                            placeholder={`${lang.add} ${lang[CategoriesListItem]}`}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={() => {value && insertDocument(transaction); setShowInput(); setValue()}}
                            onKeyDown={event => { if (event.key === 'Enter') {value && insertDocument(transaction); setShowInput(); setValue()}}}
                        />
                    </ListItem>}
                {Array.from(categories).filter((item) => item.type === CategoriesListItem).map((section, index) => (
                    <ListItem dense 
                        key={section._id}
                        onMouseEnter={() => setShowRemove(section._id)}
                        onMouseLeave={() => setShowRemove(null)}
                    >
                        <ListItemText
                            primary={section.name}
                        />
                        {showRemove === section._id && 
                        <IconButton onMouseDown={() => deleteDocument(section)}>
                            <RemoveCircleIcon />
                        </IconButton>}
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <div className='SettingsContainer'>
            <div className='SettingsSubContainer'>
                {Array.from(CategoriesListItem).map((item, index) => (
                    <React.Fragment key={`${index}${item}`}>
                        <CategoriesList CategoriesListItem={item} key={`${item}${index}`} />
                        {index !== (CategoriesListItem.size - 1) && <Divider orientation="vertical" />}
                    </React.Fragment>
                ))}
                
            </div>
        </div>
    )
}

export default Settings