import { h, Component } from 'preact';
import CONSTANTS from '../../lib/constants';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
import LinkState from 'linkstate';
import { Toast } from '../../lib/toastr';
import Pagination from '../../components/pagination';
import http from 'fetch-bb';
// import { AppStore } from '../../lib/store';
import { startLoader, stopLoader} from '../../lib/utils';
// import SideBar from '../../components/sideBar';
export default class Users extends Component {

  toggleAddUser() {
    this.setState({
      isUserAddModal: !this.state.isUserAddModal,
      modalTitle: 'Create User',
      userName: '',
      displayName: '',
      userMobile: '',
      userEmail: '',
      userID: '',
      selectedRoleList: new Set(),
      selectedDepartmentList: new Set(),
      selectedRole: '',
      selectedDepartment: '',
      isAdmin: false,
      disable: false
    });
  }

  getListOfDepartment() {
    return http.get(`${CONSTANTS.API_URL}/api/company/department`, {status: 'active'})
      .then((departments) => {
        this.setState({departmentList:departments});
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
        new Toast('List the Department, Ward or Role failed', Toast.TYPE_ERROR, Toast.TIME_LONG);
      });
  }

  getRoleList() {
    return http
      .get(`${CONSTANTS.API_URL}/api/role`)
      .then((resp) => {
        this.setState({roleList: resp});
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
        stopLoader();
      });
  }
  createOrEditUser(e) {
    e.preventDefault();
    this.setState({isButtonLocked: true});
    startLoader();

    let user = {
      name: e.target.name.value,
      displayName: e.target.displayName.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value
    };
    user.departmentIDs  = Array.from(this.state.selectedDepartmentList).map((department) => { return department._id;});
    user.roleIDs = Array.from(this.state.selectedRoleList).map((role) => { return role._id;});
    if (this.state.modalTitle === 'Create User') {
      // user.isClientAdmin = this.state.isAdmin;
      return http.post(`${CONSTANTS.API_URL}/api/user`,user)
        .then(() => {
          new Toast('User created successfully.', Toast.TYPE_DONE, Toast.TIME_LONG);
          this.getUserCount();
          this.getUsersList();
          this.toggleAddUser();
          this.setState({isButtonLocked: false});
        })
        .catch((HTTPException) => {
          console.error(HTTPException.message);
          if (HTTPException.statusCode===400) {
            new Toast('Empty Fields are not accepted.', Toast.TYPE_ERROR, Toast.TIME_LONG);
          } else
          if (HTTPException.statusCode===417) {
            new Toast('Could not create User, User you are trying to create already exist.', Toast.TYPE_ERROR, Toast.TIME_LONG);
          } else {
            new Toast('Could not create User', Toast.TYPE_ERROR, Toast.TIME_LONG);
          }
          this.setState({isButtonLocked: false});
          stopLoader();
        });
    } else if (this.state.modalTitle === 'Edit User') {
      return http.put(`${CONSTANTS.API_URL}/api/user/${this.state.userID}`,user)
        .then(() => {
          this.getUsersList();
          this.toggleAddUser();
          new Toast('User updated successfully.', Toast.TYPE_DONE, Toast.TIME_LONG);
          this.setState({isButtonLocked: false});
        })
        .catch((HTTPException) => {
          console.error(HTTPException.message);
          if (HTTPException.statusCode===400) {
            new Toast('Empty Fields are not accepted.', Toast.TYPE_ERROR, Toast.TIME_LONG);
          } else
          if (HTTPException.statusCode===417) {
            new Toast('Could not update User, User you are trying to update already exist.', Toast.TYPE_ERROR, Toast.TIME_LONG);
          } else {
            new Toast('Could not update User', Toast.TYPE_ERROR, Toast.TIME_LONG);
          }
          this.setState({isButtonLocked: false});
          stopLoader();
        });
    }
  }

  getUserCount() {
    return http.get(`${CONSTANTS.API_URL}/api/user/count`,
      {status: this.state.status})
      .then((userCount) => {
        this.setState({totalPages:userCount});
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
        new Toast('List user failed', Toast.TYPE_ERROR, Toast.TIME_LONG);
      });
  }

