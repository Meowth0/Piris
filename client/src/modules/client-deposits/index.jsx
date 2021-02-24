import React from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import tableHeaders from './constants/table-headers';
import Service from '../../services/deposit.service';
import withAxios from '../../architecture/axiosWrapper';
import DepositModel from './models/deposit.model';
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
    const { match } = this.props;
    this.getDeposits(match.params.id);
  }

  getDeposits = (id) => {
    const { service } = this.props;
    service.getDeposits(id)
      .then((deposits) => this.setState({
        rows: deposits.map((deposit) => new DepositModel(deposit).getInstance()),
      }))
      .then(() => { })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  onRowClick = (params) => {
    const { row } = params;
    const { history, match } = this.props;
    console.log(row);
    history.push(`${PAGES.CLIENT_FORM}/${match.params.id}/deposits/${row.id}`);
  };

  render() {
    const { columns, rows, isLoading } = this.state;
    return (
      <TableContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          onRowClick={this.onRowClick}
        />
      </TableContainer>
    );
  }
}

export default withAxios(ClientsScreen, Service);
