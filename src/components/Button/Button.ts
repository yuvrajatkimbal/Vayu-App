import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface button {
  onClick?: () => void;
  text?: string;
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  className?: string;
  loading?: boolean;
  size?: 'large' | 'medium' | 'small';
  type?: 'button' | 'reset' | 'submit';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'info';
  sx?: SxProps<Theme>;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}
