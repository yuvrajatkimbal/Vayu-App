import { Box, Grid, styled } from '@mui/material';

interface ProfilesBoxProps {
  isActive: boolean;
}

export const ProfilesBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive' // Prevent `isActive` from being passed to the DOM
})<ProfilesBoxProps>(({ theme, isActive }) => ({
  border: '1px solid #000',
  textAlign: 'center',
  height: '40px',
  background: isActive ? theme.colors.alpha.primary[100] : theme.colors.alpha.grey[100], // Active state background
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '500',
  fontFamily: theme.typography.fontFamily,
  '&:hover': {
    background: theme.colors.alpha.trueWhite[100],
  },
}));

export const CategoryBox = styled(Box)(({ theme }) => ({
  border: '1px solid #000',
  textAlign: 'center',
  height: '60px',
  background: theme.colors.alpha.grey[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500',
  fontFamily: theme.typography.fontFamily,
  '&:hover': {
    background: theme.colors.alpha.trueWhite[100] // Change to the desired hover background color
  }
}));

interface ActionBoxProps {
  isActive: boolean;
}
export const ActionBox = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<ActionBoxProps>(({ theme, isActive }) => ({
  height: '53px',
  border: `1px solid ${theme.colors.alpha.black[100]}`,
  background: isActive
    ? theme.colors.alpha.primary[100]
    : theme.colors.alpha.black[100],
  color: isActive
    ? theme.colors.alpha.black[100]
    : theme.colors.alpha.trueWhite[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 22px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease', // Optional: smooth transition for background color
  '&:hover': {
    background: theme.colors.alpha.primary[100], // Change to the desired hover background color
    color: theme.colors.alpha.black[100]
  }
}));

export const StatusBox = styled(Box)(({ theme }) => ({
  height: '19px',
  width: '19px',
  background: theme.colors.alpha.secondary[100],
  border: `1px solid ${theme.colors.alpha.black[100]}`
}));

export const StatusBoxOnline = styled(Box)(({ theme }) => ({
  height: '16px',
  width: '16px',
  background: "#D7FAE0",
  border: `1px solid #00AB56`
}));
export const StatusBoxOffline = styled(Box)(({ theme }) => ({
  height: '16px',
  width: '16px',
  background: "#FFD6D3FF",
  border: `1px solid #E63D45A4`
}));

export const StatusBoxs = styled(Grid)(({ theme }) => ({
  height: '30px',
  width: '30px',
  border: '1px solid #000',
  borderRight: '0px',
  borderTop: '0px',
  borderBottom: '0px',
  background: theme.colors.alpha.danger[100],
  position: 'absolute',
  top: 0,
  right: 0
}));

export const CommandCategoryBox = styled(Box)(({ theme }) => ({
  border: '1px solid #000',
  textAlign: 'center',
  height: '50px',
  background: '#F6F6F6',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: '500',
  fontFamily: theme.typography.fontFamily,
  '&:hover': {
    background: '#fff' // Change to the desired hover background color
  }
}));