  getUsersList() {
    startLoader();
    let response = [{
      name:'Manohar Sule',
      displayName: 'Manohar',
      mobile: '9876543210',
      email: 'manohar@gmail.com',
      isAdmin: false,
      branch: 'Pune'
    },{
      name:'Pallavi Kelgaonkar',
      displayName: 'Pallavi K',
      mobile: '9890710576',
      email: 'pallavi@gmail.com',
      isAdmin: true,
      branch: 'Mumbai'
    },{
      name:'Rutuja Dahatonde',
      displayName: 'D Rutuja',
      mobile: '8765439987',
      email: 'rutuja@gmail.com',
      isAdmin: false,
      branch: 'Guwahati'
    }
    ]
    // this.setState({userList:[], loadingUserList:true});
    this.setState({userList:response, loadingUserList:false});
    stopLoader();
    // const params = this.getSearchParams();

    // const params = {};
    // params.pageNo = pageNo || 1;
    // params.status = this.state.status;

    // return http.get(`${CONSTANTS.API_URL}/api/user`, params)
    //   .then((users) => {
    //     this.setState({
    //       currentPageNo: params.pageNo,
    //       userList:users,
    //       loadingUserList: false
    //     });
    //     if ( !users.length && this.state.totalPages > 1 ) {
    //       let pageCount = params.pageNo - 1;
    //       if (pageCount === 0) pageCount = 1;
    //       this.redirectToPreviousPage(pageCount);
    //       return;
    //     }
    //     stopLoader();
    //   }).catch((HTTPException) => {
    //     this.setState({loadingUserList:false});
    //     console.error(HTTPException);
    //     new Toast('List user failed', Toast.TYPE_ERROR, Toast.TIME_LONG);
    //     stopLoader();
    //   });
  }

  getSearchParams() {
    let params = {};

    if (this.state.status) {
      params['status'] = this.state.status;
    }
    if (this.state.currentPageNo) {
      if (this.state.currentPageNo === 0 || (!Number(this.state.currentPageNo))) {
        this.state.currentPageNo = 1;
      }
      params['pageNo'] = this.state.currentPageNo;
    }
    return params;
  }

  changeStatus(e) {
    this.setState({status:e.target.value, currentPageNo:1});
    this.getUserCount();
    this.getUsersList();
  }

  redirectToPreviousPage(pageCount) {
    this.setState({currentPageNo: pageCount});
    this.getUserCount();
    this.getUsersList();
  }

  onChangePageClick(pageNo) {
    this.setState({currentPageNo: pageNo});
    this.getUserCount();
    this.getUsersList();
  }


  componentWillMount() {
    this.state = {
      isUserAddModal: true,
      isEdit: true,
      userList: [],
      currentPageNo: 1,
      totalPages: 0,
      status: 'all',
      wardList: [],
      departmentList: [],
      zoneList: [],

      modalTitle: 'Create User',
      userName: '',
      displayName: '',
      userMobile: '',
      userEmail: '',
      userID: '',
      selectedRoleList: new Set(),
      selectedDepartmentList: new Set(),
      roleList : [],
      selectedRole: '',
      selectedDepartment: '',
      isAdmin: false,
      disable: false,
      isButtonLocked: false,
      // organizationCreationMethod: AppStore.get('userinfo').company.metadata.organizationCreationMethod,
      loadingUserList: false
    };
  }
  componentDidMount() {
    // this.getListOfDepartment();
    // this.getUserCount();
    this.getUsersList();
    // this.getRoleList();
  }

  search(e) {
    e.preventDefault();
    this.setState({status: e.target.value, currentPageNo: 1});
    this.getUserCount();
    this.getUsersList();
  }

  editUser(row) {
    this.toggleAddUser();
    this.setState({selectedWardList:new Set()});
    this.setState({selectedDepartmentList:new Set()});
    this.setState({selectedZoneList:new Set()});

    // row.departmentIDs.map((id) => {
    //   this.setState({selectedDepartment:id});
    //   this.onChangeDepartment();
    // });
    // row.roleIDs.map((id) => {
    //   this.setState({selectedRole:id});
    //   this.onChangeRole();
    // });

    this.setState({
      modalTitle: 'Edit User',
      userName: row.name,
      displayName: row.displayName,
      userMobile: row.mobile,
      userEmail: row.email,
      userID: row._id,
      isAdmin: row.isClientAdmin,
      disable: true
    });
  }

  removeDepartment(departmentID) {
    this.state.selectedDepartmentList.forEach((department)=>{  if (department._id === departmentID){this.state.selectedDepartmentList.delete(department);}});
    this.setState({selectedDepartmentList: this.state.selectedDepartmentList});
    if (this.state.selectedDepartmentList.size) {
      this.setState({selectedDepartment: Array.from(this.state.selectedDepartmentList)[0]._id});
    } else {
      this.setState({selectedDepartment: ''});
    }
  }

