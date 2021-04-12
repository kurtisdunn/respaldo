import '../../scss/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import 'bootstrap';

import { HashRouter as Router, Route, Switch, IndexRoute, hashHistory, Redirect, browserHistory } from 'react-router-dom';

import Home from '../../views/home';
import Login from '../../views/login';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('App extends React.Component: ', props);
    this.state = {
      authed: false
    };
    this.authenticationCallback = this.authenticationCallback.bind(this);
  }

  authenticationCallback(r){
    if(r != null){
      this.setState({authed: true});
    }
  }

  render(){
    return(
    <Router>
      <Switch>
        <Route path="/login" render={(props) => <Login {...props} auth={this.authenticationCallback} /> } />
        <PrivateRoute authed={ this.state.authed } path='/'  component = { Home } />
      </Switch>
    </Router>
  );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
