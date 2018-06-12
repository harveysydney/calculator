import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UnexpectedErrorDialog from './components/UnexpectedErrorDialog';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const {children} = this.props;
    return (
      <div style={{paddingLeft: "0.5em", paddingRight: "0.5em"}}>
        {children}
        <UnexpectedErrorDialog/>
      </div>
    );
  }
}
