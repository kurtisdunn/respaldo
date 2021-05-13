import React from 'react';

import Header from '../components/header';
import Input from '../components/input';

import GetTenants from '../api/tenants/get';
import PostTenants from '../api/tenants/post';
import GetCloudGatewayPool from '../api/cloudGatewayPools/get'

const newTenant = {
  name: 'Test Company',
  title: 'Mr',
  companyId: 'TestCompany',
  username: 'TestCompany01', 
  password: 'password',
  Enabled: false,
  tenantType: 'General',
  "cloudGatewayPoolsUids": [
    "09f18663-3d4c-4db7-81b1-270c08f8d8a0" // Required, Cannot set automatically until using v3
  ],
  CloudConnectAgentUid: '40bd0dcd-85c5-456c-807d-f48ee958ea54' //SDCGQPOOL01
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log('Home extends React.Component: ', props);
    this.state = {
      tenants: {}
    }
  }
  componentDidMount(){
    const that = this;
    GetTenants().then(r => that.setState({tenants: r}))
    GetCloudGatewayPool().then(r => that.setState({cloudGatewayPools: r}))
  }
  render(){
    const tenants = this.state.tenants.length > 0 ? this.state.tenants : null;
    const cloudGatewayPools = this.state.cloudGatewayPools ? this.state.cloudGatewayPools : null;

    return (
      <div>
        <Header />
        <br />
        <div className="container" style={{ width: '100%' }}>

        <div className="card">
          <div className="card-body">
          <button className="btn btn-primary btn-sm" onClick={ () => PostTenants(newTenant) }>New Tenant</button>
        <hr />
          {
            cloudGatewayPools ? 
          <table className="table table-sm caption-top">
          <caption>CloudGatewayPools</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">cloudAgentUid</th>
              <th scope="col">instanceUid</th>
            </tr>
          </thead>
          <tbody>
         {cloudGatewayPools.map(r => <tr key={r.instanceUid}>
              <td>{r.name}</td>
              <td>{r.cloudAgentUid}</td>
              <td>{r.instanceUid}</td>
            </tr>)
         }

          </tbody>
        </table>
       : null
          }
          {
            tenants ? 
        <table className="table table-sm caption-top">
          <caption>Tenants</caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
         {tenants.map(r => <tr key={r.id}>
              <th scope="row">{r.id}</th>
              <td>{r.name}</td>
              <td>{r.userName}</td>
              <td>{r.state}</td>
            </tr>)
         }
      

          </tbody>
        </table>
       : 
        <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary m-5" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
          </div>
        </div>
        </div>
   
 <br />

      </div>
    );
  }
}





module.hot.accept();
