import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const AlertDialog = ({
  open,
  title,
  message,
  width = 470,
  cancel,
  submit,
  labelSubmit,
  labelCancel
}) => {
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent sx={{ width: width }}>
        <DialogContentText id='alert-dialog-description'>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
  {submit && (
    <Button 
      onClick={submit} 
      variant='contained'
      sx={{ 
        backgroundColor: '#4a6cf7',
        '&:hover': { 
          backgroundColor: '#3a5be5' 
        }
      }}
      size='small' 
      autoFocus
    >
      {labelSubmit}
    </Button>
  )}
  {cancel && (
    <Button 
      onClick={cancel} 
      variant='contained' 
      sx={{ 
        backgroundColor: '#9e9e9e', 
        color: 'white',
        '&:hover': { 
          backgroundColor: '#7e7e7e' 
        }
      }}
      size='small'
    >
      {labelCancel}
    </Button>
  )}
</DialogActions>
    </Dialog>
  );
};

export default AlertDialog;