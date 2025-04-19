import { Box } from '@mui/material';
import { NMSRefreshIcon } from 'src/assets/svg/svg';

interface ButtonInterface {
  isEnabled?: boolean;
}

const RefreshButton: React.FC<ButtonInterface> = ({ isEnabled = false }) => {
  return (
    <Box
      p={1}
      display={'flex'}
      alignItems={'center'}
      sx={{
        background: !isEnabled ? '#fff' : '#f5f5f5', 
        cursor: !isEnabled ? 'pointer' : 'not-allowed', 
        borderRadius: '50%',
        border: !isEnabled ? '1px solid transparent' : '1px solid #ccc', 
        transition: 'border-color 0.4s ease',
        opacity: !isEnabled ? 1 : 0.6, 
        '&:hover': {
          border: !isEnabled ? '1px solid #000' : '1px solid #ccc', 
        },
        // Use a disabled state style without disabling pointer events
        pointerEvents: isEnabled ? 'auto' : 'auto', // Keep pointer events active to allow cursor styles
      }}
    >
      <NMSRefreshIcon />
    </Box>
  );
};

export default RefreshButton;