  onChangeDepartment() {
    let selectedDepartmentID = this.state.selectedDepartment;
    if (selectedDepartmentID) {
      const selectedDepartment = this.state.departmentList.find((department) => department._id === selectedDepartmentID);
      this.setState({selectedDepartmentList: this.state.selectedDepartmentList.add(selectedDepartment)});
    }
  }

  removeRole(roleID) {
    this.state.selectedRoleList.forEach((role)=>{  if (role._id === roleID){this.state.selectedRoleList.delete(role);}});
    this.setState({selectedRoleList: this.state.selectedRoleList});
    if (this.state.selectedRoleList.size) {
      this.setState({selectedRole: Array.from(this.state.selectedRoleList)[0]._id});
    } else {
      this.setState({selectedRole: ''});
    }
  }

  onChangeRole() {
    let selectedRoleId = this.state.selectedRole;
    if (selectedRoleId) {
      const selectedRole = this.state.roleList.find((role) => role._id === selectedRoleId);
      this.setState({selectedRoleList: this.state.selectedRoleList.add(selectedRole)});
    }
  }

  activeOrDeactiveUserConfirmation(row) {
    const action = row.deletedAt ? 'activate' : 'deactivate';
    let confirmMsg = confirm('Are you sure you want to  ' + action + ' user?');
    if (confirmMsg) {
      this.activeOrDeactiveUser(row, action);
    }
  }

  activeOrDeactiveUser(row, action) {
    startLoader();
    return http.del(`${CONSTANTS.API_URL}/api/user/${row._id}/${action}`)
      .then(() => {
        this.getUserCount();
        this.getUsersList();
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
        stopLoader();
      });
  }

