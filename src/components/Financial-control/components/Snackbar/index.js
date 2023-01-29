import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const lang = require(`../../../Languages/${process.env.REACT_APP_LANG}.json`)

export default function SimpleSnackbar({ timeOut, openSnackbar, setOpenSnackbar, undoItem, setUndoItem, updateDocument, handleDeleteSelected, operationType, setOperationType, handleSetArchived }) {
    const history = useNavigate();

    const [message, setMessage] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setUndoItem([]);
    setOperationType()
  };

  const handleUndo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    console.log(undoItem)
    setTimeout(() => {
        operationType === 'update' && updateDocument(undoItem[0], true)
        operationType === 'archive' && handleSetArchived('undo')
        operationType === 'remove' && handleDeleteSelected('undo')
        operationType === 'add' && handleDeleteSelected('add')
        setOpenSnackbar(false);
        setOperationType()
        // setUndoItem([])
    }, 500);
  };

  useEffect(() => {
    return () => {
        handleClose()
    };
  }, [history]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    switch (operationType) {
        case 'update':
            setMessage('Item modificado')
            break;
        case 'remove':
            setMessage('Item deletado')
            break;
        case 'archive':
            setMessage('Item arquivado')
            break;
        case 'add':
            setMessage('Item adicionado')
            break;
    
        default:
            break;
    }
  }, [operationType]);

  const action = (
    <>
      <Button size="small" onClick={handleUndo}>
        {lang.undo}
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        sx={{marginLeft: '10px'}}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={timeOut}
        resumeHideDuration={1000}
        onClose={handleClose}
        message={message}
        action={action}
        />
    </div>
  );
}