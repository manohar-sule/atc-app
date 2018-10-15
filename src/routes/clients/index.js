import { h, Component } from 'preact';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
import CONSTANTS from '../../lib/constants';
import http from 'fetch-bb';
import { Toast } from '../../lib/toastr';
import LinkState from 'linkstate';
import { startLoader, stopLoader } from '../../lib/utils';
import Pagination from '../../components/pagination';
import { route } from 'preact-router';
import SideBar from '../../components/sideBar';

export default class Clients extends Component {

  toggleAddRole() {
    this.setState({
      isRoleAddModal: !this.state.isRoleAddModal,
      name: '',
      displayName: '',
      modalTitle: 'Create Role'
    });
  }

  search(e) {
    e.preventDefault();
    this.setState({status: e.target.value});
    this.getRoleCount();
    this.getRoleList();
  }

  getRoleCount() {
    return http
      .get(`${CONSTANTS.API_URL}/api/roleCount`, {status:this.state.status})
      .then((count) => {
        this.setState({ totalPages:count });
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
      });
  }

  getRoleList() {
    let response=[{
      name: 'Role 1',
      displayName: 'Display Name 1'
    }];
    this.setState({loadingRoleList: true});
    startLoader();
    this.setState({role: response, loadingRoleList: false});
    stopLoader();
    // const params = this.getSearchParams();
    // params.pageSize = 10;
    // return http
    //   .get(`${CONSTANTS.API_URL}/api/role`, params)
    //   .then((resp) => {
    //     this.setState({role: resp, loadingRoleList: false});
    //     if ( !resp.length && this.state.totalPages > 1 ) {
    //       let pageCount = params.pageNo - 1;
    //       if (pageCount === 0) pageCount = 1;
    //       if (this.state.isTotalPagesCount) {
    //         this.state.isTotalPagesCount = false;
    //         pageCount = this.state.totalPages;
    //       }
    //       this.redirectToPreviousPage(pageCount);
    //       return;
    //     }
    //     stopLoader();
    //   })
    //   .catch((HTTPException) => {
    //     this.setState({loadingRoleList: false});
    //     console.error(HTTPException);
    //     stopLoader();
    //   });
  }

