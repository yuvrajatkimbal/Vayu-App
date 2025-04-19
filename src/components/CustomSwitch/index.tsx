import { styled, Switch } from '@mui/material';

export const CustomSwitch = styled(Switch)(({ theme, checked, disabled }) => ({
  width: 50,
  height: 35,
  padding: 7,
  cursor: disabled ? 'not-allowed' : 'pointer',  
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        backgroundColor: '#000', // Black background when switch is on
        opacity: 1,
        border: 'none'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: checked
      ? `${
          disabled
            ? theme.colors.alpha.grey[100]
            : theme.colors.alpha.secondary[100]
        } !important`
      : `${
          disabled
            ? theme.colors.alpha.grey[100]
            : theme.colors.alpha.danger[100]
        } !important`, // Green if true, red if false
    width: 20,
    height: 20.5,
    marginTop: 6,
    borderRadius: 0, // Removes the default round shape, making it square
    '&:before': {
    
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundImage: 'none'
    }
  },
  '& .MuiSwitch-track': {
    borderRadius: 0,
    backgroundColor: '#000', // Black background when switch is off
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));
