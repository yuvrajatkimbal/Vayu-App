import { forwardRef } from 'react';

interface CustomInputProps {
  value?: any;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, style, className }, ref) => (
    <input
      ref={ref}
      value={value || ''}
      onClick={onClick}
      style={style}
      className={className}
      readOnly
    />
  )
);

CustomInput.displayName = 'CustomInput';
