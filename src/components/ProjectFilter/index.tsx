import { Box, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setProject } from 'src/reducers/common';
import { CustomMenuItem } from '../CustomMenuItem';

// const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
//   padding: '10px 37px !important', // Customize the padding as needed
//   color: `#000 !important`,
//   margin: '0px !important',
//   border: '1px solid #000 !important',
//   borderBottom: '0px solid #000 !important', // Remove bottom border
//   borderRadius: '0px !important',

//   '&:first-child': {
//     borderTop: '0px solid #000 !important' // Optional: can apply top border specifically for the first item
//   },

//   '&:last-child': {
//     borderBottom: '1px solid #000 !important' // Add bottom border only to the last item
//   },
//   '&:hover': {
//     backgroundColor: '#5FCAE7 !important', // You can customize the hover color here
//     color: '#333 !important', // Change the text color on hover
//     margin: '0px !important'
//   }
// }));

const ProjectFilter = ({ anchorEl, handleClose, setAnchorEl }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const filterHandler = (value) => {
    dispatch(setProject(value));
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={(event) => {
            event.stopPropagation();
            console.log('Menu clicked');
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          PaperProps={{
            style: {
              maxHeight: 500,
              marginTop: theme.spacing(0.1),
              width: '14.2vw',
              background: theme.colors.alpha.primary[100],
              borderRadius: theme.spacing(0),
              padding: 0,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0px 2px 4px rgba(0, 0, 0, 0.25)'
                  : '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }
          }}
          MenuListProps={{
            sx: {
              padding: 0
            }
          }}
        >
          <CustomMenuItem onClick={() => filterHandler('23')} className="f-20">
            23
          </CustomMenuItem>
          <CustomMenuItem onClick={() => filterHandler('24')} className="f-20">
            24
          </CustomMenuItem>
          <CustomMenuItem onClick={() => filterHandler('25')} className="f-20">
            25
          </CustomMenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default ProjectFilter;
