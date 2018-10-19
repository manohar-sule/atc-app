import { h, Component } from 'preact';
import CONSTANTS from '../../lib/constants';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
import LinkState from 'linkstate';
import { Toast } from '../../lib/toastr';
import Pagination from '../../components/pagination';
import http from 'fetch-bb';
// import { AppStore } from '../../lib/store';
import { startLoader, stopLoader} from '../../lib/utils';
import SideBar from '../../components/sideBar';
export default class Branches extends Component {


  toggleAddBranch() {
    this.setState({
      isBranchAddModal: !this.state.isBranchAddModal,
      modalTitle: 'Create Branch',
      disable: false,
      name: '',
      displayName: '',
      address:{
        line1: '',
        line2: '',
        city: '',
        state: ''
      },
      branchID: '',
      isHeadOffice: false,
      isWareHouse: false
    });
  }

  createOrEditBranch(e) {
    e.preventDefault();
    this.setState({isButtonLocked: true});
    startLoader();
    if (this.state.modalTitle === 'Create Branch') {
      this.toggleAddBranch();
      this.setState({isButtonLocked: false});
      new Toast('Branch created successfully.', Toast.TYPE_DONE, Toast.TIME_LONG);
      stopLoader();
    } else if (this.state.modalTitle === 'Edit Branch') {
      this.toggleAddBranch();
      this.setState({isButtonLocked: false});
      new Toast('Branch updated successfully.', Toast.TYPE_DONE, Toast.TIME_LONG);
      stopLoader();
    }
  }

  // getUserCount() {
  //   return http.get(`${CONSTANTS.API_URL}/api/user/count`,
  //     {status: this.state.status})
  //     .then((userCount) => {
  //       this.setState({totalPages:userCount});
  //     })
  //     .catch((HTTPException) => {
  //       console.error(HTTPException);
  //       new Toast('List user failed', Toast.TYPE_ERROR, Toast.TIME_LONG);
  //     });
  // }

  getUsersList() {
    startLoader();
    let response = [{
      _id:'1234',
      name: 'Pune Head Office',
      displayName: 'Pune Head Office',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Pune',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '14/10/2018'
    },{
      _id:'12345',
      name: 'Assam Head Office',
      displayName: 'Assam Head Office',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Guwahati',
        state: 'Assam'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: true,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    },{
      _id:'123456',
      name: 'Andheri',
      displayName: 'Andheri',
      address: {
        line1: 'Line one',
        line2: 'Line Two',
        city: 'Mumbai',
        state: 'Maharashtra'
      },
      isHeadOffice: false,
      isWareHouse: true,
      createdAt: '02/07/2018'
    }
    ];
    this.setState({userList:[], loadingBranchList:true});
    // const params = this.getSearchParams();
    this.setState({
      userList:response,
      loadingBranchList: false
    });
    stopLoader();

    // return http.get(`${CONSTANTS.API_URL}/api/user`, params)
    //   .then((users) => {
    //     this.setState({
    //       currentPageNo: params.pageNo,
    //       userList:users,
    //       loadingBranchList: false
    //     });
    //     if ( !users.length && this.state.totalPages > 1 ) {
    //       let pageCount = params.pageNo - 1;
    //       if (pageCount === 0) pageCount = 1;
    //       this.redirectToPreviousPage(pageCount);
    //       return;
    //     }
    //     stopLoader();
    //   }).catch((HTTPException) => {
    //     this.setState({loadingBranchList:false});
    //     console.error(HTTPException);
    //     new Toast('List user failed', Toast.TYPE_ERROR, Toast.TIME_LONG);
    //     stopLoader();
    //   });
  }

  // getSearchParams() {
  //   let params = {};
  //
  //   if (this.state.status) {
  //     params['status'] = this.state.status;
  //   }
  //   if (this.state.currentPageNo) {
  //     if (this.state.currentPageNo === 0 || (!Number(this.state.currentPageNo))) {
  //       this.state.currentPageNo = 1;
  //     }
  //     params['pageNo'] = this.state.currentPageNo;
  //   }
  //   return params;
  // }

  changeStatus(e) {
    this.setState({status:e.target.value, currentPageNo:1});
    this.getUsersList();
  }

  redirectToPreviousPage(pageCount) {
    this.setState({currentPageNo: pageCount});
    this.getUsersList();
  }

  onChangePageClick(pageNo) {
    this.setState({currentPageNo: pageNo});
    this.getUsersList();
  }


  componentWillMount() {
    this.state = {
      isBranchAddModal: true,
      isEdit: true,
      userList: [],
      currentPageNo: 1,
      totalPages: 0,
      status: 'all',
      modalTitle: 'Create Branch',
      name: '',
      displayName: '',
      address:{
        line1: '',
        line2: '',
        city: '',
        state: ''
      },
      branchID: '',
      isHeadOffice: false,
      isWareHouse: false,
      disable: false,
      isButtonLocked: false,
      loadingBranchList: false
    };
  }
  componentDidMount() {
    // this.getBranchList();
    // this.getListOfDepartment();
    // this.getUserCount();
    this.getUsersList();
    // this.getRoleList();
    if ( document.getElementById("gn-menu-nav").classList.contains('gn-open-all') ) {
      document.getElementById("main-body").classList.remove('margin-left-76');
      document.getElementById("main-body").classList.add('margin-left-266');
    } else {
      document.getElementById("main-body").classList.remove('margin-left-266');
      document.getElementById("main-body").classList.add('margin-left-76');
    }
  }

