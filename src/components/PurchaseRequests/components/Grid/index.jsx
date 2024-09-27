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
            <G.TableContent >
                <G.Table>
                    <G.Thead>
                        <G.Tr>
                            <G.Th>Data</G.Th>
                            <G.Th>Nome</G.Th>
                            <G.Th>Obra</G.Th>
                            <G.Th>Solicitante</G.Th>
                        </G.Tr>
                    </G.Thead>
                    <G.Tbody>
                        {/* {Array.from(itens)?.map((item, index) => (
                            <GridItem key={item._id || index} item={item} index={index} updateDocument={updateDocument} sheetType={sheetType} rawData={rawData} setUndoItem={setUndoItem} checked={checked} setChecked={setChecked} setOperationType={setOperationType} filter={filter} handleOpenSnackbar={handleOpenSnackbar} />
                        ))} */}
                    </G.Tbody>
                </G.Table>
            </G.TableContent>
        </>)
}

export default Header

