import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { withRouter } from 'react-router';
import PeopleIcon from '@material-ui/icons/People';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { PAGES } from '../constants';

class Navbar extends React.PureComponent {
  onPageChange = (activePage) => {
    const { history } = this.props;
    history.push(activePage);
  };

  render() {
    const { location } = this.props;
    const activePage = `/${location.pathname.split('/')[1]}`;
    return (
      <BottomNavigation value={activePage} showLabels>
        <BottomNavigationAction label="Clients" value={PAGES.CLIENT_LIST} icon={<PeopleIcon />} onClick={() => this.onPageChange(PAGES.CLIENT_LIST)} />
        <BottomNavigationAction label="Client form" value={PAGES.CLIENT_FORM} icon={<PermIdentityIcon />} onClick={() => activePage !== PAGES.CLIENT_FORM && this.onPageChange(`${PAGES.CLIENT_FORM}/new`)} />
        <BottomNavigationAction label="Accounts" value={PAGES.ACCOUNTS} icon={<PermIdentityIcon />} onClick={() => activePage !== PAGES.ACCOUNTS && this.onPageChange(PAGES.ACCOUNTS)} />
      </BottomNavigation>
    );
  }
}

export default withRouter(Navbar);
