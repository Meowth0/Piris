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
    console.log(this.props);
    return (
      <BottomNavigation value={`/${location.pathname.split('/')[1]}`} showLabels>
        <BottomNavigationAction label="Clients" value={PAGES.CLIENT_LIST} icon={<PeopleIcon />} onClick={() => this.onPageChange(PAGES.CLIENT_LIST)} />
        <BottomNavigationAction label="Client form" value={PAGES.CLIENT_FORM} icon={<PermIdentityIcon />} onClick={() => this.onPageChange(`${PAGES.CLIENT_FORM}/new`)} />
      </BottomNavigation>
    );
  }
}

export default withRouter(Navbar);
