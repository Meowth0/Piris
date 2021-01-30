import React from 'react';
import {
  Grid, Button,
} from '@material-ui/core';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import ClientForm from './components/ClientForm';
import withAxios from '../../architecture/axiosWrapper';
import Service from '../../services/client-form.service';
import { PAGES } from '../../constants';
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
        name: '',
        surname: '',
        patronymic: '',
        birthday: moment('09/02/2000'),
      },
      formId: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { match, service } = this.props;
    const formId = match.params.id;
    if (formId) {
      this.setState({ isLoading: true });
      service.getClient(formId)
        .then((client) => {
          this.setState({ formId, values: new ClientModel(client).getInstance() });
        })
        .catch((err) => console.log(err))
        .finally(() => this.setState({ isLoading: false }));
    }
    console.log(match);
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState((state) => ({ values: { ...state.values, [name]: value } }));
  };

  onDateChange = (name, value) => {
    this.setState((state) => ({
      values: { ...state.values, [name]: value ? new Date(value) : null },
    }));
  };

  onFormSubmit = () => {
    const { values, formId } = this.state;
    const { service } = this.props;
    let submitFn = service.createClient;
    let submitParams = [values];
    if (formId) {
      submitFn = service.updateClient;
      submitParams = [formId, ...submitParams];
    }
    submitFn(...submitParams)
      .then(() => {
        const { history } = this.props;
        history.push(PAGES.CLIENT_LIST);
      })
      .catch((err) => console.log(err));
    console.log(values);
  };

  render() {
    const { values, formId, isLoading } = this.state;
    return (
      <ScrollableForm container alignItems="center" direction="column" justify={isLoading ? 'center' : 'flex-start'}>
        {isLoading
          ? <CircularProgress color="secondary" />
          : (
            <>
              <ClientForm
                onChange={this.onChange}
                onDateChange={this.onDateChange}
                values={values}
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
      </ScrollableForm>
    );
  }
}

export default withAxios(ClientsScreen, Service);
