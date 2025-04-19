import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ theme, align }) => ({
  
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E2E2E2',
    color: theme.colors.alpha.black[100],
    textTransform: 'none',
    border: `0px solid ${theme.colors.alpha.black[100]}`, 
    fontSize: 16,
    fontWeight: 600,
    [theme.breakpoints.up('lg')]: {
      height: theme.typography.pxToRem(45)
    },
    [theme.breakpoints.up('xl')]: {
      height: theme.typography.pxToRem(50)
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: `${align} !important`,
    color: theme.colors.alpha.black[100],
    // border: `1px solid ${theme.colors.alpha.black[50]}`, // Set to 1px
    fontWeight: 400,
    [theme.breakpoints.up('lg')]: {
      height: theme.typography.pxToRem(20)
    },
    [theme.breakpoints.up('xl')]: {
      height: theme.typography.pxToRem(30)
    }
  },
  '&:(:last-child)': {
    borderBottom: `1px solid ${theme.colors.alpha.black[100]}`
  }
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFFFFF'
  },
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.colors.alpha.black[100]}`
  },
  [`&.${tableCellClasses.head}`]: {
    border: `1px solid ${theme.colors.alpha.black[100]}`,
    color: theme.colors.alpha.black[100]
  }
}));

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  '& .MuiTableSortLabel-icon': {
    opacity: 1, // Make the sort icon always visible
    cursor: 'pointer !important'
  },
  '&.Mui-active': {
    fontWeight: '700', // Ensure font weight is normal for active sort label
    color: theme.colors.alpha.black[100]
  },
  '&:hover': {
    color: '#111 !important', // Set the hover text color if needed
    cursor: 'pointer !important'
  }
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    margin: '0 0.5px',
    minWidth: '31px',
    height: '31px',
    borderRadius: 0,
    fontSize: '12',
    fontWeight: '500',
    color: theme.colors.alpha.black[100],
    backgroundColor: 'white',
    border: `1px solid ${theme.colors.alpha.black[100]}`,
    '&:hover': {
      backgroundColor: theme.colors.alpha.primaryAlt[100]
    }
  },
  '& .Mui-selected': {
    backgroundColor: `${theme.colors.alpha.nmsPrimaryAlt[100]} !important`,
    color: theme.colors.alpha.trueWhite[100],
    '&:hover': {
      backgroundColor: `${theme.palette.info.light} !important`
    }
  },
  '& .MuiPaginationItem-ellipsis': {
    border: 'none'
  }
}));

// export const StyledPagination = styled(Pagination)(({ theme }) => ({
//   '& .MuiPaginationItem-root': {
//     margin: '0 2px',
//     minWidth: '32px',
//     height: '32px',
//     borderRadius: 0,
//     fontSize: '12',
//     fontWeight: '500',
//     color: theme.colors.alpha.black[100],
//     backgroundColor: 'white',
//     border: `1px solid ${theme.colors.alpha.black[100]}`,
//     '&:hover': {
//       backgroundColor: theme.colors.alpha.primaryAlt[100]
//     }
//   },
//   '& .MuiPaginationItem-ellipsis, & .MuiPaginationItem-page': {
//     display: 'none' // Hide page numbers and ellipsis
//   },
//   '& .Mui-selected': {
//     backgroundColor: `${theme.colors.alpha.primary[100]} !important`,
//     color: theme.colors.alpha.black[100],
//     '&:hover': {
//       backgroundColor: `${theme.palette.info.light} !important`
//     }
//   }
// }));
