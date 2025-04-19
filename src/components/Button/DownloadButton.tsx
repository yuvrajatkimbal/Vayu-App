import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { UpIcon } from 'src/assets/svg/svg';

interface UploadDownloadButtonProps extends ButtonProps {
  customSx?: SxProps<Theme>;
  isOpen?: boolean;
}

const UploadDownloadButton: React.FC<UploadDownloadButtonProps> = ({
  variant = 'contained',
  size = 'small',
  onClick,
  isOpen,
  endIcon = <UpIcon />,
  className = 'down-upload-button',
  customSx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      disabled={isOpen}
      onClick={onClick}
      className={className}
      endIcon={endIcon}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: (theme) => theme.colors.alpha.secondary[100],
        '& .MuiButton-endIcon': {
          marginLeft: -1
        },
        cursor: isOpen ? 'not-allowed' : 'pointer',
        pointerEvents: isOpen ? 'none' : 'auto',
        '&.Mui-disabled': {
          // background: (theme) => theme.colors.alpha.secondary[100],
          cursor: 'not-allowed !important',
          pointerEvents: 'none',
        },
        '&:hover': {
          cursor: isOpen ? 'not-allowed' : 'pointer',
        },
        ...customSx // Merge in any custom styles passed as props
      }}
      {...props}
    />
  );
};

export default UploadDownloadButton;
