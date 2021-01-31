import React from 'react';
import {
  Grid, Button,
} from '@material-ui/core';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import ClientForm from './components/ClientForm';
import withAxios from '../../architecture/axiosWrapper';
import Service from '../../services/client-form.service';
import {
  PAGES, VALIDATION_SCHEMA, GENDER, CITIES, CITIZENSHIPS, DISABILITIES, MARTIAL_STATUSES,
} from '../../constants';
import ClientModel from '../clients-table/models/client.model';

const ScrollableForm = styled(Grid)`
  overflow: auto;
  height: calc(100vh - 56px);

  && {
    flex-wrap: nowrap;
  }
`;

class ClientsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        name: {
          value: '',
          validation: VALIDATION_SCHEMA.REQUIRED_TEXT,
        },
        surname: {
          value: '',
          validation: VALIDATION_SCHEMA.REQUIRED_TEXT,
        },
        patronymic: {
          value: '',
          validation: VALIDATION_SCHEMA.REQUIRED_TEXT,
        },
        birthday:
        {
          value: moment('09/02/2000').toDate(),
          validation: VALIDATION_SCHEMA.REQUIRED,
          type: 'date',
        },
        gender: {
          value: GENDER.FEMALE,
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        passportSeries: {
          value: '',
          validation: VALIDATION_SCHEMA.PASSPORT_SERIES,
        },
        passportNumber: {
          value: '',
          validation: VALIDATION_SCHEMA.PASSPORT_NUMBER,
        },
        issuedBy: {
          value: '',
          validation: VALIDATION_SCHEMA.REQUIRED_TEXT,
        },
        issueDate:
        {
          value: moment('01/01/2015').toDate(),
          validation: VALIDATION_SCHEMA.REQUIRED,
          type: 'date',
        },
        identificationNumber:
        {
          value: '',
          validation: VALIDATION_SCHEMA.IDENTIFICATION_NUMBER,
        },
        residenceCity:
        {
          value: CITIES[0].id,
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        residenceAddress:
        {
          value: '',
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        homePhone:
        {
          value: '',
          validation: VALIDATION_SCHEMA.HOME_PHONE,
        },
        mobilePhone:
        {
          value: '',
          validation: VALIDATION_SCHEMA.MOBILE_PHONE,
        },
        email:
        {
          value: '',
          validation: VALIDATION_SCHEMA.ANY,
        },
        workPlace:
        {
          value: '',
          validation: VALIDATION_SCHEMA.ANY,
        },
        position:
        {
          value: '',
          validation: VALIDATION_SCHEMA.ANY,
        },
        maritalStatus:
        {
          value: MARTIAL_STATUSES[0].id,
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        citizenship:
        {
          value: CITIZENSHIPS[0].id,
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        disability:
        {
          value: DISABILITIES[0].id,
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        pensioner:
        {
          value: false,
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        income:
        {
          value: 0,
          validation: VALIDATION_SCHEMA.MONEY,
        },
      },
      errors: {},
      formId: null,
      notification: {
        isOpen: false,
        message: '',
        severity: '',
      },
      passports: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match, service } = this.props;
    this.setState({ isLoading: true });
    const formId = match.params.id;
    service.getClients()
      .then((clients) => {
        const filteredClients = clients.filter((client) => client._id !== formId);
        this.setState({
          passports:
            filteredClients.map((client) => client.passportSeries + client.passportNumber),
          identificationNumbers: filteredClients.map((client) => client.identificationNumber),
        });
      });
    if (formId) {
      service.getClient(formId)
        .then((client) => {
          const form = new ClientModel(client).getInstance();
          const { values } = this.state;
          const fields = Object.keys(values);
          this.setState({
            formId,
            values:
              Object.assign({},
                ...fields.map((field) => ({
                  [field]: {
                    ...values[field],
                    value: form[field],
                  },
                }))),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.setState({ isLoading: false });
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState((state) => ({
      values: { ...state.values, [name]: { ...state.values[name], value } },
    }));
  };

  onCheckboxChange = (event) => {
    const { checked, name } = event.target;
    this.setState((state) => ({
      values: { ...state.values, [name]: { ...state.values[name], value: checked } },
    }));
  };

  onDateChange = (name, value) => {
    this.setState((state) => ({
      values: {
        ...state.values, [name]: { ...state.values[name], value: value ? new Date(value) : null },
      },
      errors: {
        ...state.errors, [name]: value ? !value._isValid : true,
      },
    }));
  };

  validateForm = (values) => {
    let isFormValid = true;
    const { errors } = this.state;
    Object.keys(values).forEach((key) => {
      const { value = '', validation, type } = values[key];
      if (!value.toString().match(validation) || (type === 'date' && errors[key])) {
        isFormValid = false;
        this.setState((state) => ({ ...state, errors: { ...state.errors, [key]: true } }));
        return;
      }
      this.setState((state) => ({ ...state, errors: { ...state.errors, [key]: false } }));
    });
    const { passports, identificationNumbers } = this.state;
    if (passports.includes(values.passportSeries.value + values.passportNumber.value)) {
      isFormValid = false;
      this.setState((state) => ({
        ...state,
        errors: { ...state.errors, passportSeries: true, passportNumber: true },
      }));
    }
    if (identificationNumbers.includes(values.identificationNumber.value)) {
      isFormValid = false;
      this.setState((state) => ({
        ...state,
        errors: { ...state.errors, identificationNumber: true },
      }));
    }
    return isFormValid;
  };

  onFormSubmit = () => {
    const { values, formId } = this.state;
    if (!this.validateForm(values)) {
      return;
    }
    const { service } = this.props;
    let submitFn = service.createClient;
    const form = Object.assign({},
      ...Object.keys(values).map((key) => ({ [key]: values[key].value })));
    let submitParams = [form];
    if (formId) {
      submitFn = service.updateClient;
      submitParams = [formId, ...submitParams];
    }
    submitFn(...submitParams)
      .then(() => {
        const { history } = this.props;
        history.push(PAGES.CLIENT_LIST);
      })
      .catch((err) => this.addNotification({ message: err.message, type: 'error' }));
  };

  addNotification = ({
    message, type: severity,
  }, cb) => this.setState({ notification: { isOpen: true, message, severity } }, cb);

  render() {
    const {
      values, formId, isLoading, errors, notification,
    } = this.state;
    const { isOpen, message, severity } = notification;
    return (
      <ScrollableForm container alignItems="center" direction="column" justify={isLoading ? 'center' : 'flex-start'}>
        {isLoading
          ? <CircularProgress color="secondary" />
          : (
            <>
              <ClientForm
                onChange={this.onChange}
                onDateChange={this.onDateChange}
                onCheckboxChange={this.onCheckboxChange}
                values={values}
                errors={errors}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.onFormSubmit}
              >
                {formId ? 'Update' : 'Create'}
              </Button>
            </>
          )}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isOpen}
          onClose={() => this.setState({ notification: { message: '', isOpen: false, severity: '' } })}
          autoHideDuration={3000}
        >
          <Alert elevation={6} variant="filled" severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </ScrollableForm>
    );
  }
}

export default withAxios(ClientsScreen, Service);
