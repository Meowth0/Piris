import React from 'react';
import {
  TextField, Grid, Radio, RadioGroup, FormControl, FormHelperText,
  FormControlLabel, FormLabel, InputLabel, Select, MenuItem, Checkbox,
} from '@material-ui/core';
import styled from 'styled-components';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  DATE_FORMAT, GENDER, CITIES, MARTIAL_STATUSES, CITIZENSHIPS, DISABILITIES, DEPOSIT_TYPES,
} from '../../../constants';

const FormContainer = styled(Grid)`
  display: flex;
  margin-bottom: 20px;

  && > * {
    width: 300px;
    margin: 6px 30px;
    height: 65px;
  }
`;

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
  && > .MuiInputBase-root {
    height: 50px;
  }
`;

function ClientForm(props) {
  const {
    onChange, values, onDateChange, errors, depositId,
  } = props;
  const disabled = !!depositId;
  const {
    depositType, contractNumber, startDate, endDate, money, percent, dayPassed,
  } = values;
  return (
    <FormContainer container justify="center">
      <FormControl>
        <InputLabel error={errors.depositType}>Deposit Type</InputLabel>
        <Select
          value={depositType.value}
          name="depositType"
          onChange={onChange}
          error={errors.depositType}
          disabled={disabled}
        >
          {DEPOSIT_TYPES.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.value}</MenuItem>
          ))}
        </Select>
        {errors.depositType && <FormHelperText error>Deposit Type is required</FormHelperText>}
      </FormControl>
      <TextField
        error={errors.contractNumber}
        label="Contract Number"
        name="contractNumber"
        value={contractNumber.value}
        onChange={onChange}
        disabled={disabled}
        helperText={errors.contractNumber ? 'Contract number is not valid or not unique' : ''}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StyledKeyboardDatePicker
          clearable
          error={errors.startDate}
          value={startDate.value}
          placeholder="Start Date"
          helperText={errors.startDate ? 'Issue date is not valid' : ''}
          disabled={disabled}
          onChange={(value) => onDateChange('startDate', value)}
          maxDate={new Date()}
          format={DATE_FORMAT}
        />
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StyledKeyboardDatePicker
          clearable
          error={errors.endDate}
          value={endDate.value}
          placeholder="End Date"
          disabled={disabled}
          helperText={errors.endDate ? 'End date is not valid' : ''}
          onChange={(value) => onDateChange('endDate', value)}
          minDate={new Date()}
          format={DATE_FORMAT}
        />
      </MuiPickersUtilsProvider>
      <TextField
        error={errors.money}
        label="Money"
        name="money"
        disabled={disabled}
        value={money.value}
        onChange={onChange}
        helperText={errors.money ? 'Money is not valid or not unique' : ''}
      />
      <TextField
        error={errors.percent}
        label="Perсent"
        name="percent"
        value={percent.value}
        onChange={onChange}
        helperText={errors.percent ? 'Issued by must contains letters and be completed' : ''}
        disabled={disabled}
      />
      {disabled && (
        <TextField
          label="Day Passed"
          name="dayPassed"
          value={dayPassed.value}
          disabled
        />
      )}
    </FormContainer>
  );
}

export default ClientForm;
