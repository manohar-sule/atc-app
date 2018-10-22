import { h, Component } from 'preact';
// import SideBar from '../../components/sideBar';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
// import {  startLoader, stopLoader } from '../../lib/utils';
// import CONSTANTS from '../../lib/constants';
// import http from 'fetch-bb';
// import { Toast } from '../../lib/toastr';
import { Link } from 'preact-router';

export default class VendorDetails extends Component {
  componentWillMount() {
    this.state ={
      tabActiveforEnroll:'',
      pincodeDetails: {},
      isCreateDispatchModalOpen: false,
      isConsignmentDetailsModalOpen: false,
      tabActive: 'Vehicles',
      isLRViewModalOpen: false
    };

  }

  toggleConsignmentDetails() {
    this.setState({isConsignmentDetailsModalOpen: !this.state.isConsignmentDetailsModalOpen});
  }
  componentDidMount() {
    if ( document.getElementById("gn-menu-nav").classList.contains('gn-open-all') ) {
      document.getElementById("main-body").classList.remove('margin-left-76');
      document.getElementById("main-body").classList.add('margin-left-266');
    } else {
      document.getElementById("main-body").classList.remove('margin-left-266');
      document.getElementById("main-body").classList.add('margin-left-76');
    }
    this.opentab();
  }

  openTab(tabName) {
    console.log(tabName);
    let i, x;
    x = document.getElementsByClassName("tabcontent");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    // console.log(document);
    document.getElementById(tabName).style.display = "block";

    this.setState({ tabActive: tabName });
  }

  toggleLRView() {
    this.setState({isLRViewModalOpen: !this.state.isLRViewModalOpen});
  }

