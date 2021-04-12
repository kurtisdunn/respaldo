import React from 'react';
import './index.scss';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="grid">
          <div className="card-columns">
            {this.props.children}
            </div>
          </div>
    );
  }
}
