import { MenuItem, Select, styled } from '@mui/material';
import {
  BottomIcon,
  FormControlDownIcon,
  FormControlUpIcon,
  NMSArrowDownIcon,
  NMSArrowUpIcon,
  NMSDownIcon,
  RightIcon,
  UpIcon
} from 'src/assets/svg/svg';

export const ProjectSelectDropDown = styled(Select)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: '0px',
  border: '1px solid #000',
  // borderRight: '0px solid #000',
  height: '28px',
  '& .MuiSelect-select': {
    // padding: '28px 20px 18px 20px !important',
    fontSize: '16px', // Set the desired font size
    fontWeight: '500', // Set the desired font weight
    width: '100%',
    textAlign: 'left',
    paddingLeft: '10px'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));
export const ProjectSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '0px',
  border: '1px solid #000',
  // borderRight: '0px solid #000',
  height: '35px',
  '& .MuiSelect-select': {
    padding: '28px 20px 18px 20px !important',
    fontSize: '20px', // Set the desired font size
    fontWeight: '500' // Set the desired font weight
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

export const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '0px',
  border: '1px solid #000',
  // borderRight: '0px solid #000',
  height: '60px',
  '& .MuiSelect-select': {
    padding: '10px 14px',
    fontSize: '15px', // Set the desired font size
    fontWeight: '500' // Set the desired font weight
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

export const CustomSelectInput = styled(Select)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '0px',
  border: '1px solid #000',
  // borderRight: '0px solid #000',
  height: '42px',
  '& .MuiSelect-select': {
    padding: '10px 14px',
    fontSize: '14px',
    fontWeight: '500'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

export const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.colors.alpha.trueWhite[100],
  border: 'none', 
  borderBottom: `1px solid ${theme.colors.alpha.black[100]}`, 
  borderLeft: `1px solid ${theme.colors.alpha.black[100]}`, 
  borderRight: `1px solid ${theme.colors.alpha.black[100]}`, 
  margin: '0px !important',
  borderRadius: '0px',
  fontSize: '14px !important',
  fontWeight: '500',
  color: `${theme.colors.alpha.black[100]} !important`,
  height: '44px',

  '&:first-child': {
    borderTop: `1px solid ${theme.colors.alpha.black[100]}` 
  },
  '&:hover': {
    backgroundColor: `${theme.colors.alpha.grey[100]} !important`
  },
  '&.Mui-selected': {
    backgroundColor: `${theme.colors.alpha.nmsPrimary[100]} !important`
  },
    //   '&.Mui-selected:hover': {
   //     backgroundColor: '#bae7ff'
  //   }
}));

export const ProjectMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.colors.alpha.primaryAlt[100],
  border: `1px solid ${theme.colors.alpha.black[100]}`,
  borderRadius: '0px',
  fontSize: '18px !important',
  fontWeight: '500 !important',
  color: theme.colors.alpha.black[100],
  height: '48px',
  paddingLeft: '22px',

  '&:hover': {
    backgroundColor: `${theme.colors.alpha.primary[100]} !important`
  },
  '&.Mui-selected': {
    backgroundColor: `${theme.colors.alpha.primary[100]} !important`
  }
  //   '&.Mui-selected:hover': {
  //     backgroundColor: '#bae7ff'
  //   }
}));


const RotatingIcon = styled(NMSDownIcon, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ open }) => ({
  transition: 'transform 0.3s ease',
  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  pointerEvents: 'none',
  // fontSize: '4px',
  marginTop: 2
}));

export const CustomSelectRotatingIcon = (props) => {
  return <RotatingIcon {...props} />;
};


export const CustomSelectIcon = ({ open, ...props }) => {
  const Icon = open ? NMSArrowUpIcon : NMSArrowDownIcon;

  const StyledIcon = styled(Icon)(({ theme }) => ({
    // width: 18,
    // height: 18,
    marginTop: '2px',
    transition: 'transform 0.3s ease',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)', // rotation animation
    pointerEvents: 'none'
  }));

  return <StyledIcon {...props} />;
};

export const ProjectSelectIcon = ({ open, ...props }) =>
  open ? (
    <FormControlUpIcon
      {...props}
      style={{ marginTop: '9px', marginRight: '9px' }}
    />
  ) : (
    <FormControlDownIcon
      {...props}
      style={{ marginTop: '9px', marginRight: '12px' }}
    />
  );
// export const DropUpDown = ({ open, ...props }) =>
//   open ? (
//     <FormControlUpIcon
//       {...props}
//       style={{ marginTop: '9px', marginRight: '9px' }}
//     />
//   ) : (
//     <FormControlUpIcon
//       {...props}
//       style={{ marginTop: '9px', marginRight: '12px' }}
//     />
//   );

export const CustomBasicSelect = styled(Select)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '0px',
  border: '1px solid #000',
  '& .MuiSelect-select': {
    fontSize: '15px', // Set the desired font size
    fontWeight: '500' // Set the desired font weight
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));

// Common Select Input
export const CustomSelectInputBox = styled(Select)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '0px',
  border: '1px solid #000',
  height: '36px',
  '& .MuiSelect-select': {
    fontSize: '15px', // Set the desired font size
    fontWeight: '500' // Set the desired font weight
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  }
}));
