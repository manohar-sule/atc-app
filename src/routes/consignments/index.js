import { h, Component } from 'preact';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
import CONSTANTS from '../../lib/constants';
import http from 'fetch-bb';
import { Toast } from '../../lib/toastr';
import LinkState from 'linkstate';
import { startLoader, stopLoader } from '../../lib/utils';
import Pagination from '../../components/pagination';
import { Link, route } from 'preact-router';
// import Breadcrumbs from '../../components/breadcrumbs';

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
      isLRViewModalOpen: false,
      isBillViewModalOpen: false,
      tabActiveforEnroll: 'step1',
      isAddMaterialModalOpen: false,
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
      tabActive: 'In Transit',
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
    this.openTab();
  }

  toggleConsignmentDetails() {
    this.setState({isConsignmentDetailsModalOpen: !this.state.isConsignmentDetailsModalOpen});
  }

  toggleLRView() {
    this.setState({isLRViewModalOpen: !this.state.isLRViewModalOpen});
  }

  toggleBillView() {
    this.setState({isBillViewModalOpen: !this.state.isBillViewModalOpen});
  }

  goToDetails() {
    route('/consignment/12345');
  }

  toggleAddConsignment() {
    this.setState({isAddConsignmentModalOpen: !this.state.isAddConsignmentModalOpen});
  }

  openTabForEnrolling(tabName) {
    this.setState({tabActiveforEnroll: tabName});
  }

  toggleAddMaterial() {
    this.setState({isAddMaterialModalOpen: !this.state.isAddMaterialModalOpen});
  }

  openTab(tabName) {
    // console.log(tabName);
    // let i, x;
    // x = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < x.length; i++) {
    //   x[i].style.display = "none";
    // }
    // console.log(document);
    // document.getElementById(tabName).style.display = "block";

    this.setState({ tabActive: tabName });
  }

  render({}, { isClientAddModal, isButtonLocked, modalTitle, name, displayName, address }) {
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <ul class="breadcrumbs">
                <li><a href="/home">Home</a></li>
                <li class="active">Consignments</li>
              </ul>
            </div>
          </section>
          <section class="row">
            <div class="column no-padding">
              <div class="box">
                <div class="row">
                  <div class="column has-text-right">
                    <button type="button" onClick={this.toggleAddConsignment.bind(this)}>Add Consignment</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="box no-padding">
            <div class="row">
              <div class="column no-padding">
                <div class="tabs" style="margin-bottom:0">
                  <ul>
                    <li id="Tab1" className={this.state.tabActive === 'In Transit' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'In Transit')}>In Transit </a>
                    </li>
                    <li id="Tab2" className={this.state.tabActive === 'Unbilled' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Unbilled')}>Unbilled</a>
                    </li>
                    <li id="Tab2" className={this.state.tabActive === 'Billed' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Billed')}>Billed</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <table style="padding:10px">
              <thead>
                <tr>
                  <th>Consignment<br/>Number</th>
                  <th>Booking<br/>Date</th>
                  <th>LR Number</th>
                  <th>Client<br/>Name</th>
                  <th>Special<br/>Number</th>
                  <th>Current<br/>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>123456</td>
                  <td>10/10/2018</td>
                  <td><Link href="#" onClick={this.toggleLRView.bind(this)}>001234</Link></td>
                  <td>Nissin Noodles</td>
                  <td>S1234</td>
                  <td>Banglore</td>
                  <td>
                    <button>
                      <em class="icon icon-edit-modify-streamline is-small" /> Edit
                    </button>
                    <button class="button-margin-left ">
                      <Link href="#" onClick={this.toggleConsignmentDetails.bind(this)}>Track</Link>
                    </button>
                    <button onClick={this.goToDetails.bind(this)}>
                      View Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>123456</td>
                  <td>10/10/2018</td>
                  <td><Link href="#" onClick={this.toggleLRView.bind(this)}>001234</Link></td>
                  <td>Nissin Noodles</td>
                  <td>S1234</td>
                  <td>Banglore</td>
                  <td>
                    <button>
                      <em class="icon icon-edit-modify-streamline is-small" /> Edit
                    </button>
                    <button class="button-margin-left ">
                      <Link href="#" onClick={this.toggleConsignmentDetails.bind(this)}>Track</Link>
                    </button>
                    <button onClick={this.goToDetails.bind(this)}>
                      View Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>123456</td>
                  <td>10/10/2018</td>
                  <td><Link href="#" onClick={this.toggleLRView.bind(this)}>001234</Link></td>
                  <td>Nissin Noodles</td>
                  <td>S1234</td>
                  <td>Banglore</td>
                  <td>
                    <button>
                      <em class="icon icon-edit-modify-streamline is-small" /> Edit
                    </button>
                    <button class="button-margin-left ">
                      <Link href="#" onClick={this.toggleConsignmentDetails.bind(this)}>Track</Link>
                    </button>
                    <button onClick={this.goToDetails.bind(this)}>
                      View Details
                    </button>
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
        {
          this.state.isLRViewModalOpen &&
          <Modal title="Lorry Receipt" modalSize="is-large" onClose={this.toggleLRView.bind(this)}>
            <ModalBody>
              <div class="row">
                <div class="column no-padding">
                  <img src="assets/static/lr.jpg" style="width:100%;height:600px"/>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" onClick={this.toggleLRView.bind(this)}>Close</button>
            </ModalFooter>
          </Modal>
        }
        {
          this.state.isAddConsignmentModalOpen &&
          <Modal title="Consignment #001234" modalSize="is-large" onClose={this.toggleAddConsignment.bind(this)}>
            <ModalBody modalBodyHeight="modal-body-height">
              <div>
                <div class="column no-padding">
                  <div class="tabs" style="margin:0 0 10px 0 !important">
                    <ul>
                      <li id="step1" className={this.state.tabActiveforEnroll === 'step1' ? 'is-active': ''}>
                        <a>Client<br/>Info <em class="icon icon-checkmark" style="margin-left:17px;font-size:20px;color:green" /></a>
                      </li>
                      <li id="step2" className={this.state.tabActiveforEnroll === 'step2' ? 'is-active': ''}>
                        <a>Material<br/>Info</a>
                      </li>
                      <li id="step3" className={this.state.tabActiveforEnroll === 'step3' ? 'is-active': ''}>
                        <a>Vendor<br/>Info</a>
                      </li>
                      <li id="step4" className={this.state.tabActiveforEnroll === 'step4' ? 'is-active': ''}>
                        <a>LR<br/>Info</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="display-inline-block">
                  {
                    this.state.tabActiveforEnroll === 'step1' && (
                      <div  id="step1" class="tabcontent">
                        <div class="row" style="margin: 1.2rem 0 ;">
                          <div class="column has-text-right" style="margin:0 auto">
                            <form>
                              <div class="row">
                                <div class="column column-50 float-left">
                                  <div class="row">
                                    <div class="column column-30">Client : </div>
                                    <div class="column column-70">
                                      <select name="locality">
                                        <option value='' selected>Select Client</option>
                                        <option value='' >Nissin Noodles</option>
                                        <option value='' >MRF Tyres</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">From : </div>
                                    <div class="column column-70">
                                      <input type="text" placeholder="Enter Place" />
                                    </div>
                                  </div>
                                </div>
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">To : </div>
                                    <div class="column column-70">
                                      <input type="text" placeholder="Enter Place" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">Pickup From : </div>
                                    <div class="column column-70 has-text-center">
                                      <select name="locality">
                                        <option value='' selected>Select Branch</option>
                                        <option value='' >Pimpri, Pune</option>
                                        <option value='' >Ranjangaon, Pune</option>
                                        <option value='' >Wagholi, Pune</option>
                                        <option value='' >Other</option>
                                      </select>
                                      OR<br/>
                                      <select name="locality">
                                        <option value='' selected>Select Client</option>
                                        <option value='' >Nissin Noodles</option>
                                        <option value='' >MRF Tyres</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">Drop At : </div>
                                    <div class="column column-70 has-text-center">
                                      <select name="locality">
                                        <option value='' selected>Select Branch</option>
                                        <option value='' >Pimpri, Pune</option>
                                        <option value='' >Ranjangaon, Pune</option>
                                        <option value='' >Wagholi, Pune</option>
                                      </select>
                                      OR<br/>
                                      <select name="locality">
                                        <option value='' selected>Select Client</option>
                                        <option value='' >Nissin Noodles</option>
                                        <option value='' >MRF Tyres</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row">
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30" />
                                    <div class="column column-70">
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="Address Line 1" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="Address Line 2" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="Pinocde" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="City" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="State" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30" />
                                    <div class="column column-70">
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="Address Line 1" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="Address Line 2" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="Pincode" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="City" />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column no-padding">
                                          <input type="text" placeholder="State" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="row" style="margin: 1.2rem 0 ;">
                          <div class="column column-90 has-text-right" style="margin:0 auto">
                            <button type="reset" onClick={this.toggleAddConsignment.bind(this)}>Close</button>
                            <button type="button" onClick={this.openTabForEnrolling.bind(this, 'step2')}>Next</button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {
                    this.state.tabActiveforEnroll === 'step2' && (
                      <div  id="step2" class="tabcontent">
                        <div class="row">
                          <div class="column no-padding">
                            <table style="margin:5px 0">
                              <thead>
                                <tr>
                                  <th>Dimensions</th>
                                  <th>Description</th>
                                  <th>No. of Packages</th>
                                  <th>Weight</th>
                                  <th>Material Type</th>
                                </tr>
                              </thead>
                              <tbody style="height: auto">
                                <tr>
                                  <td>200mm X 300mm</td>
                                  <td>Battery</td>
                                  <td>1000</td>
                                  <td>5 tons</td>
                                  <td>Chemical</td>
                                </tr>
                                <tr>
                                  <td>500mm X 500mm</td>
                                  <td>Packed Noodles</td>
                                  <td>2000</td>
                                  <td>1 ton</td>
                                  <td>Eatable</td>
                                </tr>
                              </tbody>
                            </table>
                            <button class="float-right"> <em class="icon icon-plus" onClick={this.toggleAddMaterial.bind(this)} /></button>
                          </div>
                        </div>
                        <div class="row" style="margin: 1.2rem 0 ;">
                          <div class="column column-90 has-text-right" style="margin:0 auto">
                            <button type="reset" onClick={this.openTabForEnrolling.bind(this, 'step1')}>Previous</button>
                            <button type="button" onClick={this.openTabForEnrolling.bind(this, 'step3')}>Next</button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {
                    this.state.tabActiveforEnroll === 'step3' && (
                      <div  id="step3" class="tabcontent">
                        <div class="row">
                          <div class="column">
                            <form>
                              <div class="row">
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">From : </div>
                                    <div class="column column-70">
                                      <input type="text" placeholder="Enter Place" />
                                    </div>
                                  </div>
                                </div>
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">To : </div>
                                    <div class="column column-70">
                                      <input type="text" placeholder="Enter Place" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="column column-50 float-left">
                                  <div class="row">
                                    <div class="column column-30">Vendor : </div>
                                    <div class="column column-70">
                                      <select name="locality">
                                        <option value='' selected>Select Vendor</option>
                                        <option value='' >Patil Transports</option>
                                        <option value='' >SK Transports</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">Vehicle Type : </div>
                                    <div class="column column-70">
                                      <input type="text" placeholder="Enter Vehicle Type" />
                                    </div>
                                  </div>
                                </div>
                                <div class="column">
                                  <div class="row">
                                    <div class="column column-30">Vehicle Load : </div>
                                    <div class="column column-70">
                                      <input type="text" placeholder="Enter Load" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row">
                                <div class="column column-50 float-left">
                                  <div class="row">
                                    <div class="column column-30">Rate : </div>
                                    <div class="column column-70 has-text-left">
                                      <input type="text" placeholder="Enter Rate" />
                                      <strong><span style="font-weight:bold;color:#ff0000">( ! Old Rates )</span></strong>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="row" style="margin: 1.2rem 0 ;">
                          <div class="column column-90 has-text-right" style="margin:0 auto">
                            <button type="reset" onClick={this.toggleAddConsignment.bind(this, 'step2')}>Previous</button>
                            <button type="button" onClick={this.openTabForEnrolling.bind(this, 'step4')}>Next</button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {
                    this.state.tabActiveforEnroll === 'step4' && (
                      <div  id="step4" class="tabcontent">
                        <div class="row">
                          <div class="column no-padding">
                            LR Information
                          </div>
                        </div>
                        <div class="row" style="margin: 1.2rem 0 ;">
                          <div class="column column-90 has-text-right" style="margin:0 auto">
                            <button type="reset" onClick={this.openTabForEnrolling.bind(this, 'step3')}>Previous</button>
                            <button type="button" onClick={this.toggleAddConsignment.bind(this)}>Add</button>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </ModalBody>
          </Modal>
        }
        {
          this.state.isAddMaterialModalOpen &&
          <Modal title="Add Material" modalSize="is-large" onClose={this.toggleAddMaterial.bind(this)}>
            <ModalBody>
              <div class="row">
                <div class="column no-padding">
                  <form>
                    <div class="row">
                      <div class="column column-50">
                        <label>Width</label>
                        <input type="text" placeholder="Enter Width" name="name" value={name} onInput={LinkState(this, 'name')} required="required"/>
                      </div>
                      <div class="column column-50">
                        <label>Height</label>
                        <input type="text" placeholder="Enter Height" name="displayName" value={displayName}
                          onInput={LinkState(this, 'displayName')} required="required"/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column column-50">
                        <label>Description</label>
                        <input type="text" placeholder="Enter Name" name="name" value={name} onInput={LinkState(this, 'name')} required="required"/>
                      </div>
                      <div class="column column-50">
                        <label>No. of Packages</label>
                        <input type="text" placeholder="Enter Display Name" name="displayName" value={displayName}
                          onInput={LinkState(this, 'displayName')} required="required"/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="column column-50">
                        <label>Weight</label>
                        <input type="text" placeholder="Enter Name" name="name" value={name} onInput={LinkState(this, 'name')} required="required"/>
                      </div>
                      <div class="column column-50">
                        <label>Type</label>
                        <input type="text" placeholder="Enter Display Name" name="displayName" value={displayName}
                          onInput={LinkState(this, 'displayName')} required="required"/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" onClick={this.toggleAddMaterial.bind(this)}>Close</button>
              <button type="button" onClick={this.toggleAddMaterial.bind(this)}>Add</button>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }
}
