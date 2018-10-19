import { h, Component } from 'preact';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
import CONSTANTS from '../../lib/constants';
import http from 'fetch-bb';
import { Toast } from '../../lib/toastr';
import LinkState from 'linkstate';
import { startLoader, stopLoader } from '../../lib/utils';
import Pagination from '../../components/pagination';
import { Link, route } from 'preact-router';
// import SideBar from '../../components/sideBar';

export default class Consignments extends Component {

  toggleAddClient() {
    this.setState({
      isClientAddModal: !this.state.isClientAddModal,
      name: '',
      displayName: '',
      modalTitle: 'Add Client'
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
      name: 'Nissin Noodles',
      displayName: 'Nissin Noodles',
      address: {
        line1: 'line1',
        line2: 'line2',
        city: 'Pune',
        state: 'Maharashtra'
      },
      type: 'Full Load',
      rating:'3.5'
    },{
      name: 'MRF Tyres',
      displayName: 'MRF Tyres',
      address: {
        line1: 'line1',
        line2: 'line2',
        city: 'Pune',
        state: 'Maharashtra'
      },
      type: 'Full Load',
      rating:'5.0'
    },{
      name: 'TATA Batteries',
      displayName: 'TATA Batteries',
      address: {
        line1: 'line1',
        line2: 'line2',
        city: 'Pune',
        state: 'Maharashtra'
      },
      type: 'Partial Load',
      rating:'4.5'
    },{
      name: 'Haldiraam',
      displayName: 'Haldiraam',
      address: {
        line1: 'line1',
        line2: 'line2',
        city: 'Pune',
        state: 'Maharashtra'
      },
      type: 'Full Load',
      rating:'6.5'
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

    if (this.state.modalTitle === 'Add Client') {
      this.toggleAddClient();
      this.state.isButtonLocked = false;
      new Toast('Client created successfully', Toast.TYPE_DONE, Toast.TIME_LONG);
    } else if (this.state.modalTitle === 'Edit Client'){

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
    this.toggleAddClient();
    this.setState({
      modalTitle: 'Edit Client',
      name: row.name,
      displayName: row.displayName,
      clientID: row._id,
      address:{
        line1: row.address.line1,
        line2: row.address.line2,
        city: row.address.city,
        state: row.address.state
      }
    });
  }
  clientDetailClick() {
    route('/client/2423');
  }

  componentWillMount() {
    this.state = {
      isConsignmentDetailsModalOpen: false,
      totalPages: 0,
      currentPageNo: 1,
      clientList: [],
      status:'active',
      isClientAddModal: true,
      isButtonLocked: false,
      name: '',
      displayName: '',
      modalTitle: 'Add Client',
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

  toggleConsignmentDetails() {
    this.setState({isConsignmentDetailsModalOpen: !this.state.isConsignmentDetailsModalOpen});
  }

  render({}, { isClientAddModal, isButtonLocked, modalTitle, name, displayName, address }) {
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <span style="font-size:20px"><em class="icon icon-paper-plane-o is-small" /> Consignments</span>
            </div>
          </section>
          <section class="row">
            <div class="column no-padding">
              <div class="box">
                <div class="row">
                  <div class="column column-20 float-right search-box">
                    <em class="icon icon-search" />
                    <input type="text" id="search" placeholder="Enter Consignment ID"
                      name="search" value="" />
                  </div>
                  <div class="column has-text-right">
                    <button type="button" onClick={this.toggleAddClient.bind(this)}>Add Consignment</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="box">
            <table>
              <thead>
                <tr>
                  <th>Consignment ID</th>
                  <th>Source<br/>Branch</th>
                  <th>Target<br/>Branch</th>
                  <th>Vendor</th>
                  <th>Vehicle<br/>Number</th>
                  <th>LR<br/>Number</th>
                  <th>Estimated<br/>Cost</th>
                  <th>Advance<br/>Amount</th>
                  <th>Actual<br/>Billing Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123455</td>
                  <td>Pune</td>
                  <td>Bangalore</td>
                  <td>ABC Transport</td>
                  <td>MH 14 AB 1234</td>
                  <td><Link>View</Link></td>
                  <td>10,000</td>
                  <td>5,000</td>
                  <td>15,000</td>
                  <td>
                    <button onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                    <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>View Bill</button>
                  </td>
                </tr>
                <tr>
                  <td>122345</td>
                  <td>Pune</td>
                  <td>Bangalore</td>
                  <td>ABC Transport</td>
                  <td>MH 14 AB 1234</td>
                  <td><Link>View</Link></td>
                  <td>10,000</td>
                  <td>5,000</td>
                  <td>15,000</td>
                  <td>
                    <button onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                    <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>View Bill</button>
                  </td>
                </tr>
                <tr>
                  <td>112345</td>
                  <td>Pune</td>
                  <td>Bangalore</td>
                  <td>ABC Transport</td>
                  <td>MH 14 AB 1234</td>
                  <td><Link>View</Link></td>
                  <td>10,000</td>
                  <td>5,000</td>
                  <td>15,000</td>
                  <td>
                    <button onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                    <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>View Bill</button>
                  </td>
                </tr>
                <tr>
                  <td>123445</td>
                  <td>Pune</td>
                  <td>Bangalore</td>
                  <td>ABC Transport</td>
                  <td>MH 14 AB 1234</td>
                  <td><Link>View</Link></td>
                  <td>10,000</td>
                  <td>5,000</td>
                  <td>15,000</td>
                  <td>
                    <button onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                    <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>View Bill</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="has-text-right column no-padding pagination">
              <Pagination count={this.state.totalPages} currentPageNo={this.state.currentPageNo} onChangePageClick={this.onChangePageClick.bind(this)} />
            </div>
          </div>
          {
            !isClientAddModal && (
              <Modal title={modalTitle} modalSize="is-medium" onClose={this.toggleAddClient.bind(this)}>
                <form name="Add Consignment">
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
                    <button type="reset" class="button-clear" onClick={this.toggleAddClient.bind(this)}>Cancel</button>
                    <button disabled={isButtonLocked}>Save</button>
                  </ModalFooter>
                </form>
              </Modal>)
          }
        </div>
        {
          this.state.isConsignmentDetailsModalOpen &&
          <Modal title="Track Consignment" modalSize="is-large" onClose={this.toggleConsignmentDetails.bind(this)}>
            <ModalBody>
              <label style="font-size:1.1em;">Consignment Details</label>
              <div class="row">
                <div class="column no-padding">
                  <div>
                    <span>Consignment Number - </span>
                    <span><strong>P123456</strong></span>
                  </div>
                  <div>
                    <span>Current Status - </span>
                    <span><strong>Not Available</strong></span>
                  </div>
                </div>
                <div class="column">
                  <div>
                    <span>Booked Date - </span>
                    <span><strong>18/08/2018</strong></span>
                  </div>
                  <div>
                    <span>Delivered Date - </span>
                    <span><strong>22/08/2018</strong></span>
                  </div>
                </div>
              </div>
              <hr/>
              <label style="font-size:1.1em;margin:10px 0 5px">Shipment Details</label>
              <div class="row">
                <div class="column no-padding">
                  <ul id="progress">
                    <li>Booked & Dispatch</li>
                    <li>In Transit</li>
                    <li>At Destination</li>
                    <li>Out for Delivery</li>
                    <li class="active">Delivered</li>
                  </ul>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="column no-padding">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Activity</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Thu,20th Sep-18|13:08 Hrs</td>
                        <td>Successfully Delivered</td>
                        <td>Viman Nagar, Pune</td>
                      </tr>
                      <tr>
                        <td>Thu,20th Sep-18|02:48 Hrs</td>
                        <td>Out for Delivery</td>
                        <td>Viman Nagar, Pune (PUNE - WADGAON SHERI)</td>
                      </tr>
                      <tr>
                        <td>Wed,19th Sep-18|19:00 Hrs</td>
                        <td>In Transit</td>
                        <td>Pune Hub</td>
                      </tr>
                      <tr>
                        <td>Tue,18th Sep-18|14:12 Hrs</td>
                        <td>Booked</td>
                        <td>Pune Hub</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" onClick={this.toggleConsignmentDetails.bind(this)}>Close</button>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }
}
