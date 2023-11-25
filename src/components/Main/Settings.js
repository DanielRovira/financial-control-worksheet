import React from 'react';
import './styles/Settings.css'
import Signup from './Signup';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IconButton, List, ListItem, ListItemText, ListSubheader, TextField, Tabs, Tab } from '@mui/material';
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
const lang = require(`../Languages/${process.env.REACT_APP_LANG}.json`);

const Settings = ({ categories, setCategories, sections, setSections, setSheetType, refreshToken }) => {
    // const history = useNavigate();
    // const [categories, setCategories] = useState(JSON.parse(localStorage.getItem("categories")) || []);
    // const [sections, setSections] = useState(JSON.parse(localStorage.getItem("sections")) || []);
    // const CategoriesListItem = new Set((Array.from(categories)?.map((item) => item.type)));
    const CategoriesListItem = ["source",  "category", "subCategory"];
    const [showAdd, setShowAdd] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState();
    const [tabValue, setTabValue] = useState(0);

    function insertDocument(transaction, CategoriesListItem) {
        let type = (CategoriesListItem === 'sections' ? 'sections' : 'categories');
        CategoriesListItem === 'sections'
        ? setSections((prev) => [...prev, transaction['sections']])
        : setCategories((prev) => [...prev, transaction['categories']]);
        fetch(`/api/${process.env.REACT_APP_DB}/add/${type}`,
        {
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(transaction[type])
        })
        .then(response => response.json())
        .then(() => {refreshToken()})
    }

    function deleteDocument(item, CategoriesListItem) {
        let type = (CategoriesListItem === 'sections' ? 'sections' : 'categories')
        setCategories((prev) => [...prev.filter((items) => items !== item)])
        setSections((prev) => [...prev.filter((items) => items !== item)])
        fetch(`/api/${process.env.REACT_APP_DB}/delete/${type}`,
        {
            method:'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        CategoriesListItem === 'sections' && refreshToken()
    }

    const transaction = {
        sections: {
            title: value?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase(),
            name: value?.toUpperCase().slice(0,1) + value?.slice(1),
        },
        categories: {
            type: showInput,
            name: value,
        }
    }

    const handleClick = (CategoriesListItem) => {
        setTimeout(() => {  
            setValue();
            setShowInput(CategoriesListItem);
        }, 10);
    }

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
      };

    useEffect(() => {
        setSheetType('settings');
        refreshToken();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setCategories(JSON.parse(localStorage.getItem("categories")))
    }, [localStorage.getItem("categories")])  // eslint-disable-line react-hooks/exhaustive-deps
    
    useEffect(() => {
        setSections(JSON.parse(localStorage.getItem("sections")))
    }, [localStorage.getItem("sections")])  // eslint-disable-line react-hooks/exhaustive-deps

    const CustomListItem = ({ section, index, CategoriesListItem }) => {
        return (
            <ListItem dense 
                key={index}
                onMouseEnter={() => setShowRemove(section._id)}
                onMouseLeave={() => setShowRemove()}
            >
                <ListItemText
                    primary={section.name}
                />
                {/* <IconButton onMouseDown={() => deleteDocument(section, CategoriesListItem)} sx={{visibility: showRemove === section._id ? 'auto' : 'hidden' }}> */}
                <IconButton onMouseDown={() => deleteDocument(section, CategoriesListItem)} sx={{opacity: showRemove === section._id ? '100%' : '20%' }}>
                    <RemoveCircleIcon />
                </IconButton>
            </ListItem>
        )
    }

    const CategoriesList = ({ CategoriesListItem }) => {
       return (
            <List
                onMouseEnter={() => {setShowAdd(CategoriesListItem); setShowRemove()}}
                onMouseLeave={() => setShowAdd()}
                subheader={
                    <ListSubheader sx={{ display: 'flex', justifyContent:'space-between'}}>
                        <h2>{lang[`${CategoriesListItem}`]}</h2>
                        {/* <IconButton onMouseDown={() => handleClick(CategoriesListItem)} sx={{visibility: showAdd === CategoriesListItem ? 'auto' : 'hidden' }}> */}
                        <IconButton onMouseDown={() => handleClick(CategoriesListItem)} sx={{opacity: showAdd === CategoriesListItem ? '100%' : '20%' }}>
                            <AddCircleIcon />
                        </IconButton>
                    </ListSubheader>
                }
            >
                {CategoriesListItem === 'sections'
                ? Array.from(sections).filter((section) => section.title !== 'TRASH').map((section, index) => (
                    <CustomListItem section={section} index={index} key={index} CategoriesListItem={CategoriesListItem} />
                ))
                : Array.from(categories).filter((item) => item.type === CategoriesListItem).map((section, index) => (
                    <CustomListItem section={section} index={index} key={index} CategoriesListItem={CategoriesListItem} />
                ))
                }
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
                            onBlur={() => {value && insertDocument(transaction, CategoriesListItem); setShowInput(); setValue()}}
                            onKeyDown={event => { if (event.key === 'Enter') {value && insertDocument(transaction, CategoriesListItem); setValue()}}}
                        />
                    </ListItem>}
            </List>
        )
    }

    return (
        <div className='SettingsContainer'
        onMouseEnter={() => {setShowAdd(); setShowRemove()}}
        onMouseLeave={() => {setShowAdd(); setShowRemove()}}
        >
            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile>
                    <Tab label={lang.sections} />
                    <Tab label={lang.category} />
                    <Tab label={lang.signup} />
            </Tabs>
            <div className='SettingsSubContainer'>
                {tabValue === 0 && (
                    <div className='SettingsCardContainer'>
                        <CategoriesList CategoriesListItem={'sections'}/>
                    </div>)}
                {tabValue === 1 && Array.from(CategoriesListItem).map((item, index) => (
                    <div className='SettingsCardContainer' key={`${index}${item}`}>
                        <CategoriesList CategoriesListItem={item}/>
                    </div>))} 
                {tabValue === 2 && (
                    <div className='SettingsCardContainer'>
                        <Signup/>
                    </div>  
                )}
            </div>
        </div>
    )
}

export default Settings