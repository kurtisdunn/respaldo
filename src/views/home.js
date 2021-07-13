import React from 'react';

import Button from '../components/button';
import Form from '../components/form';
import Header from '../components/header';
import Input from '../components/input';
import Modal from '../components/modal';

import GetRepositories from '../api/backupRepositories/get';
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
  CloudConnectAgentUid: '40bd0dcd-85c5-456c-807d-f48ee958ea54' //KP backup Pool
};

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log('Home extends React.Component: ', props);
    this.state = {
      tenants: {},
      newTenantModal: {
        show: false
      }
    }
  }
  componentDidMount(){
    const that = this;
    GetTenants().then(r => that.setState({ tenants: r }))
    GetCloudGatewayPool().then(r => that.setState({ cloudGatewayPools: r }))
    GetRepositories(2541353).then(r => that.setState({ backupRepositories: r })) //ID 2541353 - hwkpbakdd02
  }
  render(){
    const tenants = this.state.tenants.length > 0 ? this.state.tenants : null;
    const cloudGatewayPools = this.state.cloudGatewayPools ? this.state.cloudGatewayPools : null;
    const backupRepositories = this.state.backupRepositories != null ? this.state.backupRepositories : null;
    return (
      <div>
        <Header />
        <br />
        <div className="container" style={{ width: '100%' }}>

        <div className="card">
          <div className="card-body">
          <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#newTenantModal">New Tenant</button>
          
        <hr />
          {
            cloudGatewayPools ? 
          <table className="table  table-hover table-sm caption-top">
          <caption>CloudGatewayPools</caption>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">cloudAgentUid</th>
              <th scope="col">instanceUid</th>
            </tr>
          </thead>
          <tbody>
         {cloudGatewayPools.map(r => 
          <React.Fragment key={r.instanceUid}>
            <tr data-bs-toggle="collapse" data-bs-target={`#${r.name.replace(/\s/g, "")}`} className="clickable" style={{cursor: 'pointer'}}>
              <td>{r.name}</td>
              <td>{r.cloudAgentUid}</td>
              <td>{r.instanceUid}</td>
            </tr>
            <tr id={r.name.replace(/\s/g, "")} className="collapse">
                <td colSpan="3">
                    <div >Hidden by default</div>
                </td>
            </tr>
            </React.Fragment>
          )
         }
          </tbody>
        </table>
       : null
          }
      
          {
            backupRepositories ? 
          <table className="table  table-hover table-sm caption-top">
          <caption>BackupRepositories</caption>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">serverName</th>
              <th scope="col">capacity</th>
              <th scope="col">freeSpace</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{backupRepositories.id}</td>
              <td>{backupRepositories.name}</td>
              <td>{backupRepositories.serverName}</td>
              <td>{backupRepositories.capacity}TB</td>
              <td>{backupRepositories.freeSpace}TB</td>
            </tr>
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
        
        <Modal id={'newTenantModal'} >
          <div className="modal-header">
              <h5 className="modal-title">New Tenant</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Form method={ PostTenants } callback={ this.callback }>
              <Input title={'Username'} name={'username'} validator={'required'} />
              <Input title={'Password'} name={'password'} type={'password'} validator={'required'} />
              <Button hidden="true" class={'btn-primary btn-lg float-right'} value={'Send'} type={'submit'} />
            </Form>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary btn-sm">Continue </button>
          </div>
        </Modal>

      </div>
    );
  }
}

module.hot.accept();