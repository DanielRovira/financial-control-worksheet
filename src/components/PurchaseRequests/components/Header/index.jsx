import * as H from '../../../Financial-control/components/Header/styles';
import * as G from '../../../Financial-control/components/Grid/styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Divider, IconButton, Tooltip, ListItemIcon, Menu, MenuItem  } from '@mui/material';
import { AddCircle as AddCircleIcon,
    Archive as ArchiveIcon,
    ArchiveOutlined as ArchiveOutlinedIcon,
    CalendarMonth as CalendarMonthIcon,
    CreditScore as CreditScoreIcon,
    Delete as DeleteIcon,
    DeleteForever as DeleteForeverIcon,
    Difference as DifferenceIcon,
    Download as DownloadIcon,
    DriveFileMove as DriveFileMoveIcon,
    Folder as FolderIcon,
    InfoOutlined as InfoOutlinedIcon,
    MoreVert as MoreVertIcon,
    Menu as MenuIcon,
    RemoveCircle as RemoveCircleIcon,
    RestoreFromTrash  as RestoreFromTrashIcon,
    Unarchive as UnarchiveIcon,
    UnarchiveOutlined as UnarchiveOutlinedIcon } from '@mui/icons-material';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

const Header = ({ mainSheetType }) => {
    const params = useParams();
    const sections = JSON.parse(localStorage.getItem("sections")) || [];
    let section = sections.filter((sec) => sec.title === params.taskTitle)[0];


    return (
        <>
            <H.Header style={{display:'flex', flexDirection:'row'}}>
                <H.Title>{lang[mainSheetType]}</H.Title>
            </H.Header>
            <H.Container>
                <H.Buttons className='leftButtons'>
                    <Button   variant="contained" size="small" disableElevation>
                        <AddCircleIcon/>
                        <p>{lang.add}</p>
                    </Button>
                    <IconButton>
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

