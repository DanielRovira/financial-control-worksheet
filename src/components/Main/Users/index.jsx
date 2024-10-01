import './index.css'
import { useEffect, useState } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
// import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const lang = require(`../../Languages/${process.env.REACT_APP_LANG}.json`);

const Users = () => {
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    const user = JSON.parse(localStorage.getItem("user")) || [];
    const [usersList, setUsersList] = useState([])
    const [selectedCostCentre, setSelectedCostCentre] = useState()
    const [selectedUser, setSelectedUser] = useState()
    const dataexemple = {
        "BREJO": {
                 purchases: "edit",
                 financialControl: "view",
                 todoPayments: false
                 },
        "TEST": {
                purchases: "view",
                financialControl: false,
                todoPayments: false
                }
        
    }
    const [userPermissions, setUserPermissions] = useState({})
    const permissions = selectedUser?.permissions || {}
    const getSections = async () => {
        await fetch(`/api/getUsersList`, { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        // .then(response => localStorage.setItem('sections', JSON.stringify(response.sort((a, b) => a.name.localeCompare(b.name)))))
        // .then(() => setSections(JSON.parse(localStorage.getItem("sections")) || []))
        .then(response => setUsersList(response.users))
    }

    const options = [
        <MenuItem key={'None'} value={false}>None</MenuItem>,
        <MenuItem key={'View'} value={"view"}>View</MenuItem>,
        <MenuItem key={'Edit'} value={"edit"}>Edit</MenuItem>
    ]

    const handleChange = (event) => {
        setUserPermissions((prev) => ({...prev, [selectedCostCentre]: {...prev[selectedCostCentre], [event.target.name]: event.target.value}}))
       
    };

    const bgColor = (section) => {
        if (!permissions[section.title]?.todoPayments && !permissions[section.title]?.financialControl && !permissions[section.title]?.purchases)  
            return "unset"
        else if (permissions[section.title]?.todoPayments === 'edit' || permissions[section.title]?.financialControl === 'edit' || permissions[section.title]?.purchases === 'edit' )
            return "blue"
    }

    useEffect(() => {
        getSections()
    }, []);

    return (
        <>
            <div className='UsersContainer' >
                <div className='usersList' >
                    <div>
                        <h2>Lista de Usuários</h2>
                        <List>
                            {Array.from(usersList).filter(item => item.email !== user.email).map((item, index) => 
                                <ListItemButton key={index} onClick={() => setSelectedUser(item)}>   
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.name}
                                    />
                                </ListItemButton>
                            )
                            }
                        </List>
                    </div>
                </div>
                <div className='userPage' >
                    {selectedUser &&
                    <div className='userSubPage' >
                        <h2>Informações do Usuários</h2>
                        <div className='userInfoPage' >
                            <TextField value={selectedUser?.name} label={lang.name} variant="standard" />
                            <TextField value={selectedUser?.email} label={lang.email} variant="standard" disabled InputProps={{ disableUnderline: true }}/>
                        </div>
                        <div  className='authorizationsContainer' >
                            <h2>Autorizações do Usuários</h2>
                            <div className='authorizationsSubContainer' >
                                <div>
                                    <h2>Centros de custo</h2>
                                    <List>
                                    {Array.from(sections).map((section, index) => 
                                        <ListItemButton
                                        key={index}
                                            onClick={() => setSelectedCostCentre(section.title)}
                                            selected={section.title===selectedCostCentre}
                                            >   
                                            <ListItemAvatar>
                                                <Avatar sx={{bgcolor: bgColor(section)}}>
                                                    <FolderIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={section.name}/>
                                        </ListItemButton>
                                    )}
                                    </List>
                                </div>
                                <div>
                                    <h2>Permissões</h2>
                                    {selectedCostCentre &&
                                        <div>
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <h3>Fluxo de Caixa</h3>
                                            <Select onChange={handleChange} name="financialControl" value={permissions[selectedCostCentre]?.financialControl || false} children={options} />
                                        </div>
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <h3>Pagamentos a Fazer</h3>
                                            <Select onChange={handleChange} name="todoPayments" value={permissions[selectedCostCentre]?.todoPayments || false} children={options} />
                                        </div>
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <h3>Compras</h3>
                                            <Select onChange={handleChange} name="purchases" value={permissions[selectedCostCentre]?.purchases || false} children={options} />
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        
        </>
    )
}

export default Users