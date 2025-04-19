import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  ListItemText
} from '@mui/material';
import { CommonFormControlProps } from '.';
import {
  CustomBasicSelect,
  CustomSelect,
  CustomSelectIcon
} from '../CustomSelectMenu';
import { CustomMenuItem } from '../CustomMenuItem';

const CommonSelectBox: React.FC<CommonFormControlProps> = ({
  label,
  name,
  value,
  onChange,
  fullWidth = false,
  error,
  errorMsg,
  options,
  disabled,
  renderValue,
  multiple
}) => {
  return (
    <Box>
      <FormControl fullWidth={fullWidth} error={error}>
        <InputLabel id={label}>{label}</InputLabel>
        <CustomSelect
          labelId={label}
          label={label}
          id={label}
          value={value}
          name={name}
          multiple={multiple}
          disabled={disabled}
          onChange={onChange}
          renderValue={renderValue}
          color={errorMsg ? 'error' : 'primary'}
          IconComponent={CustomSelectIcon}
          displayEmpty
          sx={{
            '& .MuiSelect-select': {
              display: 'flex',
              alignItems: 'center'
            }
          }}
          MenuProps={{
            PaperProps: {
              style: {
                marginTop: '0px',
                padding: '0',
                borderRadius: '0px',
                borderTop: "1px solid"
              }
            },
            MenuListProps: {
              style: {
                padding: '0px',
                overflowY: 'auto'
              }
            }
          }}
        >
          {options?.map((option, index) => (
            <CustomMenuItem key={index} value={option.value}> 
              <ListItemText primary={option.label} />
            </CustomMenuItem>
          ))}
        </CustomSelect>
        {error && <FormHelperText>{errorMsg}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default CommonSelectBox;
