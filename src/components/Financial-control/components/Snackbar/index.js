import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar({ openSnackbar, setOpenSnackbar, undoItem, updateDocument }) {
    const timeOut = 5000

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleUndo = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    updateDocument(undoItem)
    setOpenSnackbar(false);
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