  redirectToPreviousPage(pageCount) {
    this.setState({
      currentPageNo: pageCount
    });

    route(location.pathname);
    this.getRoleCount();
    this.getRoleList();
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

  createOrEditDepartment(e) {
    e.preventDefault();
    this.setState({isButtonLocked: true});

    const role = {
      name: e.target.name.value,
      displayName: e.target.displayName.value
    };
    let url;
    if (this.state.modalTitle === 'Create Role') {
      url = `${CONSTANTS.API_URL}/api/role`;
      this.toggleAddRole();
      this.getRoleList();
      this.state.isButtonLocked = false;
      new Toast('Role created successfully', Toast.TYPE_DONE, Toast.TIME_LONG);
    } else if (this.state.modalTitle === 'Edit Role'){

      this.toggleAddRole();
      // this.getRoleCount();
      this.getRoleList();
      this.state.isButtonLocked = false;
      new Toast('Role updated successfully', Toast.TYPE_DONE, Toast.TIME_LONG);
      return;
      // return http.put(`${CONSTANTS.API_URL}/api/role/${this.state.roleID}`, role)
      //   .then(() => {
      //     this.toggleAddRole();
      //     this.getRoleCount();
      //     this.getRoleList();
      //     this.state.isButtonLocked = false;
      //     new Toast('Role updated successfully', Toast.TYPE_DONE, Toast.TIME_LONG);
      //   })
      //   .catch((HTTPException) => {
      //     console.error(HTTPException.message);
      //     if (HTTPException.statusCode===400) {
      //       new Toast('Empty Fields are not accepted.', Toast.TYPE_ERROR, Toast.TIME_LONG);
      //     } else
      //     if (HTTPException.statusCode===417) {
      //       new Toast('Could not update Role, Role you are trying to create already exist.', Toast.TYPE_ERROR, Toast.TIME_LONG);
      //     } else {
      //       new Toast('Could not update Role', Toast.TYPE_ERROR, Toast.TIME_LONG);
      //     }
      //     this.setState({isButtonLocked: false});
      //   });
    }

    return http
      .post(url, role)
      .then(() => {
        this.toggleAddRole();
        this.getRoleCount();
        this.getRoleList();
        this.state.isButtonLocked = false;
        new Toast('Role created successfully', Toast.TYPE_DONE, Toast.TIME_LONG);
      })
      .catch((HTTPException) => {
        console.error(HTTPException.message);
        if (HTTPException.statusCode===400) {
          new Toast('Empty Fields are not accepted.', Toast.TYPE_ERROR, Toast.TIME_LONG);
        } else
        if (HTTPException.statusCode===417) {
          new Toast('Could not create Role, Role you are trying to create already exist.', Toast.TYPE_ERROR, Toast.TIME_LONG);
        } else {
          new Toast('Could not create Role', Toast.TYPE_ERROR, Toast.TIME_LONG);
        }
        this.setState({isButtonLocked: false});
      });
  }

  deleteRole(row, action) {
    return http.del(`${CONSTANTS.API_URL}/api/role/${row._id}/${action}`)
      .then(() => {
        new Toast('Role '+action+'d successfully', Toast.TYPE_DONE, Toast.TIME_LONG);
        this.getRoleCount();
        this.getRoleList();
      }).catch((HTTPException) => {
        console.error(HTTPException);
        new Toast('Could not '+action+' Role', Toast.TYPE_DONE, Toast.TIME_LONG);
      });
  }

  openDeleteRole(row) {
    const action = row.deletedAt ? 'activate' : 'deactivate';
    let confirmMsg = 'Are you sure you want to  ' + action + ' this Role?';
    if (action === 'deactivate') {
      confirmMsg =  `If Role is deactivated then you are not able to assign this `
        + `Role to other objects, but privious association remain same. ${confirmMsg}`;
    }
    let confirmResponse = confirm(confirmMsg);
    if (confirmResponse === true) {
      this.deleteRole(row, action);
    }
  }

  onChangePageClick(pageNo) {
    this.setState({currentPageNo: pageNo});
    let url = location.pathname;

    route(url);
    this.getRoleCount();
    this.getRoleList();
  }

  editDepartment(row) {
    this.toggleAddRole();
    this.setState({
      modalTitle: 'Edit Role',
      name: row.name,
      displayName: row.displayName,
      roleID: row._id
    });
  }

  componentWillMount() {
    this.state = {
      totalPages: 0,
      currentPageNo: 1,
      role: [],
      status:'active',
      isRoleAddModal: true,
      isButtonLocked: false,
      name: '',
      displayName: '',
      modalTitle: 'Create Role',
      roleID: '',
      loadingRoleList: false
    };
  }

  componentDidMount() {
    this.getRoleCount();
    this.getRoleList();
  }

  render({}, { role, isRoleAddModal, isButtonLocked, modalTitle, name, displayName, status }) {

    const columns = ['Name', 'Display Name', 'Action'];
    console.log(role);
    return (
      <div>
        <SideBar activeMenu="/roles" />
        <div class="main">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <span style="font-size:20px"><em class="icon icon-user is-small"/> Clients</span>
            </div>
          </section>
          <section class="row">
            <div class="column no-padding">
              <div class="box">
                <div class="row">
                <div class="column column-20 float-right search-box">
                      <em class="icon icon-search" />
                      <input type="text" id="search" placeholder="Enter Client Name"
                        name="search" value="" />
                    </div>
                  <div class="column has-text-right">
                    <button type="button" onClick={this.toggleAddRole.bind(this)}>Add Client</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="box">
            <table>
              <thead>
                <tr>
                  {columns.map((col) => (<th>{col}</th>))}
                </tr>
              </thead>
              <tbody>
                {
                  (role.map((row) => (<tr>
                    <td>{row.name}</td>
                    <td>{row.displayName}</td>
                    <td>
                      <button  onClick={this.editDepartment.bind(this, row)}>Edit</button>
                      {
                        !row.deletedAt &&
                        <button  onClick={this.openDeleteRole.bind(this, row)}>Deactivate</button>
                      }
                      {
                        row.deletedAt &&
                        <button onClick={this.openDeleteRole.bind(this, row)}>Activate</button>
                      }
                    </td>
                  </tr>)))
                }
                {
                  !role.length && this.state.loadingRoleList && (
                    <span>Loading...</span>
                  )
                }
                {!role.length && !this.state.loadingRoleList && (<span>No Data Found</span>)}
              </tbody>
            </table>
            <div class="has-text-right column no-padding pagination">
              <Pagination count={this.state.totalPages} currentPageNo={this.state.currentPageNo} onChangePageClick={this.onChangePageClick.bind(this)} />
            </div>
          </div>
          {
            !isRoleAddModal && (
              <Modal title={modalTitle} modalSize="is-medium" onClose={this.toggleAddRole.bind(this)}>
                <form name="Add Role" onSubmit={this.createOrEditDepartment.bind(this)}>
                  <ModalBody>
                    <div class="row">
                      <div class="column column-50">
                        <label>Name</label>
                        <input type="text" placeholder="Enter Name" name="name" value={name} onInput={LinkState(this, 'name')} required="required"/>
                      </div>
                      <div class="column column-50">
                        <label>Display name</label>
                        <input type="text" placeholder="Enter Display Name" name="displayName" value={displayName}
                          onInput={LinkState(this, 'displayName')} required="required"/>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button type="reset" class="button-clear" onClick={this.toggleAddRole.bind(this)}>Cancel</button>
                    <button disabled={isButtonLocked}>Save</button>
                  </ModalFooter>
                </form>
              </Modal>)
          }
        </div>
      </div>
    );
  }
}
