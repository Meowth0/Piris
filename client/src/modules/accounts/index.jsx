import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import tableHeaders from './constants/table-headers';
import Service from '../../services/accounts.service';
import withAxios from '../../architecture/axiosWrapper';
import AccountModel from './models/account.model';
import { PAGES } from '../../constants';

const TableContainer = styled(Grid)`
  padding: 14px;
  height: calc(100vh - 56px);
  box-sizing: border-box;
`;

class ClientsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: tableHeaders,
      rows: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getAccounts();
  }

  getAccounts = () => {
    const { service } = this.props;
    service.getAccounts()
      .then((accounts) => this.setState({
        rows: accounts.map((account) => new AccountModel(account).getInstance()),
      }))
      .then(() => { })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { columns, rows, isLoading } = this.state;
    return (
      <TableContainer>
        <DataGrid
          // sortModel={[
          //   {
          //     field: 'patronymic',
          //     sort: 'desc',
          //   },
          // ]}
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={isLoading}
        />
      </TableContainer>
    );
  }
}

export default withAxios(ClientsScreen, Service);
