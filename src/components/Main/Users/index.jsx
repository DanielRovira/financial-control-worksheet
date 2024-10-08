import './index.css'
import { useEffect, useState, useRef } from 'react';
import { Avatar, List, ListItemButton, ListItemAvatar, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useAtomValue } from 'jotai';
import { languageAtom, stringToColor } from 'components/global';

const Users = () => {
    const language = useAtomValue(languageAtom);
    const lang = require(`components/Languages/${language}.json`);
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    // const user = JSON.parse(localStorage.getItem("user")) || [];
    const [usersList, setUsersList] = useState([])
    const [selectedUser, setSelectedUser] = useState()
    const [selectedUserIndex, setSelectedUserIndex] = useState()
    const [selectedUserId, setSelectedUserId] = useState()
    const [selectedCostCentre, setSelectedCostCentre] = useState()
    const permissionsArray = usersList?.[selectedUserIndex]?.permissions || {}
    const selectedPermissionsArray = permissionsArray[selectedCostCentre] || {}
    const timer = useRef(null);

    // const permissions = usersList[usersList.indexOf(selectedUser)]?.permissions || {}
    const getUsersList = async () => {
        await fetch(`/api/users/get`, { method: 'GET', credentials: 'include' })
        .then(response => response.json())
        .then(response => setUsersList(response.users?.sort((a, b) => a.name.localeCompare(b.name))))
    }

    function updateDocument(item, userID) {
        // setSyncing(true);
        fetch(`/api/users/update/${userID}`,
        {
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(item)
        })
        // .then(response => response.json())
        // .then(response => last && response.status === 200 && setSyncing(false))
        // .then(() => update && getDataTimeout(time))
        .catch(console.error)
    }

    const options = [
        <MenuItem key={'None'} value={false}>None</MenuItem>,
        <MenuItem key={'View'} value={"view"}>View</MenuItem>,
        <MenuItem key={'Edit'} value={"edit"}>Edit</MenuItem>
    ]

    const handleChange = (event) => {
        // setUserPermissions((prev) => ({...prev, [selectedCostCentre]: {...prev[selectedCostCentre], [event.target.name]: event.target.value}}))
        

        setUsersList((prev) => (
            [...prev?.filter((item, index) => index !== selectedUserIndex),
                 {
                    ...prev[selectedUserIndex],
                    "permissions": {
                        ...prev[selectedUserIndex]?.["permissions"],
                        [selectedCostCentre]: {
                            ...prev[selectedUserIndex]?.["permissions"]?.[selectedCostCentre],
                            [event.target.name]: event.target.value
                        }
                    }   
                }
            ]
        ).sort((a, b) => a.name.localeCompare(b.name)))

        // updateDocument({_id: selectedUserId, permissions: {...permissionsArray, [selectedCostCentre]: {...selectedPermissionsArray, [event.target.name]: event.target.value } }}, selectedUserId)
        let newData = {_id: selectedUserId, permissions: {...permissionsArray, [selectedCostCentre]: {...selectedPermissionsArray, [event.target.name]: event.target.value } }}
        
        function removeEmpty(obj) {
            return Object.fromEntries(
              Object.entries(obj)
                .filter(([_, v]) => v !== false && Object.entries(v).length !== 0)
                .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
            );
        }

        updateDocument(removeEmpty(removeEmpty(newData)), selectedUserId)

        getDataTimeout()
    };

    const getDataTimeout = () => {
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            getUsersList()
        }, 200);
    }

    const bgColor = (section) => {
        if (!permissionsArray[section.title]?.todoPayments && !permissionsArray[section.title]?.financialControl && !permissionsArray[section.title]?.purchases)  
            return "unset"
        else if (permissionsArray[section.title]?.todoPayments === 'edit' || permissionsArray[section.title]?.financialControl === 'edit' || permissionsArray[section.title]?.purchases === 'edit' )
            return "blue"
    }

    useEffect(() => {
        getUsersList()
    }, []);

    return (
        <>
            <div className='UsersContainer' >
                <div className='usersList' >
                    <div>
                        <h2>Lista de Usuários</h2>
                        <List>
                            {Array.from(usersList || []).map((item, index) => 
                                <ListItemButton key={index} onClick={() => {setSelectedUser(item); setSelectedUserIndex(index); setSelectedUserId(item._id)}} selected={index===selectedUserIndex}>   
                                    <ListItemAvatar>
                                        <Avatar children={item.name[0]} sx={{backgroundColor: stringToColor(item.name)}} />
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
                                            <Select onChange={handleChange} name="financialControl" value={selectedPermissionsArray?.financialControl || false} children={options} />
                                        </div>
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <h3>Pagamentos a Fazer</h3>
                                            <Select onChange={handleChange} name="todoPayments" value={selectedPermissionsArray?.todoPayments || false} children={options} />
                                        </div>
                                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                            <h3>Compras</h3>
                                            <Select onChange={handleChange} name="purchases" value={selectedPermissionsArray?.purchases || false} children={options} />
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