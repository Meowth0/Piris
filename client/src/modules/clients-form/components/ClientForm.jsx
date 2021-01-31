import React from 'react';
import {
  TextField, Grid, Radio, RadioGroup, FormControl, FormHelperText,
  FormControlLabel, FormLabel, InputLabel, Select, MenuItem, Checkbox,
} from '@material-ui/core';
import styled from 'styled-components';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  DATE_FORMAT, GENDER, CITIES, MARTIAL_STATUSES, CITIZENSHIPS, DISABILITIES,
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

const StyledRadioGroup = styled(RadioGroup)`
  && {
    display: flex;
    flex-direction: row;
  }
`;

function ClientForm(props) {
  const {
    onChange, values, onDateChange, errors, onCheckboxChange,
  } = props;
  console.log(errors);
  const {
    name, surname, patronymic, birthday, email, workPlace,
    gender, residenceCity, residenceAddress, homePhone, income,
    passportNumber, passportSeries, issuedBy, position, maritalStatus,
    issueDate, identificationNumber, mobilePhone, citizenship, disability, pensioner,
  } = values;
  return (
    <FormContainer container justify="center">
      <TextField
        error={errors.name}
        label="Name"
        name="name"
        value={name.value}
        onChange={onChange}
        helperText={errors.name ? 'Name must contains letters and be completed' : ''}
      />
      <TextField
        error={errors.surname}
        label="Surname"
        name="surname"
        value={surname.value}
        onChange={onChange}
        helperText={errors.surname ? 'Surname must contains letters and be completed' : ''}
      />
      <TextField
        error={errors.patronymic}
        label="Patronymic"
        name="patronymic"
        value={patronymic.value}
        onChange={onChange}
        helperText={errors.patronymic ? 'Patronymic must contains letters and be completed' : ''}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StyledKeyboardDatePicker
          clearable
          error={errors.birthday}
          value={birthday.value}
          placeholder="Birthday"
          helperText={errors.birthday ? 'Birthday is not valid' : ''}
          onChange={(value) => onDateChange('birthday', value)}
          maxDate={new Date()}
          format={DATE_FORMAT}
        />
      </MuiPickersUtilsProvider>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <StyledRadioGroup aria-label="gender" name="gender" value={gender.value} onChange={onChange}>
          <FormControlLabel value={GENDER.FEMALE} control={<Radio />} label={GENDER.FEMALE} />
          <FormControlLabel value={GENDER.MALE} control={<Radio />} label={GENDER.MALE} />
          <FormControlLabel value={GENDER.OTHER} control={<Radio />} label={GENDER.OTHER} />
        </StyledRadioGroup>
      </FormControl>
      <TextField
        error={errors.passportSeries}
        label="Passport series"
        name="passportSeries"
        value={passportSeries.value}
        onChange={onChange}
        helperText={errors.passportSeries ? 'Passport series is not valid or not unique' : ''}
      />
      <TextField
        error={errors.passportNumber}
        label="Passport number"
        name="passportNumber"
        value={passportNumber.value}
        onChange={onChange}
        helperText={errors.passportNumber ? 'Passport number is not valid or not unique' : ''}
      />
      <TextField
        error={errors.issuedBy}
        label="Issued by"
        name="issuedBy"
        value={issuedBy.value}
        onChange={onChange}
        helperText={errors.issuedBy ? 'Issued by must contains letters and be completed' : ''}
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StyledKeyboardDatePicker
          clearable
          error={errors.issueDate}
          value={issueDate.value}
          placeholder="Issue date"
          helperText={errors.issueDate ? 'Issue date is not valid' : ''}
          onChange={(value) => onDateChange('issueDate', value)}
          maxDate={new Date()}
          format={DATE_FORMAT}
        />
      </MuiPickersUtilsProvider>
      <TextField
        error={errors.identificationNumber}
        label="Identification number"
        name="identificationNumber"
        value={identificationNumber.value}
        onChange={onChange}
        helperText={errors.identificationNumber ? 'Identification number is not valid or not unique' : ''}
      />
      <FormControl>
        <InputLabel error={errors.residenceCity}>Residence city</InputLabel>
        <Select
          value={residenceCity.value}
          name="residenceCity"
          onChange={onChange}
          error={errors.residenceCity}
        >
          {CITIES.map((city) => (
            <MenuItem key={city.id} value={city.id}>{city.value}</MenuItem>
          ))}
        </Select>
        {errors.residenceCity && <FormHelperText error>Residence city is required</FormHelperText>}
      </FormControl>
      <TextField
        error={errors.residenceAddress}
        label="Residence address"
        name="residenceAddress"
        value={residenceAddress.value}
        onChange={onChange}
        helperText={errors.residenceAddress ? 'Residence address is required' : ''}
      />
      <TextField
        error={errors.homePhone}
        label="Home phone"
        name="homePhone"
        value={homePhone.value}
        onChange={onChange}
        helperText={errors.homePhone ? 'Home phone is not valid' : ''}
      />
      <TextField
        error={errors.mobilePhone}
        label="Mobile phone"
        name="mobilePhone"
        value={mobilePhone.value}
        onChange={onChange}
        helperText={errors.mobilePhone ? 'Mobile phone is not valid' : ''}
      />
      <TextField
        label="Email"
        name="email"
        value={email.value}
        onChange={onChange}
      />
      <TextField
        label="Work place"
        name="workPlace"
        value={workPlace.value}
        onChange={onChange}
      />
      <TextField
        label="Position"
        name="position"
        value={position.value}
        onChange={onChange}
      />
      <FormControl>
        <InputLabel error={errors.maritalStatus}>Marital status</InputLabel>
        <Select
          value={maritalStatus.value}
          name="maritalStatus"
          onChange={onChange}
          error={errors.maritalStatus}
        >
          {MARTIAL_STATUSES.map((status) => (
            <MenuItem key={status.id} value={status.id}>{status.value}</MenuItem>
          ))}
        </Select>
        {errors.maritalStatus && <FormHelperText error>Marital status is required</FormHelperText>}
      </FormControl>
      <FormControl>
        <InputLabel error={errors.citizenship}>Citizenship</InputLabel>
        <Select
          value={citizenship.value}
          name="citizenship"
          onChange={onChange}
          error={errors.citizenship}
        >
          {CITIZENSHIPS.map((city) => (
            <MenuItem key={city.id} value={city.id}>{city.value}</MenuItem>
          ))}
        </Select>
        {errors.citizenship && <FormHelperText error>Citizenship is required</FormHelperText>}
      </FormControl>
      <FormControl>
        <InputLabel error={errors.disability}>Disability</InputLabel>
        <Select
          value={disability.value}
          name="disability"
          onChange={onChange}
          error={errors.disability}
        >
          {DISABILITIES.map((disab) => (
            <MenuItem key={disab.id} value={disab.id}>{disab.value}</MenuItem>
          ))}
        </Select>
        {errors.disability && <FormHelperText error>Disability is required</FormHelperText>}
      </FormControl>
      <FormControlLabel
        control={(
          <Checkbox
            checked={pensioner.value}
            onChange={onCheckboxChange}
            name="pensioner"
            color="primary"
          />
        )}
        label="Pensioner"
      />
      <TextField
        label="Income"
        name="income"
        error={errors.income}
        value={income.value}
        onChange={onChange}
        helperText={errors.income ? 'Income is not valid' : ''}
      />
    </FormContainer>
  );
}

export default ClientForm;
