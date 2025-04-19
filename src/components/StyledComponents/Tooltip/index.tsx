import { styled } from "@mui/material";

export const ScrollableList = styled('div')(({ theme }) => ({
  maxHeight: '500px',
  overflowY: 'auto',
  // backgroundColor: 'grey',
  padding: '0px',
  borderRadius: '4px',
  width: '300px',
  '&::-webkit-scrollbar': {
    width: '12px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'grey',
    borderRadius: '4px'
  }
}));
