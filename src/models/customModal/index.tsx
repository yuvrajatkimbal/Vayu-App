import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CommonButton from 'src/components/Button';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

export const CustomPopUpModal = ({
  setOpen,
  open,
  handleClose,
  handleApply,
  title,
  isApply,
  buttonText,
  children
}) => {
  const theme = useTheme();
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"  
        fullWidth={true} 
        aria-labelledby="responsive-dialog-title"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 0   
          }
        }}
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
        <DialogActions>
       <Box display={"flex"} mx={1} mb={1}>

      
          <Box mx={1} >
            <CommonButton
              sx={{
                background: theme.colors.alpha.grey[100],
                color: theme.colors.alpha.black[100],
                border: `1px solid ${theme.colors.alpha.black[100]}`,
                fontSize: '16px',
                fontWeight: '500'
              }}
              size={'small'}
              variant={'outlined'}
              onClick={handleClose}
            >
              Close
            </CommonButton>
          </Box>
          <Box mx={1}>
            {isApply && (
              <CommonButton
                sx={{
                  background: theme.colors.alpha.secondary[100],
                  // cursor: isDisabled ? 'not-allowed !important' : 'pointer',
                  color: theme.colors.alpha.black[100],
                  border: `1px solid ${theme.colors.alpha.black[100]}`,
                  fontSize: '16px',
                  fontWeight: '500'
                }}
                size={'small'}
                variant={'outlined'}
                onClick={handleApply}
              >
                {buttonText}
              </CommonButton>
            )}
          </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};
