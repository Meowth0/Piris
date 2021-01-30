import React from 'react';
import {
  TextField, Grid,
} from '@material-ui/core';
import styled from 'styled-components';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DATE_FORMAT } from '../../../constants';

const FormContainer = styled(Grid)`
  display: flex;

  && > * {
    width: 400px;
    margin: 6px 0;
  }
`;

function ClientForm(props) {
  const { onChange, values, onDateChange } = props;
  const {
    name, surname, patronymic, birthday,
  } = values;
  return (
    <FormContainer container alignItems="center" direction="column">
      <TextField
        error
        label="Name"
        name="name"
        value={name}
        onChange={onChange}
        helperText="Incorrect entry."
      />
      <TextField
        error
        label="Surname"
        name="surname"
        value={surname}
        onChange={onChange}
        helperText="Incorrect entry."
      />
      <TextField
        error
        label="Patronymic"
        name="patronymic"
        value={patronymic}
        onChange={onChange}
        helperText="Incorrect entry."
      />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          clearable
          value={birthday}
          placeholder="Birthday"
          onChange={(value) => onDateChange('birthday', value)}
          maxDate={new Date()}
          format={DATE_FORMAT}
        />
      </MuiPickersUtilsProvider>
    </FormContainer>
  );
}

export default ClientForm;
