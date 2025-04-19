import { Box, styled, Typography } from '@mui/material';

export const IconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  borderRadius: '50%',
  border: '1px solid transparent', // Transparent border initially
  transition: theme.transitions.create(['border-color', 'transform'], {
    duration: 600,
    easing: theme.transitions.easing.easeInOut
  }),
  '& svg': {
    transition: theme.transitions.create('transform', {
      duration: 600,
      easing: theme.transitions.easing.easeInOut
    })
  }
}));

export const StyledTypography = styled(Typography)({
    // paddingTop: '6px',
    '&.f-18_400': {
      fontSize: '18px',
      fontWeight: 400
    },
    '&.f-30_700': {
      fontSize: '30px',
      fontWeight: 700
    }
  });
