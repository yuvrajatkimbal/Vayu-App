import { MenuItem } from '@mui/material';
import { styled } from '@mui/styles';

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '10px 37px !important', // Customize the padding as needed
  color: `#000 !important`,
  margin: '0px !important',
  border: '1px solid #000 !important',
  borderBottom: '0px solid #000 !important', // Remove bottom border
  borderRadius: '0px !important',

  '&:first-child': {
    borderTop: '0px solid #000 !important' // Optional: can apply top border specifically for the first item
  },

  '&:last-child': {
    borderBottom: '1px solid #000 !important' // Add bottom border only to the last item
  },
  '&:hover': {
    backgroundColor: '#5FCAE7 !important', // You can customize the hover color here
    color: '#333 !important', // Change the text color on hover
    margin: '0px !important'
  }
}));

export const SATMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: '10px 37px !important', // Customize the padding as needed
  color: `#000 !important`,
  margin: '0px !important',
  border: '1px solid #000 !important',
  borderBottom: '0px solid #000 !important', // Remove bottom border
  borderRadius: '0px !important',

  '&:first-child': {
    borderTop: '1px solid #000 !important' // Optional: can apply top border specifically for the first item
  },

  '&:last-of-type': {
    borderBottom: '1px solid #000 !important'
  },
  '&:hover': {
    backgroundColor: '#5FCAE7 !important', // You can customize the hover color here
    color: '#333 !important', // Change the text color on hover
    margin: '0px !important'
  }
}));
