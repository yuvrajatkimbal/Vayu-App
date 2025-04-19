import React from "react";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  useTheme
} from "@mui/material";
import {
  CustomSelectInput,
  CustomSelectIcon,
  CustomMenuItem
} from "../CustomSelectMenu";

const CustomSelectDropdown = ({ name, value, onChange, options }) => {
  const theme = useTheme();
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      lg={2.5}
      mt={1}
      display={"flex"}
      alignItems={"center"}
    >
      {/* First Part: Input Label */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "8px",
          paddingRight: "8px",
          border: "1px solid #000",
          borderLeft: "1px solid #000",
          borderRight: "0px solid #000",
          minWidth: "80px",
          height: "42px",
          backgroundColor: theme.colors.alpha.nmsPrimary[100],
          fontFamily: theme.typography.fontFamily
        }}
      >
        <InputLabel sx={{ color: "#000", fontWeight: "400", fontSize: "14px" }}>
          {name}
        </InputLabel>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderRight: "1px solid #000",
          flex: 1
        }}
      >
        <FormControl fullWidth>
          <CustomSelectInput
            IconComponent={CustomSelectIcon}
            value={value}  
            onChange={onChange}
            name="filter"
            displayEmpty
            sx={{
              borderRight: "0px solid",
              "& .MuiSelect-select": {
                padding: "6px 14px",
                textTransform: "capitalize"
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  marginTop: "7px",
                  padding: "0",
                  borderRadius: "0px"
                }
              },
              MenuListProps: {
                style: {
                  padding: "0px",
                  maxHeight: 400, 
                  overflowY: "auto" 
                }
              }
            }}
            renderValue={(selected) => {
              if (!selected || selected === "") {
                return <Typography color="text.secondary">{`Select ${name}`}</Typography>;
              }
              const selectedOption = options.find(option => option.value === selected);
              return selectedOption ? selectedOption.label : selected;
            }}
          >
            {options.map((option) => (
              <CustomMenuItem key={option.value} value={option.value}>
                {option.label}
              </CustomMenuItem>
            ))}
          </CustomSelectInput>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default CustomSelectDropdown;
