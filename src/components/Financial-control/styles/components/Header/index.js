import React from 'react';
import * as C from './styles';
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Header = ({ add, setAdd }) => {
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];
    return (
        <C.Container>
            <C.Header>
                <C.Title>{section ? section.name : ''}</C.Title>
            </C.Header>
            <C.Buttons>
            <IconButton>
                {!add ? <AddCircleIcon fontSize='large' onClick={() => setAdd(!add)} />
                     : <RemoveCircleIcon fontSize='large' onClick={() => setAdd(!add)} />}
            </IconButton>
            <IconButton>
                <InfoOutlinedIcon fontSize='large'/>
            </IconButton>
            </C.Buttons>
        </C.Container>
    );
};
 
export default Header;