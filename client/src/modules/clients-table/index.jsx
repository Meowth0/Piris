import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import tableHeaders from './constants/table-headers';
import ClientModel from './models/client.model';
import Service from '../../services/clients-table.service';
import withAxios from '../../architecture/axiosWrapper';
import ActionMenu from './components/ActionMenu';
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
      columns: [...tableHeaders, {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 150,
        disableClickEventBubbling: true,
        renderCell: (params) => <ActionMenu removeFn={() => this.removeClient(params.row.id)} />,
      }],
      rows: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getClients();
  }

  removeClient = (id) => {
    const { service } = this.props;
    service.removeClient(id)
      .then(this.getClients)
      .catch((err) => console.log(err));
  };

  getClients = () => {
    const { service } = this.props;
    service.getClients()
      .then((clients) => this.setState({
        rows: clients.map((client) => new ClientModel(client).getInstance()),
      }))
      .then(() => { })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  onRowClick = (params) => {
    const { row } = params;
    const { history } = this.props;
    history.push(`${PAGES.CLIENT_FORM}/${row.id}`);
  };

  render() {
    const { columns, rows, isLoading } = this.state;
    return (
      <TableContainer>
        <DataGrid
          sortModel={[
            {
              field: 'patronymic',
              sort: 'desc',
            },
          ]}
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

ClientsScreen.propTypes = {
  service: PropTypes.object.isRequired,
};

export default withAxios(ClientsScreen, Service);
