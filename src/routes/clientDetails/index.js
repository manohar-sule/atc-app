import { h, Component } from 'preact';
// import SideBar from '../../components/sideBar';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
// import {  startLoader, stopLoader } from '../../lib/utils';
// import CONSTANTS from '../../lib/constants';
// import http from 'fetch-bb';
// import { Toast } from '../../lib/toastr';
import { Link } from 'preact-router';

export default class ClientDetails extends Component {
  componentWillMount() {
    this.state ={
      tabActiveforEnroll:'',
      pincodeDetails: {},
      isCreateDispatchModalOpen: false,
      isConsignmentDetailsModalOpen: false,
      isLRViewModalOpen: false,
      tabActive: 'Consignments',
      isAddContactModalOpen: false,
      isAddQuotationModalOpen: false
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
    this.openTab();
  }

  toggleLRView() {
    this.setState({isLRViewModalOpen: !this.state.isLRViewModalOpen});
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

  toggleAddContact() {
    this.setState({isAddContactModalOpen: !this.state.isAddContactModalOpen});
  }

  toggleAddQuotation() {
    this.setState({isAddQuotationModalOpen: !this.state.isAddQuotationModalOpen});
  }

  render({}) {
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <ul class="breadcrumbs">
                <li><a href="/home">Home</a></li>
                <li><a href="/clients">Clients</a></li>
                <li class="active">Nissin Noodles</li>
              </ul>
            </div>
          </section>
          <section class="box">
            <div class="row">
              <div class="column no-padding">
                <span class="header-color-blue" style="padding-left:0 !important; font-size:1.5rem;">
                  <em class="icon icon-user is-small" /> Nissin Noodles
                </span>
                <span class="tag is-normal" style="margin-top:8px;">Full Load</span>
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
                    <label style="width:100%;">Client Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>Client Name - </span>
                      <span><strong>Nissin Noodles</strong></span>
                    </div>
                    <div>
                      <span>Type of Material - </span>
                      <span><strong>Eatables</strong></span>
                    </div>
                    <div>
                      <span>Email ID -</span>
                      <span><strong>nissinnoodles@gmail.com</strong></span>
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
                      <span><strong>Pallavi Kelgaonkar</strong></span>
                    </div>
                    <div>
                      <span>Mobile No. - </span>
                      <span><strong>9890710576, 9876543210</strong></span>
                    </div>
                    <div>
                      <span>Email ID - </span>
                      <span><strong>pallavi@gmail.com</strong></span>
                    </div>
                    <div>
                      <span>Address - </span>
                      <span><strong>Ramkunj Society, ICS colony, Ganesh Khind Road, Pune, 411007, Maharashtra</strong></span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="column">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">Billing Information</label>
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
                    <li id="Tab1" className={this.state.tabActive === 'Consignments' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Consignments')}>Consignments </a>
                    </li>
                    <li id="Tab2" className={this.state.tabActive === 'Contacts' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Contacts')}>Contacts</a>
                    </li>
                    <li id="Tab3" className={this.state.tabActive === 'Quotations' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Quotations')}>Quotations</a>
                    </li>
                    <li id="Tab4" className={this.state.tabActive === 'Bills' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Bills')}>Bills</a>
                    </li>
                  </ul>
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
                    <Link class="button button-margin-left" href="">
                      <em class="icon icon-plus is-small" /> Add Consignment</Link>
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
              <div  id="Contacts" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Contacts
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <Link class="button button-margin-left" onClick={this.toggleAddContact.bind(this)}>
                      <em class="icon icon-plus is-small" /> Add Contact</Link>
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
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Shrutika Khot</td>
                            <td>9876543210</td>
                            <td>shrutika@gmail.com</td>
                            <td>Narayan Peth, Pune, 411030, Maharashtra</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddContact.bind(this)}>
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Neha Thakre</td>
                            <td>9876543210</td>
                            <td>neha@gmail.com</td>
                            <td>Narayan Peth, Pune, 411030, Maharashtra</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddContact.bind(this)}>
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
              <div  id="Quotations" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Quotation
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <Link class="button button-margin-left" onClick={this.toggleAddQuotation.bind(this)}>
                      <em class="icon icon-plus is-small" /> Add Quotation</Link>
                  </div>
                </div>
                <div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Vendor</th>
                            <th>Charges</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>Tail Transports</td>
                            <td>10,000</td>
                            <td>Draft</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddQuotation.bind(this)}>
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                              <button class="button-margin-left ">
                                Send
                              </button>
                              <button class="button-margin-left ">
                                Change Status
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>Tail Transports</td>
                            <td>10,000</td>
                            <td>Rejected</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddQuotation.bind(this)}>
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                              <button class="button-margin-left ">
                                Change Status
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>Tail Transports</td>
                            <td>10,000</td>
                            <td>Sent</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddQuotation.bind(this)}>
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                              <button class="button-margin-left ">
                                Change Status
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>Tail Transports</td>
                            <td>10,000</td>
                            <td>Finalised</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddQuotation.bind(this)}>
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                              <button class="button-margin-left ">
                                Change Status
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
              <div  id="Bills" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Bills
                    </label>
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
        {
          this.state.isAddContactModalOpen &&
          <Modal title="Add Contact" modalSize="is-small" onClose={this.toggleAddContact.bind(this)}>
            <form>
              <ModalBody>
                <div class="row">
                  <div class="column">
                    <label>Name</label>
                    <input type="text" placeholder="Enter Name" />
                  </div>
                  <div class="column">
                    <label>Mobile</label>
                    <input type="text" placeholder="Enter Mobile" />
                  </div>
                </div>
                <div class="row">
                  <div class="column column-50 float-left">
                    <label>Email ID</label>
                    <input type="text" placeholder="Enter Email ID" />
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <label>Address Line 1</label>
                    <input type="text" placeholder="Line 1" name="line1" />
                  </div>
                  <div class="column">
                    <label>Address Line 2</label>
                    <input type="text" placeholder="Line 2" name="line2" />
                  </div>
                </div>

                <div class="row">
                  <div class="column">
                    <label>Pincode</label>
                    <input type="text" placeholder="pincode" name="pincode" />
                  </div>
                  <div class="column">
                    <label>City</label>
                    <input type="text" placeholder="City" name="city" />
                  </div>
                </div>
                <div class="row">
                  <div class="column column-50 float-left">
                    <label>State</label>
                    <input type="text" placeholder="State" name="state" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" onClick={this.toggleAddContact.bind(this)}>Close</button>
                <button type="button" onClick={this.toggleAddContact.bind(this)}>Add</button>
              </ModalFooter>
            </form>
          </Modal>
        }
        {
          this.state.isAddQuotationModalOpen &&
          <Modal title="Add Quotation" modalSize="is-small" onClose={this.toggleAddQuotation.bind(this)}>
            <form>
              <ModalBody>
                <div class="row">
                  <div class="column">
                    <label>From</label>
                    <input type="text" placeholder="Enter Place" />
                  </div>
                  <div class="column">
                    <label>To</label>
                    <input type="text" placeholder="Enter Place" />
                  </div>
                </div>
                <div class="row">
                  <div class="column column-50 float-left">
                    <label>Vendor</label>
                    <input type="text" placeholder="Enter Vendor" />
                  </div>
                  <div class="column">
                    <label>Charges</label>
                    <input type="text" placeholder="Charges" name="line1" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" onClick={this.toggleAddQuotation.bind(this)}>Close</button>
                <button type="button" onClick={this.toggleAddQuotation.bind(this)}>Add</button>
              </ModalFooter>
            </form>
          </Modal>
        }
      </div>
    );
  }
}
