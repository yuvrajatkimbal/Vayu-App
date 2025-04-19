export interface CommonFormControlProps {
  label?: string;
  name?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<any>) => void;
  fullWidth?: boolean;
  error?: boolean;
  errorMsg?: string;
  disabled?: boolean;
  multiple?: boolean;
  renderValue?: any;
  options?: { value: string | number; label: string }[];
}