import React from 'react';

import Header from '../components/header';
import Input from '../components/input';



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log('Home extends React.Component: ', props);
  }
  render(){
    return (
      <div>
        <Header />
        <Input />
      </div>
    );
  }
}





module.hot.accept();
