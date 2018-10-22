import { h, Component } from 'preact';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
import CONSTANTS from '../../lib/constants';
import http from 'fetch-bb';
import { Toast } from '../../lib/toastr';
import LinkState from 'linkstate';
import { startLoader, stopLoader } from '../../lib/utils';
import Pagination from '../../components/pagination';
import { route } from 'preact-router';
// import SideBar from '../../components/sideBar';

export default class Vendors extends Component {

  toggleAddClient() {
    this.setState({
      isClientAddModal: !this.state.isClientAddModal,
      name: '',
      displayName: '',
      modalTitle: 'Add Vendor'
    });
  }

  search(e) {
    e.preventDefault();
    this.setState({status: e.target.value});
    // this.getClientCount();
    this.getClientList();
  }

  getClientCount() {
    return http
      .get(`${CONSTANTS.API_URL}/api/roleCount`, {status:this.state.status})
      .then((count) => {
        this.setState({ totalPages:count });
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
      });
  }

  getClientList() {
    let response=[{
      name: 'Patil Transports',
      type: 'Truck',
      rating:'3.5',
      numberOfVehicles: 100,
      area: 'Pimpri',
      city: 'Pune',
      state: 'Maharashtra'
    },{
      name: 'Khurana Transports',
      type: 'Truck',
      rating:'5.0',
      numberOfVehicles: 400,
      area: 'Kharadi',
      city: 'Pune',
      state: 'Maharashtra'
    },{
      name: 'SK Transports',
      type: 'Truck',
      rating:'4.5',
      numberOfVehicles: 50,
      area: 'Pimpri',
      city: 'Pune',
      state: 'Maharashtra'
    },{
      name: 'Singh Brokers',
      type: 'Truck',
      rating:'6.5',
      numberOfVehicles: 200,
      area: 'Pashan',
      city: 'Pune',
      state: 'Maharashtra'
    }];
    this.setState({loadingClientList: true});
    startLoader();
    this.setState({clientList: response, loadingClientList: false});
    stopLoader();
    // const params = this.getSearchParams();
    // params.pageSize = 10;
    // return http
    //   .get(`${CONSTANTS.API_URL}/api/role`, params)
    //   .then((resp) => {
    //     this.setState({role: resp, loadingClientList: false});
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
    //     this.setState({loadingClientList: false});
    //     console.error(HTTPException);
    //     stopLoader();
    //   });
  }

  // redirectToPreviousPage(pageCount) {
  //   this.setState({
  //     currentPageNo: pageCount
  //   });
  //
  //   route(location.pathname);
  //   this.getClientCount();
  //   this.getClientList();
  // }


  createOrEditClient(e) {
    e.preventDefault();
    this.setState({isButtonLocked: true});

    if (this.state.modalTitle === 'Add Vendor') {
      this.toggleAddClient();
      this.state.isButtonLocked = false;
      new Toast('Client created successfully', Toast.TYPE_DONE, Toast.TIME_LONG);
    } else if (this.state.modalTitle === 'Edit Vendor'){

      this.toggleAddClient();
      this.state.isButtonLocked = false;
      new Toast('Client updated successfully', Toast.TYPE_DONE, Toast.TIME_LONG);

    }

  }

  onChangePageClick(pageNo) {
    this.setState({currentPageNo: pageNo});
    let url = location.pathname;

    route(url);
    // this.getClientCount();
    this.getClientList();
  }

  editClient(row) {
    this.setState({
      modalTitle: 'Edit Vendor',
      name: row.name,
      area: row.area,
      city: row.city,
      state: row.state,
      contactName: row.contactName,
      mobile: row.mobile,
      email: row.email,
      numberOfVehicles: row.numberOfVehicles
    });
    this.toggleAddClient();
  }
  clientDetailClick() {
    route('/vendor/2423');
  }

  componentWillMount() {
    this.state = {
      totalPages: 0,
      currentPageNo: 1,
      clientList: [],
      status:'active',
      isClientAddModal: true,
      isButtonLocked: false,
      name: '',
      displayName: '',
      modalTitle: 'Add Vendor',
      clientID: '',
      loadingClientList: false,
      address:{
        line1: '',
        line2: '',
        city: '',
        state: ''
      }
    };
  }

  componentDidMount() {
    // this.getClientCount();
    this.getClientList();
    if ( document.getElementById("gn-menu-nav").classList.contains('gn-open-all') ) {
      document.getElementById("main-body").classList.remove('margin-left-76');
      document.getElementById("main-body").classList.add('margin-left-266');
    } else {
      document.getElementById("main-body").classList.remove('margin-left-266');
      document.getElementById("main-body").classList.add('margin-left-76');
    }
  }

