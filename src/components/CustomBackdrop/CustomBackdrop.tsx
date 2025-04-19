
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface CustomBackdropProps {
  open: boolean;
}

export default function CustomBackdrop({ open }: CustomBackdropProps) {
  return (
    <div>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
          zIndex: '999999',
          backgroundColor: 'rgba(0, 0, 0, 0.6)'
        })}
        open={open}
      >
        <CircularProgress size={64} />
      </Backdrop>
    </div>
  );
}
