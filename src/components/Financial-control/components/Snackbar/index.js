import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function SimpleSnackbar({ openSnackbar, setOpenSnackbar, undoItem, setUndoItem, updateDocument, handleDeleteSelected, operationType, setOperationType, handleSetArchived }) {
    const history = useNavigate();
    const timeOut = 6000

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
    operationType === 'update' && updateDocument(undoItem[0], true)
    operationType === 'remove' && handleDeleteSelected('undo')
    operationType === 'archive' && handleSetArchived('archive')
    operationType === 'add' && handleDeleteSelected('undoDuplicate')
    setOpenSnackbar(false);
    setOperationType()
    setUndoItem([])
  };

  useEffect(() => {
    return () => {
        handleClose()
    };
  }, [history]);

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleUndo}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
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
        onClose={handleClose}
        message="Note archived"
        action={action}
        />
    </div>
  );
}