  render({}, { clientList, isClientAddModal, isButtonLocked, modalTitle, name, displayName, address }) {

    const columns = ['Name', 'Area', 'City', 'State', 'Rating', 'No. of Vehicles', 'Action'];
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <ul class="breadcrumbs">
                <li><a href="/home">Home</a></li>
                <li class="active">Vendors</li>
              </ul>
            </div>
          </section>
          <section class="row">
            <div class="column no-padding">
              <div class="box">
                <div class="row">
                  <div class="column has-text-right">
                    <button type="button" onClick={this.toggleAddClient.bind(this)}>Add Vendor</button>
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
                  (clientList.map((row) => (<tr>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                    <td>{row.area || '-'}</td>
                    <td>{row.city}</td>
                    <td>{row.state || '-'}</td>
                    <td>{row.rating || '-'}</td>
                    <td>{row.numberOfVehicles || '-'}</td>
                    <td>
                      <button  onClick={this.editClient.bind(this, row)}>Edit</button>
                      <button  onClick={this.clientDetailClick.bind(this, row)}>View Detail</button>
                    </td>
                  </tr>)))
                }
                {
                  !clientList.length && this.state.loadingClientList && (
                    <span>Loading...</span>
                  )
                }
                {!clientList.length && !this.state.loadingClientList && (<span>No Data Found</span>)}
              </tbody>
            </table>
            <div class="has-text-right column no-padding pagination">
              <Pagination count={this.state.totalPages} currentPageNo={this.state.currentPageNo} onChangePageClick={this.onChangePageClick.bind(this)} />
            </div>
          </div>
          {
            !isClientAddModal && (
              <Modal title={modalTitle} modalSize="is-medium" onClose={this.toggleAddClient.bind(this)}>
                <form name="Add Vendor" onSubmit={this.createOrEditClient.bind(this)}>
                  <ModalBody>
                    <div class="row">
                      <div class="column">
                        <label style="margin-bottom:5px">Vendor Information</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <label>Name</label>
                        <input type="text" name="name" value={name} onInput={LinkState(this, 'name')} required="required"/>
                      </div>
                      <div class="column">
                        <label>Type</label>
                        <input type="text" name="name" value={name} onInput={LinkState(this, 'name')} required="required"/>
                      </div>
                      <div class="column">
                        <label>No. of Vehicles</label>
                        <input type="text" name="displayName" value={displayName}
                          onInput={LinkState(this, 'displayName')} required="required"/>
                      </div>
                    </div>
                    <hr/>
                    <div class="row">
                      <div class="column">
                        <label style="margin-bottom:5px">Address Information</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <label>Area</label>
                        <input type="text" name="line1" value={address.line1} onInput={LinkState(this, 'address.line1')} required/>
                      </div>
                      <div class="column">
                        <label>City</label>
                        <input type="text" name="line2" value={address.line2} onInput={LinkState(this, 'address.line2')} required/>
                      </div>
                      <div class="column">
                        <label>State</label>
                        <input type="text" name="line2" value={address.line2} onInput={LinkState(this, 'address.line2')} required/>
                      </div>
                    </div>
                    <hr/>
                    <div class="row">
                      <div class="column">
                        <label style="margin-bottom:5px">Contact Person Information</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <label>Name</label>
                        <input type="text" name="city" value={address.city} onInput={LinkState(this, 'address.city')} required/>
                      </div>
                      <div class="column">
                        <label>Mobile</label>
                        <input type="text" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                      </div>
                      <div class="column">
                        <label>Email</label>
                        <input type="text" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <label>Address Line 1</label>
                        <input type="text" name="city" value={address.city} onInput={LinkState(this, 'address.city')} required/>
                      </div>
                      <div class="column">
                        <label>Address Line 2</label>
                        <input type="text" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <label>City</label>
                        <input type="text" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                      </div>
                      <div class="column">
                        <label>State</label>
                        <input type="text" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                      </div>
                    </div>
                    <hr/>
                    <div class="row">
                      <div class="column">
                        <label style="margin-bottom:5px">Taxation Information</label>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column">
                        <label>PAN Number</label>
                        <input type="text" name="city" value={address.city} onInput={LinkState(this, 'address.city')} required/>
                      </div>
                      <div class="column">
                        <label>TIN Number</label>
                        <input type="text" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                      </div>
                      <div class="column">
                        <label>GST Number</label>
                        <input type="text" name="state" value={address.state} onInput={LinkState(this, 'address.state')} required/>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button type="reset" class="button-clear" onClick={this.toggleAddClient.bind(this)}>Cancel</button>
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
