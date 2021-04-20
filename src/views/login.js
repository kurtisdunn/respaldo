import './login.scss';
import React from 'react';
import cookie from 'js-cookie';

import Authenticate from '../api/user/authenticate';

import Button from '../components/button';
import Form from '../components/form';
import Input from '../components/input';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('Login extends React.Component: ', props);
    this.callback = this.callback.bind(this);
  }
  componentDidMount(){
    const that = this;
    const token = cookie.getJSON('token');
    if (token) {
      that.setState({ authed: true });
      that.props.history.push('/');
    }
  }
  callback() {
    const that = this;
    const token = cookie.getJSON('token');
    if (token) {
      that.props.auth(true);
      that.props.history.push('/');
    }
  }
  render(){
    return (
      <div className="login">
      <img src="https://5gnetworks.com.au/media/5g-networks-logo-500px.png" />
        <Form method={ Authenticate }  callback={ this.callback }>
          <Input title={'Username'} name={'username'} validator={'required'} />
          <Input title={'Password'} name={'password'} type={'password'} validator={'required'} />
          <Button class={'btn-primary btn-lg float-right'} value={'Send'} type={'submit'} />
        </Form>
      </div>
    );
  }
}

module.hot.accept();
