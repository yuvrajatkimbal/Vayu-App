import { Button, CircularProgress } from '@mui/material';
import React, { Children, FC } from 'react';
import { button } from './Button';

const CommonButton: FC<button> = (props) => {
  const {
    onClick,
    text,
    disabled = false,
    variant,
    loading = false,
    color,
    size,
    type,
    sx,
    xs,
sm,
md,
lg,
children
  } = props;

  return (
    <div>
      <Button
        fullWidth
        disabled={disabled}
        variant={variant}
        color={color}
        onClick={onClick}
        size={size}
        type={type}
        sx={sx}
        style={{
          margin: '10px , 0px',
          border: '1px solid black'
        }}
      >
        {loading ? (
          <CircularProgress
            size={25}
            color={variant === 'outlined' ? color : 'inherit'}
          />
        ) : (
          <span>{text || children}</span>
        )}
      </Button>
    </div>
  );
};

export default CommonButton;
