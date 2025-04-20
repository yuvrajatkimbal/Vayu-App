import { MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '10px 37px',
  color: '#000',
  margin: '0px',
  border: '1px solid #000',
  borderBottom: '0px solid #000',
  borderRadius: '0px',

  '&:first-child': {
    borderTop: '0px solid #000',
  },

  '&:last-child': {
    borderBottom: '1px solid #000',
  },

  '&:hover': {
    backgroundColor: '#5FCAE7',
    color: '#333',
    margin: '0px',
  },
}));

export const SATMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '10px 37px',
  color: '#000',
  margin: '0px',
  border: '1px solid #000',
  borderBottom: '0px solid #000',
  borderRadius: '0px',

  '&:first-child': {
    borderTop: '1px solid #000',
  },

  '&:last-of-type': {
    borderBottom: '1px solid #000',
  },

  '&:hover': {
    backgroundColor: '#5FCAE7',
    color: '#333',
    margin: '0px',
  },
}));
