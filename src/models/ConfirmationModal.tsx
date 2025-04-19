import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography
} from '@mui/material';
import { Breakpoints, Theme as MuiTheme, useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

interface Theme extends MuiTheme {
  breakpoints: Breakpoints;
}

const BootstrapDialog = styled(Dialog)(({ theme }: { theme: Theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root': {
    [theme.breakpoints.up('md')]: {
      width: '33%' // Adjust the width for small screens and above
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%' // Adjust the width for extra small screens
    },
    maxWidth: 'none' // Remove the maximum width limit
  }
}));

interface ConfirmationModalProps {
  confirmModalOpen?: boolean;
  setConfirmModalOpen?: (open: boolean) => void;
  handleModalSubmit?: () => void;
  setAnchorEl?: (open: boolean) => void;
  loading?: boolean;
  description?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  confirmModalOpen,
  setConfirmModalOpen,
  handleModalSubmit,
  description,
  loading,
  setAnchorEl
}) => {
  const theme = useTheme();

  return (
    <Box>
      <BootstrapDialog
        maxWidth="md"
        aria-labelledby="customized-dialog-title"
        open={confirmModalOpen}
        theme={theme}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          id="customized-dialog-title"
          className="modal-header-style"
        >
          <Typography variant="h6">Confirmation</Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              setConfirmModalOpen(false);
              setAnchorEl(null);
            }}
            sx={{ color: theme.colors.alpha.trueWhite[100] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ paddingY: '20px' }} gutterBottom>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setConfirmModalOpen(false);
              setAnchorEl(null);
            }}
            sx={{
              border: `1px solid ${theme.colors.borderColor.light}`,
              width: theme.spacing(10),
              height: theme.spacing(4),
              marginY: theme.spacing(1),
              '&:hover': {
                color: '#1773BE' // Replace 'desiredHoverColor' with the color you want, e.g., 'red' or '#ff0000'
              }
            }}
          >
            Close
          </Button>

          <Button
            variant="contained"
            onClick={handleModalSubmit}
            color="secondary"
            sx={{
              width: theme.spacing(10),
              height: theme.spacing(4),
              marginY: theme.spacing(1)
            }}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              '  Save'
            )}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default ConfirmationModal;
