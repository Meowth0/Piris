import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { PAGES } from '../../../constants';

class ActionMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  setAnchorEl = (anchorEl) => {
    this.setState({ anchorEl });
  };

  handleClickListItem = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleMenuItemClick = (event, fn) => {
    this.setAnchorEl(null);
    fn();
  };

  handleClose = () => {
    this.setAnchorEl(null);
  };

  render() {
    const { removeFn, redirectToDeposit, redirectToDeposits } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClickListItem}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          variant="menu"
          onClose={this.handleClose}
        >
          <MenuItem
            key="remove"
            onClick={(event) => this.handleMenuItemClick(event, removeFn)}
          >
            Remove
          </MenuItem>
          <MenuItem
            key="deposit"
            onClick={(event) => this.handleMenuItemClick(event, redirectToDeposit)}
          >
            Create deposit
          </MenuItem>
          <MenuItem
            key="deposits"
            onClick={(event) => this.handleMenuItemClick(event, redirectToDeposits)}
          >
            View deposits
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default ActionMenu;
