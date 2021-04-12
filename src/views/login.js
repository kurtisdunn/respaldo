import './login.scss';
import React from 'react';

import Authenticate from '../api/user/authenticate';
import User from '../api/user/current';

import Button from '../components/button';
import Form from '../components/form';
import Input from '../components/input';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    console.log('Login extends React.Component: ', props);
    this.callback = this.callback.bind(this);
  }
  callback(rsp) {
    const that = this;
    const response = JSON.parse(rsp);
    if (response.success){
      User().then(r => {
        that.props.auth(r);
        that.props.history.push('/');
      });
    }
  }
  render(){
    return (
      <div className="login">
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
