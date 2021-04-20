import React from 'react';

import Button from '../button';

import Logout from '../../api/user/logout';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log('Home extends React.Component: ', props);
  }
  render(){
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Resplado</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
                </li> */}
            </ul>
            
            <span className="navbar-text">
                v0.0.1&nbsp;&nbsp;&nbsp;
            </span>
            <Button class={'btn-primary float-right'} value={'Logout'} type={'submit'} onClick={ Logout } />
            </div>
        </div>
        </nav>
        
      </div>
    );
  }
}

