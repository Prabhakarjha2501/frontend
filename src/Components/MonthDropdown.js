import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MONTHS } from '../utils/constants';

const MonthDropdown = ({ selectedMonth = 'Mar', onMonthChange }) => {
  return (
    <>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="month-select-label">Select Month</InputLabel>
        <Select
          labelId="month-select-label"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          label="Select Month"
        >
          {MONTHS.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MonthDropdown;