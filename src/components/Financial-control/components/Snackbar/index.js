import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({ openSnackbar, setOpenSnackbar, undoItem, setUndoItem, updateDocument, handleDeleteSelected }) {
    const timeOut = 5000

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setUndoItem([]);
  };

  const handleUndo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    undoItem.length === 1 ? updateDocument(undoItem[0]) : handleDeleteSelected('undo');
    // console.log(undoItem.length)
    setOpenSnackbar(false);
    // setUndoItem([]);
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