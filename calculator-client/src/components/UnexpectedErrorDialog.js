import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'semantic-ui-react';
import './UnexpectedErrorDialog.css';
import connected from '../connected';
import {hideErrorPage} from '../actions/errorPage';

export class UnexpectedErrorDialog extends Component {

  static propTypes = {
    errorPage: PropTypes.shape({
      display: PropTypes.bool.isRequired,
    }),
    dispatch: PropTypes.func.isRequired
  };

  onButtonClick = () => {
    const {dispatch} = this.props;
    dispatch(hideErrorPage());
  };

  render() {
    const {errorPage: {display}} = this.props;

    return (
      <Modal className="error-view" size={'small'} open={display}>
        <Modal.Header>Well, this is unexpected...</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Please try again shortly.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.onButtonClick}>Ok</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connected(UnexpectedErrorDialog);
