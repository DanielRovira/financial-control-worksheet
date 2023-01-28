import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({ openSnackbar, setOpenSnackbar, undoItem, setUndoItem, updateDocument, handleDeleteSelected, operationType, setOperationType, handleSetArchived }) {
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
    operationType === 'archive' && handleSetArchived()
    operationType === 'duplicate' && handleDeleteSelected('undoDuplicate')
    setOpenSnackbar(false);
    setOperationType()
    setUndoItem([])
  };

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