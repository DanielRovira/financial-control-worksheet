import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { languageAtom } from 'components/global';

export default function SimpleSnackbar({ openSnackbar, setOpenSnackbar, undoItem, setUndoItem, updateDocument, handleEditSelected, operationType, setOperationType, getDataTimeout }) {
  const language = useAtomValue(languageAtom)
  const lang = require(`components/Languages/${language}.json`);
    const history = useNavigate();
    const timeOut = 7000
    const [message, setMessage] = useState();

  const handleClose = () => {
    setOpenSnackbar(false);
    setUndoItem([]);
    setOperationType()
  };

  const handleUndo = () => {
    setTimeout(() => {
        handleEditSelected('undo')
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
        onClick={() => {getDataTimeout(1); handleClose()}}
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