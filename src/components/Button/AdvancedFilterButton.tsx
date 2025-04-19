import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { NextIcon } from 'src/assets/svg/svg';

interface CustomButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  customSx?: SxProps<Theme>; // Ensure this matches the MUI `sx` prop type
}

const AdvancedFilterButton: React.FC<CustomButtonProps> = ({
  variant = 'contained',
  size = 'small',
  onClick,
  endIcon = <NextIcon />,
  text = 'Advanced Filters',
  disabled,
  className = 'advance-filter-button',
  customSx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={className}
      endIcon={endIcon}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: (theme) => theme.colors.alpha.primary[100],
        '& .MuiButton-endIcon': {
          marginLeft: 2
        },
        '& .button-text': {
          marginRight: 2
        },
        ...customSx
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default AdvancedFilterButton;
