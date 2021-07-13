import './index.scss';
import React from 'react';

const $ = window.$;

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.modalToggle = document.getElementById(this.props.id);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
 
    if (prevState.show !== nextProps.show) {
      return {
        show: nextProps.show
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
  render() {
    return (
        <div className="modal" tabIndex="-1" show={ this.props.show } id={this.props.id}>
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                { this.props.children }
                </div>
            </div>
        </div>
    );
  }
}
