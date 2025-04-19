import React from 'react';
import { Grid, Box, InputLabel, FormControl, MenuItem } from '@mui/material'; 
import { useTheme } from '@mui/material';
// import { CustomMenuItem } from '../CustomMenuItem';
import { CustomSelectInput, CustomSelectIcon, CustomMenuItem, CustomSelectInputBox } from '../CustomSelectMenu';
import styled from '@emotion/styled';
 
export const CustomMenuItemOptions = styled(MenuItem)(({ theme }) => ({
  padding: '10px !important', // Customize the padding as needed
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

interface CommonDropdownProps {
  label?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<{ value: unknown }>) => void;
  options?: { value: any; label: string; icon?: any }[];
  name?: string;
  filtersData?: any;
  setFiltersData?: (data: any) => void;
  minWidth?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  mt?: number;
}

const CommonDropdown: React.FC<CommonDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  name,
  filtersData,
  minWidth,
  setFiltersData,
  xs,
  sm,
  md,
  lg,
  mt
}) => {
  const theme = useTheme();

  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      mt={mt}
      display="flex"
      alignItems="center" 
    >
      {/* First Part: Input Label */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingX: '18px',
          border: '1px solid #000',
          borderLeft: '1px solid #000',
          borderRight: '0px solid #000',
          height: '36px',
          backgroundColor: theme.colors.alpha.primary[100],
          fontFamily: theme.typography.fontFamily
        }}
      >
        <InputLabel sx={{ color: '#000', fontWeight: '400', fontSize: '15px' }}>
          {label}
        </InputLabel>
      </Box>

      {/* Second Part: Form Control */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRight: '1px solid #000',
          flex: 1
        }}
      >
        <FormControl fullWidth>
          <CustomSelectInputBox
            IconComponent={CustomSelectIcon}
            value={value}
            // @ts-ignore
            onChange={onChange}
            name={name}
            displayEmpty
            sx={{
              minWidth: minWidth,
              borderRight: '0px solid',
              '& .MuiSelect-select': {
                padding: '6px 10px',
                display: "flex",
                alignItems:"center"
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  marginTop: '1.2px',
                  padding: '0',
                  borderRadius: '0px'
                }
              },
              MenuListProps: {
                style: {
                  padding: '0px',
                  maxHeight: 400, // Set the maximum height of the dropdown
                  overflowY: 'auto' // Enable vertical scrolling
                }
              }
            }}
          >
            {options?.map((option) => (
              <CustomMenuItem key={option.value} value={option.value}>
                {option.icon && (
                  <Box
                    component="span"
                    sx={{
                      marginRight: '8px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <option.icon />
                  </Box>
                )}
                {option.label}
              </CustomMenuItem>
            ))}
          </CustomSelectInputBox>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default CommonDropdown;