  search(e) {
    e.preventDefault();
    this.getUsersList();
  }

  editUser(row) {
    this.toggleAddBranch();
    this.setState({
      modalTitle: 'Edit Branch',
      name: row.name,
      displayName: row.displayName,
      address: {
        line1: row.address.line1,
        line2: row.address.line2,
        city: row.address.city,
        state: row.address.state
      },
      branchID: row._id,
      isHeadOffice: row.isHeadOffice,
      isWareHouse: row.isWareHouse,
      disable: true
    });
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

  render({}, {userList, status, isBranchAddModal, modalTitle, name, isHeadOffice, isWareHouse, disable, isButtonLocked,
    displayName, address}) {
    const columns = ['Sr.No', 'Name', 'Display Name','City','State','Created At', 'Action'];
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <span style="font-size:20px"><em class="icon icon-plane is-small"/> Branches</span>
            </div>
          </section>
          <section class="row">
            <div class="column no-padding">
              <div class="box">
                <div class="row">
                  <div class="column column-20 float-right search-box">
                    <em class="icon icon-search" />
                    <input type="text" id="search" placeholder="Enter Branch Name"
                      name="search" value=""  style="margin-bottom: 0px !important;" />
                  </div>
                  <div class="column column-20">
                    <select name='status' className={status ? 'active-option' : ''}
                      value={status} onChange={this.search.bind(this)} style="margin-bottom: 0px !important;">
                      <option value="all">All</option>
                      <option value='active'>Active</option>
                      <option value='inactive'>Inactive</option>
                    </select>
                  </div>
                  <div class="column column-20">
                    <select name='city' style="margin-bottom: 0px !important;">
                      <option value='' selected>Select Department</option>
                      <option value=''>Department 1</option>
                    </select>
                  </div>
                  <div class="column has-text-right">
                    <button class="has-text-right" type="button" onClick={this.toggleAddBranch.bind(this)}>Add Branch</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="box">
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
                  (userList.map((row, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{row.name}
                        {
                          (row.isHeadOffice) && (
                            <span class="tag is-warning is-small-tag">HO</span>
                          )
                        }
                        {
                          (row.isWareHouse) && (
                            <span class="tag is-warning is-small-tag">WH</span>
                          )
                        }
                      </td>
                      <td>{row.displayName}</td>
                      <td>{row.address.city}</td>
                      <td>{row.address.state || '-'}</td>
                      <td>{row.createdAt}</td>
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
                  !userList.length && this.state.loadingBranchList && (
                    <span>Loading...</span>
                  )
                }
                {
                  !userList.length && !this.state.loadingBranchList && (
                    <span>No Data Found</span>
                  )
                }
              </tbody>
            </table>
            {
              !isBranchAddModal &&
            (<Modal title={modalTitle} modalSize="is-medium" onClose={this.toggleAddBranch.bind(this)}>
              <form name="Add User" onSubmit={this.createOrEditBranch.bind(this)}>
                <ModalBody>
                  <div class="row">
                    <div class="column">
                      <label>Head Office?</label>
                      <input type="checkbox" checked={isHeadOffice}  disabled={disable} onChange={LinkState(this, 'isHeadOffice')}/> Yes
                    </div>
                    <div class="column">
                      <label>Ware House?</label>
                      <input type="checkbox" checked={isWareHouse}  disabled={disable} onChange={LinkState(this, 'isWareHouse')}/> Yes
                    </div>
                  </div>
                  <div class="row">
                    <div class="column">
                      <label>Name</label>
                      <input type="text" placeholder="Enter Name" name="name" value={name} onInput={LinkState(this, 'name')} required/>
                    </div>
                    <div class="column">
                      <label>Display name</label>
                      <input type="text" placeholder="Enter Display Name" name="displayName" maxlength="15" minlength="2"
                        value={displayName} onInput={LinkState(this, 'displayName')} required/>
                    </div>

                  </div>
                  <div class="row">
                    <div class="column">
                      <label>Address Line 1</label>
                      <input type="text" placeholder="Line 1" name="line1" value={address.line1} onInput={LinkState(this, 'address.line1')} required/>
                    </div>
                    <div class="column">
                      <label>Address Line 2</label>
                      <input type="text" placeholder="Line 2" name="line2" value={address.line2} onInput={LinkState(this, 'address.line2')} required/>
                    </div>
                    </div>

                  <div class="row">
                    <div class="column">
                      <label>City</label>
                      <input type="text" placeholder="City" name="city" value={address.city} onInput={LinkState(this, 'address.city')} required/>
                    </div>
                    <div class="column">
                      <label>State</label>
                      <input type="text" placeholder="State" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                    </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                  <button type="reset" class="button-clear" onClick={this.toggleAddBranch.bind(this)}>Cancel</button>
                  <button type="submit" disabled={isButtonLocked}>Save</button>
                </ModalFooter>
              </form>
            </Modal>)
            }
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
