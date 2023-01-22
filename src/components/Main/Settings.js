import './styles/Settings.css'
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Divider, IconButton, List, ListItem, ListItemText, ListSubheader, TextField } from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Settings = ({ sheetType, setSheetType }) => {
    // const history = useNavigate();
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const CategoriesListItem = new Set(categories.map((item) => item.type))
    const [showAdd, setShowAdd] = useState(false)
    const [showRemove, setShowRemove] = useState(false)
    const [showInput, setShowInput] = useState(false)

    function insertDocument(transaction) {
        fetch(`/api/${process.env.REACT_APP_DB}/add/`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(transaction)
        })
        .then(response => response.json())
        // .then(() => getData())
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
                        <IconButton onClick={() => setShowInput(CategoriesListItem)}>
                            <AddCircleIcon />
                        </IconButton>}
                    </ListSubheader>
                }
            >
                {showInput === CategoriesListItem &&
                    <ListItem dense >
                    <TextField
                        autoFocus
                        size="small"
                        variant="standard"
                        margin="none"
                        placeholder={`${lang.add} ${lang[CategoriesListItem]}`}
                        onBlur={() => setShowInput()}
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
                        <IconButton>
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
                    <>
                        <CategoriesList CategoriesListItem={item} />
                        {index !== (CategoriesListItem.size - 1) && <Divider orientation="vertical" />}
                    </>
                ))}
                
            </div>
        </div>
    )
}

export default Settings