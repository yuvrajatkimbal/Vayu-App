import { Button, ButtonProps, Grid, styled } from '@mui/material';

export const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: '1px solid #000',
  height: '25px !important',
  paddingLeft: '40px !important',
  paddingTop: '4px !important',
  paddingBottom: '26px !important',
  // Apply a border on the left side only if it's the first item
  '&:first-of-type': {
    borderLeft: '0px solid #000'
  },
  // Apply a border on the right side only if it's the last item
  '&:last-of-type': {
    borderRight: '0px solid #000'
  }
}));

export const StyledGrid = styled(Grid)(({ theme }) => ({
  border: '1px solid #000',
  paddingTop: '0px !important'
  //   paddingBottom: '4px !important'
}));

export const HeaderContainer = styled(Grid)(({ theme }) => ({
  height: '65px',
  border: `1px solid ${theme.colors.alpha.black[100]}`,
  background: theme.colors.alpha.trueWhite[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '40px !important',
  paddingRight: '40px !important',
  [theme.breakpoints.down('md')]: {
    height: theme.typography.pxToRem(100)
  },
  [theme.breakpoints.down('sm')]: {
    height: theme.typography.pxToRem(120)
  }
}));

export const StyledGridItems = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.colors.alpha.black[100]}`,
  height: '50px !important',
  paddingLeft: '40px !important',
  paddingRight: '40px !important',
  paddingTop: '6px !important',
  //   paddingBottom: '8px !important',
  // Apply a border on the left side only if it's the first item
  '&:first-of-type': {
    borderLeft: '0px solid #000'
  },
  // Apply a border on the right side only if it's the last item
  '&:last-of-type': {
    borderRight: '0px solid #000'
  }
}));

export const RefreshBox = styled(Grid)(({ theme }) => ({
  height: '31px',
  border: `1px solid ${theme.colors.alpha.black[100]}`,
  borderBottom: '0px',
  background: theme.colors.alpha.primaryAlt[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end'
}));

export const RefreshButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.colors.alpha.black[100]}`,
  borderRight: '0px',
  borderTop: '0px',
  borderBottom: '0px',
  width: '30px !important',
  height: '30px !important',
  background: theme.colors.alpha.primary[100],
  paddingLeft: '0px !important',
  paddingRight: '0px !important'
}));

export const StyledGrids = styled(Grid)(({ theme }) => ({
  border: `1px solid ${theme.colors.alpha.black[100]}`,
  paddingTop: '5px !important',
  //   paddingBottom: '8px !important',
  display: 'flex',
  alignItems: 'center'
}));

interface StyledButtonProps extends ButtonProps {
  active?: boolean;
}

export const StyledButton = styled(
  ({ active, ...props }: StyledButtonProps) => <Button {...props} />
)(({ theme, active }) => ({
  height: '34px',
  color: '#000',
  borderRadius: 0, // Removes default MUI border radius
  backgroundColor: active ? theme.colors.alpha.primary[100] : '#fff', // Active background color
  '&:first-of-type': {
    width: '145px',
    borderRight: `1px solid #000` // Adds a right border to the first button
  },
  '&:last-of-type': {
    width: '65px'
  },
  '&:hover': {
    // background: theme.colors.alpha.primary[100], // Change to the desired hover background color
    // color: theme.colors.alpha.black[100],
    // border: '1px solid #000'
  }
}));
