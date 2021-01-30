import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class ActionMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      selectedIndex: 0,
    };
  }

  setAnchorEl = (anchorEl) => {
    this.setState({ anchorEl });
  };

  setSelectedIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  handleClickListItem = (event) => {
    this.setAnchorEl(event.currentTarget);
  };

  handleMenuItemClick = (event, index, removeFn) => {
    this.setSelectedIndex(index);
    this.setAnchorEl(null);
    removeFn();
  };

  handleClose = () => {
    this.setAnchorEl(null);
  };

  render() {
    const { removeFn } = this.props;
    const { anchorEl, selectedIndex } = this.state;
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
            selected={selectedIndex === 0}
            onClick={(event) => this.handleMenuItemClick(event, 0, removeFn)}
          >
            Remove
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default ActionMenu;