  render({}) {
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <ul class="breadcrumbs">
                <li><a href="/home">Home</a></li>
                <li><a href="/vendors">Vendors</a></li>
                <li class="active">Patil Transports</li>
              </ul>
            </div>
          </section>
          <section class="box">
            <div class="row">
              <div class="column no-padding">
                <span class="header-color-blue" style="padding-left:0 !important; font-size:1.5rem;">
                  <em class="icon icon-user is-small" /> Patil Transports
                </span>
                <span class="tag is-normal" style="margin-top:8px;">Truck</span>
                <div style="margin-top:10px; padding-left:20px;">
                  <span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: #ad0b0b;"/>
                  <span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: #ad0b0b;"/>
                  <span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: #ad0b0b;"/>
                  <span class="fa fa-star" style="font-size: 20px;padding: 2px;"/>
                  <span class="fa fa-star" style="font-size: 20px;padding: 2px;"/>
                </div>
              </div>

            </div>
          </section>
          <div class="row">
            <div class="column" style="padding-left: 0px;">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">Vendor Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>No. of Vehicles - </span>
                      <span><strong>200</strong></span>
                    </div>
                    <div>
                      <span>Address - </span>
                      <span><strong>N.C. Kelkar Road, Narayan Peth, Pune, 431030, Maharashtra</strong></span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="column">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">Contact Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>Name - </span>
                      <span><strong>Rutuja Dahatonde</strong></span>
                    </div>
                    <div>
                      <span>Mobile No. - </span>
                      <span><strong>9876543210</strong></span>
                    </div>
                    <div>
                      <span>Email ID - </span>
                      <span><strong>rutuja@gmail.com</strong></span>
                    </div>
                    <div>
                      <span>Address - </span>
                      <span><strong>N.C. Kelkar Road, Narayan Peth, Pune, 431030, Maharashtra</strong></span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="column">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">Taxation Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>PAN - </span>
                      <span><strong>PR0012AB12</strong></span>
                    </div>
                    <div>
                      <span>TIN No - </span>
                      <span><strong>TIN000123</strong></span>
                    </div>
                    <div>
                      <span>GST No - </span>
                      <span><strong>GST1000234</strong></span>
                    </div>
                    <div>
                      <span>Billed Amount - </span>
                      <span><strong><em class="icon icon-rupee" /> 1,25,123</strong></span>
                    </div>
                    <div>
                      <span>Outstanding Amount - </span>
                      <span><strong><em class="icon icon-rupee" /> 95,123</strong></span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <section class="box no-padding">
            <div class="row">
              <div class="column no-padding">
                <div class="tabs" style="margin-bottom:0">
                  <ul>
                    <li id="Tab1" className={this.state.tabActive === 'Vehicles' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Vehicles')}>Vehicles </a>
                    </li>
                    <li id="Tab2" className={this.state.tabActive === 'Drivers' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Drivers')}>Drivers</a>
                    </li>
                    <li id="Tab3" className={this.state.tabActive === 'Consignments' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Consignments')}>Consignments</a>
                    </li>
                    <li id="Tab4" className={this.state.tabActive === 'Rates' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Rates')}>Rates</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div  id="Vehicles" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Vehicles
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <button class="button-margin-left" title="Add Vehicle">
                      <em class="icon icon-plus is-small tooltip" /> Add Vehicle
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Vehicle Number</th>
                            <th>Type</th>
                            <th>Year of Passing</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>MH 12 AB 1234</td>
                            <td>Truck</td>
                            <td>2012</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>MH 12 AB 1234</td>
                            <td>Truck</td>
                            <td>2012</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>MH 12 AB 1234</td>
                            <td>Truck</td>
                            <td>2012</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>MH 12 AB 1234</td>
                            <td>Truck</td>
                            <td>2012</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div  id="Drivers" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Drivers
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <button class="button-margin-left" title="Add Vehicle">
                      <em class="icon icon-plus is-small tooltip" /> Add Driver
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Licence Number</th>
                            <th>Rating</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Sahil Kulkarni</td>
                            <td>9876543210</td>
                            <td>sahil@gmail.com</td>
                            <td>Kothrid, Pune, 411007</td>
                            <td>00112233</td>
                            <td>4</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Sahil Kulkarni</td>
                            <td>9876543210</td>
                            <td>sahil@gmail.com</td>
                            <td>Kothrid, Pune, 411007</td>
                            <td>00112233</td>
                            <td>4</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Sahil Kulkarni</td>
                            <td>9876543210</td>
                            <td>sahil@gmail.com</td>
                            <td>Kothrid, Pune, 411007</td>
                            <td>00112233</td>
                            <td>4</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Sahil Kulkarni</td>
                            <td>9876543210</td>
                            <td>sahil@gmail.com</td>
                            <td>Kothrid, Pune, 411007</td>
                            <td>00112233</td>
                            <td>4</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div  id="Consignments" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Consignments
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <button class="button-margin-left" title="Add Vehicle">
                      <em class="icon icon-plus is-small tooltip" /> Add Consignment
                    </button>
                  </div>
                </div>
                <div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Consignment Number</th>
                            <th>Booking Date</th>
                            <th>LR Number</th>
                            <th>Client Name</th>
                            <th>Special Number</th>
                            <th>Current Location</th>
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
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                              <button class="button-margin-left ">
                                <Link href="#" onClick={this.toggleConsignmentDetails.bind(this)}>Track</Link>
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
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                              <button class="button-margin-left ">
                                <Link href="#" onClick={this.toggleConsignmentDetails.bind(this)}>Track</Link>
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
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                              <button class="button-margin-left ">
                                <Link href="#" onClick={this.toggleConsignmentDetails.bind(this)}>Track</Link>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div  id="Rates" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Rates
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <button class="button-margin-left" title="Add Rate">
                      <em class="icon icon-plus is-small tooltip" /> Add Rate
                    </button>
                  </div>
                </div>

                <div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th>To</th>
                          <th>From</th>
                          <th>Vehicle Type</th>
                          <th>Rate</th>
                          <th>Last Updated On</th>
                          <th>Last Updated By</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Pune</td>
                          <td>Banglore</td>
                          <td>TATA 407</td>
                          <td>20,000</td>
                          <td>11/10/1993</td>
                          <td>Samruddhi Gandhi</td>
                          <td>
                            <button class="button-margin-left ">
                              <em class="icon icon-edit-modify-streamline is-small" /> Edit
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Pune</td>
                          <td>Banglore</td>
                          <td>TATA 407</td>
                          <td>20,000</td>
                          <td>11/10/1993</td>
                          <td>Samruddhi Gandhi</td>
                          <td>
                            <button class="button-margin-left ">
                              <em class="icon icon-edit-modify-streamline is-small" /> Edit
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Pune</td>
                          <td>Banglore</td>
                          <td>TATA 407</td>
                          <td>20,000</td>
                          <td>11/10/1993</td>
                          <td>Samruddhi Gandhi</td>
                          <td>
                            <button class="button-margin-left ">
                              <em class="icon icon-edit-modify-streamline is-small" /> Edit
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div><div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>To</th>
                            <th>From</th>
                            <th>Vehicle Type</th>
                            <th>Rate</th>
                            <th>Last Updated On</th>
                            <th>Last Updated By</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Pune</td>
                            <td>Banglore</td>
                            <td>TATA 407</td>
                            <td>20,000</td>
                            <td>11/10/1993</td>
                            <td>Samruddhi Gandhi</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Pune</td>
                            <td>Banglore</td>
                            <td>TATA 407</td>
                            <td>20,000</td>
                            <td>11/10/1993</td>
                            <td>Samruddhi Gandhi</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Pune</td>
                            <td>Banglore</td>
                            <td>TATA 407</td>
                            <td>20,000</td>
                            <td>11/10/1993</td>
                            <td>Samruddhi Gandhi</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
      </div>
    );
  }
}
