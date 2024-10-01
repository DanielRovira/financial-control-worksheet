import './index.css'
import { useState } from 'react';

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
    const [selectedCostCentre, setSelectedCostCentre] = useState()
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
    const [userPermissions, setUserPermissions] = useState(dataexemple)

    const options = [
        <MenuItem key={'None'} value={false}>None</MenuItem>,
        <MenuItem key={'View'} value={"view"}>View</MenuItem>,
        <MenuItem key={'Edit'} value={"edit"}>Edit</MenuItem>
    ]

    const handleChange = (event) => {
        setUserPermissions((prev) => ({...prev, [selectedCostCentre]: {...prev[selectedCostCentre], [event.target.name]: event.target.value}}))
    };

    const bgColor = (section) => {
        if (!userPermissions[section.title]?.todoPayments && !userPermissions[section.title]?.financialControl && !userPermissions[section.title]?.purchases)  
            return "unset"
        else if (userPermissions[section.title]?.todoPayments === 'edit' || userPermissions[section.title]?.financialControl === 'edit' || userPermissions[section.title]?.purchases === 'edit' )
            return "blue"
    }

    return (
        <>
            <div className='UsersContainer' >
                <div className='usersList' >
                    <div>
                        <h2>Lista de Usuários</h2>
                        <List>
                            <ListItemButton
                                // secondaryAction={
                                //     <IconButton edge="end" aria-label="delete">
                                //         <DeleteIcon />
                                //     </IconButton>
                                // }
                            >   
                                <ListItemAvatar>
                                    <Avatar>
                                        <FolderIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    // secondary={secondary ? 'Secondary text' : null}
                                />
                            </ListItemButton>
                        </List>
                    </div>
                </div>
                <div className='userPage' >
                    <h2>Informações do Usuários</h2>
                    <div className='userInfoPage' >
                        <TextField defaultValue={user.name} label={lang.name} variant="standard" />
                        <TextField defaultValue={user.email} label={lang.email} variant="standard" disabled InputProps={{ disableUnderline: true }}/>
                        {/* <TextField  label={lang.address} variant="standard" /> */}
                        {/* <TextField  label={lang.phone} variant="standard" /> */}
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
                                        <Select onChange={handleChange} name="financialControl" value={userPermissions[selectedCostCentre]?.financialControl || false} children={options} />
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <h3>Pagamentos a Fazer</h3>
                                        <Select onChange={handleChange} name="todoPayments" value={userPermissions[selectedCostCentre]?.todoPayments || false} children={options} />
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <h3>Compras</h3>
                                        <Select onChange={handleChange} name="purchases" value={userPermissions[selectedCostCentre]?.purchases || false} children={options} />
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default Users