import * as H from '../../../Financial-control/components/Header/styles';
// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { AddCircle as AddCircleIcon,
    Delete as DeleteIcon,
    DriveFileMove as DriveFileMoveIcon,
    RemoveCircle as RemoveCircleIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ mainSheetType, add, setAdd, handleDeleteSelected }) => {
    // const params = useParams();
    // const sections = JSON.parse(localStorage.getItem("sections")) || [];
    // let section = sections.filter((sec) => sec.title === params.taskTitle)[0];


    return (
        <>
            <H.Header style={{display:'flex', flexDirection:'row'}}>
                <H.Title>{lang[mainSheetType]}</H.Title>
            </H.Header>
            <H.Container>
                <H.Buttons className='leftButtons'>
                    <Button
                        onClick={() => setAdd(!add)}
                        variant="contained" size="small" disableElevation>
                        {!add ? <AddCircleIcon/>
                              : <RemoveCircleIcon/>}
                        <p>{lang.add}</p>
                    </Button>
                    <IconButton onClick={handleDeleteSelected}>
                        <DeleteIcon/>
                        <p>{lang.remove}</p>
                    </IconButton>
                    <IconButton 
                        // onClick={(event) => handleClick(event, "move-menu")}
                        // disabled={disabled}
                    >
                        <DriveFileMoveIcon/>
                        <p>{lang.move}</p>
                    </IconButton>
                </H.Buttons>
            </H.Container>
        </>)
}

export default Header

