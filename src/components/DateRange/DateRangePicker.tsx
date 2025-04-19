import React from 'react';
import { Box, Grid, InputLabel } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTheme } from '@mui/material/styles';
import { CustomInput } from '../DatePickerInput';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  dateRangeHandler: (dates: [Date | null, Date | null] , isDatePrevent : boolean ) => void;
  handleCommandType: () => void;
  maxDate?: Date;
  customInputStyle?: React.CSSProperties;
  isRange?: boolean;
  showMonths?: number;
  labelWidth?: string;
  isDatePrevent?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  dateRangeHandler,
  handleCommandType,
  maxDate,
  customInputStyle,
  isRange = true,
  showMonths = 2,
  labelWidth,
  isDatePrevent
}) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '8px',
          paddingRight: '8px',
          border: '1px solid #000', 
          minWidth: labelWidth ? labelWidth : '128px',
          height: '35.5px',
          backgroundColor: theme.colors.alpha.primary[100],
          fontFamily: 'GT Walsheim Pro'
        }}
      >
        <InputLabel
          sx={{
            color: '#000',
            fontWeight: '400',
            fontSize: '15px',
            fontFamily: 'GT Walsheim Pro', 
          }}
        >
         {`Date Range `}
        </InputLabel>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          height: '35.5px',
          flex: 1,
          border: '1px solid #000',
          borderLeft: '0px solid #000',
          background: theme.colors.alpha.trueWhite[100]
        }}
        className="cursor-pointer"
        onClick={handleCommandType}
      >
        <DatePicker
          selected={startDate}
          onChange={(item) => dateRangeHandler(item , isDatePrevent ? true : false )}
          startDate={startDate}
          endDate={endDate}
          selectsRange={isRange}
          dateFormat="dd-MM-yyyy"
          monthsShown={showMonths}
          maxDate={maxDate || new Date()}
          toggleCalendarOnIconClick
          customInput={
            <CustomInput
              style={customInputStyle}
              className="custom-datepicker-input"
            />
          }
        />
      </Box>
    </>
  );
};

export default DateRangePicker;