  render({}, {userList, status, isUserAddModal, departmentList, wardList, modalTitle, userName, userMobile, zoneList,
    userEmail, selectedWardList, selectedDepartmentList, isAdmin, disable, isButtonLocked, selectedZoneList,
    organizationCreationMethod, displayName,selectedRoleList,roleList}) {
    const columns = ['Name', 'Display Name','Department','Mobile','Email', 'Action'];
    return (
      <div>
        <div class="main">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <span style="font-size:20px"><em class="icon icon-user is-small"/> Users</span>
            </div>
          </section>
          <section class="row">
            <div class="column no-padding">
              <div class="box">
                <div class="row">
                  <div class="column column-20">
                    <select name='status' className={status ? 'active-option' : ''}
                      value={status} onChange={this.search.bind(this)}>
                      <option value="all">All</option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                  </div>
                  <div class="column column-20">
                    <select name='city' >
                      <option value='' selected>Select Branch</option>
                      <option value=''>Pune</option>
                      <option value=''>Guwahati</option>
                      <option value=''>Mumbai</option>
                    </select>
                  </div>
                  <div class="column has-text-right">
                    <button class="has-text-right" type="button" onClick={this.toggleAddUser.bind(this)}>Add User</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="box table-section">
            <table>
              <thead>
                <tr>
                  {
                    columns.map((col) => (<th>{col}</th>))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  (userList.map((row) => (
                    <tr>
                      <td>{row.name}</td>
                      <td>{row.displayName}</td>
                      <td>{row.branch}</td>
                      <td>{row.mobile || '-'}</td>
                      <td>{row.email}</td>
                      <td>
                        {
                          !row.deletedAt &&
                          <button onClick={() => this.editUser(row)}>Edit</button>
                        }
                        {
                          !row.deletedAt &&
                          <button onClick={() => this.activeOrDeactiveUserConfirmation(row)}>Deactivate</button>
                        }
                        {
                          row.deletedAt &&
                          <button onClick={() => this.activeOrDeactiveUserConfirmation(row)}>Activate</button>
                        }
                      </td>
                    </tr>
                  )))
                }
                {
                  !userList.length && this.state.loadingUserList && (
                    <span>Loading...</span>
                  )
                }
                {
                  !userList.length && !this.state.loadingUserList && (
                    <span>No Data Found</span>
                  )
                }
              </tbody>
            </table>
            {
              !isUserAddModal &&
            (<Modal title={modalTitle} modalSize="is-medium" onClose={this.toggleAddUser.bind(this)}>
              <form name="Add User" onSubmit={this.createOrEditUser.bind(this)}>
                <ModalBody>
                  <div class="row">
                    <div class="column">
                      <label>Admin User?</label>
                      <input type="checkbox" checked={isAdmin}  disabled={disable} onChange={LinkState(this, 'isAdmin')}/> Yes
                    </div>
                  </div>
                  <div class="row">
                    <div class="column">
                      <label>Name</label>
                      <input type="text" placeholder="Enter Name" name="name" value={userName} onInput={LinkState(this, 'userName')} required/>
                    </div>
                    <div class="column">
                      <label>Display name</label>
                      <input type="text" placeholder="Enter Display Name" name="displayName" maxlength="15" minlength="2"
                        value={displayName} onInput={LinkState(this, 'displayName')} required/>
                    </div>
                    {/*<div class="column">
                      <label>Mobile No.</label>
                      <input type="number" placeholder="Enter Mobile no." name="mobile" min="1000000000" max="9999999999"
                        value={userMobile} onInput={LinkState(this, 'userMobile')}/>
                    </div>*/}

                  </div>
                  <div class="row">
                    <div class="column">
                      <label>Email</label>
                      <input type="email" placeholder="Enter Email" name="email" value={userEmail} onInput={LinkState(this, 'userEmail')} required/>
                    </div>
                    <div class="column">
                      <label>Mobile No.</label>
                      <input type="text" placeholder="Enter Mobile no." name="mobile" value={userMobile} maxlength="10"
                        title="You must enter valid Mobile Number." pattern="[7|8|9|][0-9]{9}$" onInput={LinkState(this, 'userMobile')}/>
                    </div>

                  </div>



                  <div class="row">
                    <div class="column">
                      <label>Roles</label>
                      <select value={this.state.selectedRole} name="ward" onChange={this.onChangeRole} onInput={LinkState(this, 'selectedRole')} >
                        <option value="">Select Role</option>

                        {roleList.map((value, index) => {
                          return (
                            <option value={value._id} key={index} >{value.name}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div class="column">
                      <label>Assigned Roles</label> <br/>
                      {Array.from(selectedRoleList).map((value) => {
                        return (
                          <span class="tag">{value.name}
                            <a class="delete" onClick={() => this.removeRole(value._id)}/>
                          </span>
                        );
                      })}

                    </div>
                  </div>
                  {
                    !isAdmin && (organizationCreationMethod === 'zonewise') &&
                      <div class="row">
                        <div class="column">
                          <label>Zones</label>
                          <span class="select">
                            <select value={this.state.selectedZone} id="zone" name="zone" onChange={this.onChangeZone.bind(this)}
                              onInput={LinkState(this, 'selectedZone')}>
                              <option value="">Select Zone</option>
                              {zoneList.map((value, index) => {
                                if (value.deletedAt === null) {
                                  return (
                                    <option value={value._id} key={index} >{value.displayName}</option>
                                  );
                                }
                              })}
                            </select>
                          </span>
                        </div>
                        <div class="column">
                          <label>Assigned Zones</label>
                          {Array.from(selectedZoneList).map((value) => {
                            return (
                              <span class="tag">{value.displayName}
                                <a class="delete" onClick={() => this.removeZone(value._id)}/>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                  }

                  {
                    !isAdmin && (organizationCreationMethod === 'wardwise' || organizationCreationMethod === 'zonewardwise') &&
                      <div class="row">
                        <div class="column">
                          <label>Wards</label>
                          <span class="select">
                            <select value={this.state.selectedWard} name="ward" onChange={this.onChangeWard.bind(this)}
                              onInput={LinkState(this, 'selectedWard')}>
                              <option value="">Select Ward</option>
                              {wardList.map((value, index) => {
                                if (value.deletedAt === null) {
                                  return (
                                    <option value={value._id} key={index} >{value.displayName}</option>
                                  );
                                }
                              })}
                            </select>
                          </span>
                        </div>
                        <div class="column">
                          <label>Assigned Wards</label>
                          {Array.from(selectedWardList).map((value) => {
                            return (
                              <span class="tag">{value.displayName}
                                <a class="delete" onClick={() => this.removeWard(value._id)}/>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                  }
                </ModalBody>
                <ModalFooter>
                  <button type="reset" class="button-clear" onClick={this.toggleAddUser.bind(this)}>Cancel</button>
                  <button type="submit" disabled={isButtonLocked}>Save</button>
                </ModalFooter>
              </form>
            </Modal>)
            }
            {/*
            T1667 UI Issues - 25/8/2018
            Developer - Shrutika Khot
            Date - 25/08/18
            Comment - 'has-text-right column no-padding pagination' class applied to Pagination component.
          */}
            <div class="row">
              <div class="has-text-right column no-padding pagination">
                <Pagination count={this.state.totalPages} currentPageNo={this.state.currentPageNo} onChangePageClick={this.onChangePageClick.bind(this)} />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
