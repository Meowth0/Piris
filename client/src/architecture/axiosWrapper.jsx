import React from 'react';

const withAxios = (Component, service) => class extends React.PureComponent {
  render() {
    return <Component {...this.props} service={service} />;
  }
};

export default withAxios;
