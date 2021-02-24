/* eslint-disable indent */
import React from 'react';
import {
  Grid, Button,
} from '@material-ui/core';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import DepositForm from './components/DepositForm';
import withAxios from '../../architecture/axiosWrapper';
import Service from '../../services/deposit.service';
import {
  PAGES, VALIDATION_SCHEMA, DEPOSIT_TYPES,
} from '../../constants';
import DepositModel from '../client-deposits/models/deposit.model';

const ScrollableForm = styled(Grid)`
  overflow: auto;
  height: calc(100vh - 56px);

  && {
    flex-wrap: nowrap;
  }
`;

const ButtonContainer = styled(Grid)`
  display: flex;
  width: 40%;
  justify-content: space-around;
`;

class ClientsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      values: {
        depositType: {
          value: DEPOSIT_TYPES[0].id,
          validation: VALIDATION_SCHEMA.REQUIRED,
        },
        contractNumber: {
          value: '',
          validation: VALIDATION_SCHEMA.REQUIRED_ACCOUNT_NUMBER,
        },
        startDate: {
          value: moment().toDate(),
          validation: VALIDATION_SCHEMA.REQUIRED,
          type: 'date',
        },
        endDate: {
          value: moment().toDate(),
          validation: VALIDATION_SCHEMA.REQUIRED,
          type: 'date',
        },
        money:
        {
          value: 0,
          validation: VALIDATION_SCHEMA.REQUIRED_NUMBER,
        },
        percent:
        {
          value: 0,
          validation: VALIDATION_SCHEMA.REQUIRED_NUMBER,
        },
        dayPassed: {
          value: '',
        },
      },
      errors: {},
      clientId: null,
      notification: {
        isOpen: false,
        message: '',
        severity: '',
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match, service } = this.props;
    this.setState({ isLoading: true });
    const { depositId, id: clientId } = match.params;
    this.setState({ depositId, clientId });
    if (depositId) {
      service.getDeposit(depositId)
        .then((deposit) => {
          const form = new DepositModel(deposit).getInstance();
          console.log(deposit);
          const { values } = this.state;
          const fields = Object.keys(values);
          this.setState({
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
    return isFormValid;
  };

  onFormSubmit = () => {
    const { values, clientId } = this.state;
    if (!this.validateForm(values)) {
      return;
    }
    const { service, match } = this.props;
    // const { depositId } = match.params;
    // console.log(depositId);
    const form = Object.assign({},
      ...Object.keys(values).map((key) => ({ [key]: values[key].value })));
    service.createDeposit({ ...form, clientId, dayPassed: 0 })
      .then(async (deposit) => {
        console.log(deposit);
        await service.createAccount({
          accountNumber: `2${(new Array(12)).fill()
            .map(() => Math.floor(Math.random() * Math.floor(10))).join('')}`,
          type: 'passive',
          debet: 0,
          credit: 0,
          depositId: deposit._id,
          depositType: 'percent',
        });
        const curAccount = await service.createAccount({
          accountNumber: `3${(new Array(12)).fill()
            .map(() => Math.floor(Math.random() * Math.floor(10))).join('')}`,
          type: 'passive',
          debet: 0,
          credit: 0,
          depositId: deposit._id,
          depositType: 'current',
        });
        return curAccount;
      })
      .then((curAccount) => {
        service.changeCash({ debet: values.money.value, credit: values.money.value });
        service.changeFond({ debet: 0, credit: values.money.value });
        service.changeCurrentAccount(curAccount,
          { debet: values.money.value, credit: values.money.value });
        return curAccount;
      })
      .then(({ depositId }) => {
        const { history } = this.props;
        history.push(`/client-form/${clientId}/deposits/${depositId}`);
      })
      .catch((err) => this.addNotification({ message: err.message, type: 'error' }));
  };

  addNotification = ({
    message, type: severity,
  }, cb) => this.setState({ notification: { isOpen: true, message, severity } }, cb);

  closeDay = () => {
    const { values } = this.state;
    const { service, match } = this.props;
    const { depositId } = match.params;
    const { value: percent } = values.percent;
    const { value: money } = values.money;
    const clientPercent = percent * money / 36500;
    service.changePercentAccount({ depositId },
      { debet: 0, credit: clientPercent });
    service.changeFond({ debet: clientPercent, credit: 0 });
    this.onChange({ target: { value: values.dayPassed.value + 1, name: 'dayPassed' } });
  };

  closeMonth = () => {
    const { values } = this.state;
    const { service, match } = this.props;
    const { depositId } = match.params;
    const { value: percent } = values.percent;
    const { value: money } = values.money;
    const clientPercent = percent * money * 30 / 36500;
    service.changePercentAccount({ depositId },
      { debet: 0, credit: clientPercent })
      .then(() => service.changeFond({ debet: clientPercent, credit: 0 }))
      .then(() => service.getPercentAccount(depositId))
      .then((acc) => {
        service.changeCash({ debet: acc.credit, credit: acc.credit });
        return acc;
      })
      .then((acc) => service.changePercentAccount({ depositId }, { debet: acc.credit, credit: 0 }));
    this.onChange({ target: { value: values.dayPassed.value + 30, name: 'dayPassed' } });
  };

  closeDeposit = () => {
    const { values } = this.state;
    const { service, match } = this.props;
    const { depositId } = match.params;
    const { value: startDate } = values.startDate;
    const { value: endDate } = values.endDate;
    const { value: percent } = values.percent;
    const { value: money } = values.money;
    const { value: dayPassed } = values.dayPassed;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const depositTime = (eDate.getTime() - sDate.getTime()) / (1000 * 3600 * 24);
    this.onChange({ target: { value: depositTime, name: 'dayPassed' } });
    const clientPercent = percent * money * (depositTime - dayPassed) / 36500;
    console.log(clientPercent, percent, money, depositTime, dayPassed);
    service.changeFond({ debet: clientPercent + money, credit: 0 });

    service.getPercentAccount(depositId)
      .then((acc) => service.changePercentAccount({ depositId },
        {
          debet: (money + (money * percent) / 100) * depositTime / 365 - acc.debet,
          credit: (money + (money * percent) / 100) * depositTime / 365 - acc.credit,
        }));
    service.getCurrentAccount(depositId)
      .then((acc) => service.changeCurrentAccount({ depositId },
        {
          debet: (money + (money * percent) / 100) * depositTime / 365 - acc.debet,
          credit: (money + (money * percent) / 100) * depositTime / 365 - acc.credit,
        }));
    service.getCash(depositId)
      .then((acc) => service.changeCash(
        {
          debet: (money + (money * percent) / 100) * depositTime / 365 - acc.debet,
          credit: (money + (money * percent) / 100) * depositTime / 365 - acc.credit,
        },
      ));
  };

  withdrawDeposit = () => {
    const { values } = this.state;
    const { service, match } = this.props;
    const { depositId } = match.params;
    const { value: startDate } = values.startDate;
    const { value: endDate } = values.endDate;
    const { value: percent } = values.percent;
    const { value: money } = values.money;
    const { value: dayPassed } = values.dayPassed;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    const depositTime = (eDate.getTime() - sDate.getTime()) / (1000 * 3600 * 24);
    this.onChange({ target: { value: depositTime, name: 'dayPassed' } });
    const clientPercent = percent * money * (depositTime - dayPassed) / 36500;
    console.log(clientPercent, percent, money, depositTime, dayPassed);
    service.changeFond({ debet: clientPercent + money, credit: 0 });

    service.getPercentAccount(depositId)
      .then((acc) => service.changePercentAccount({ depositId },
        {
          debet: (money + (money * percent) / 100) * dayPassed / 365 - acc.debet,
          credit: (money + (money * percent) / 100) * dayPassed / 365 - acc.credit,
        }));
    service.getCurrentAccount(depositId)
      .then((acc) => service.changeCurrentAccount({ depositId },
        {
          debet: (money + (money * percent) / 100) * dayPassed / 365 - acc.debet,
          credit: (money + (money * percent) / 100) * dayPassed / 365 - acc.credit,
        }));
    service.getCash(depositId)
      .then((acc) => service.changeCash(
        {
          debet: (money + (money * percent) / 100) * dayPassed / 365 - acc.debet,
          credit: (money + (money * percent) / 100) * dayPassed / 365 - acc.credit,
        },
      ));
};

  render() {
    const {
      values, depositId, isLoading, errors, notification,
    } = this.state;
    const { isOpen, message, severity } = notification;
    return (
      <ScrollableForm container alignItems="center" direction="column" justify={isLoading ? 'center' : 'flex-start'}>
        {isLoading
          ? <CircularProgress color="secondary" />
          : (
            <>
              <DepositForm
                onChange={this.onChange}
                onDateChange={this.onDateChange}
                values={values}
                errors={errors}
                depositId={depositId}
              />
              {!depositId ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onFormSubmit}
                >
                  Create
                </Button>
              ) : (
                  // eslint-disable-next-line react/jsx-indent
                  <ButtonContainer>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.closeDay}
                    >
                      Close Day
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.closeMonth}
                    >
                      Close Month
                    </Button>
                    {values.depositType.value === DEPOSIT_TYPES[0].id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.withdrawDeposit}
                      >
                        Withdraw Deposit
                      </Button>
                    )
                      : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.closeDeposit}
                        >
                          Close Deposit
                        </Button>
                      )}
                  </ButtonContainer>
                )}
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
