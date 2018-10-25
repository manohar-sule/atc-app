import { h, Component } from 'preact';
// import SideBar from '../../components/sideBar';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
// import {  startLoader, stopLoader } from '../../lib/utils';
// import CONSTANTS from '../../lib/constants';
// import http from 'fetch-bb';
// import { Toast } from '../../lib/toastr';
import { Link } from 'preact-router';
import SideBar1 from '../../components/sideBar1';

export default class ConsignmentDetails extends Component {
  componentWillMount() {
    this.state ={
      tabActiveforEnroll:'',
      pincodeDetails: {},
      isCreateDispatchModalOpen: false,
      isConsignmentDetailsModalOpen: false,
      isLRViewModalOpen: false,
      isBillViewModalOpen: false,
      tabActive: 'Tracking Details'
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
    // this.opentab();
  }

  toggleLRView() {
    this.setState({isLRViewModalOpen: !this.state.isLRViewModalOpen});
  }

  toggleBillView() {
    this.setState({isBillViewModalOpen: !this.state.isBillViewModalOpen});
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

  render({}) {
    return (
      <div>
      <SideBar1 activeMenu={'/consignments'}/>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <ul class="breadcrumbs">
                <li><a href="/home">Home</a></li>
                <li><a href="/consignments">Consignment</a></li>
                <li class="active">123456</li>
              </ul>
            </div>
          </section>
          <section class="box">
            <div class="row">
              <div class="column no-padding">
                <span class="header-color-blue" style="padding-left:0 !important; font-size:1.5rem;">
                  <em class="icon icon-user is-small" /> 123456
                </span>
              </div>

            </div>
          </section>
          <div class="row">
            <div class="column" style="padding-left: 0px;">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">Consignment Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>Client Name - </span>
                      <span><strong>Nissin Noodles</strong></span>
                    </div>
                    <div>
                      <span>From - </span>
                      <span><strong>Pune</strong></span>
                    </div>
                    <div>
                      <span>To - </span>
                      <span><strong>Banglore</strong></span>
                    </div>
                    <div>
                      <span>Weight of Material - </span>
                      <span><strong>Eatables</strong></span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="column">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">Vendor Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>Name - </span>
                      <span><strong>Patil Transports</strong></span>
                    </div>
                    <div>
                      <span>Vehicle Number - </span>
                      <span><strong>MH 12 AB 1234</strong></span>
                    </div>
                    <div>
                      <span>Driver Name - </span>
                      <span><strong>Sahil Kulkarni</strong></span>
                    </div>
                    <div>
                      <span>Driver Contact - </span>
                      <span><strong>9876543210</strong></span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div class="column">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">ATC Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>Current Location - </span>
                      <span><strong>GST1000234</strong></span>
                    </div>
                    <div>
                      <span>LR Number - </span>
                      <span title="View LR">
                        <Link href="#" onClick={this.toggleLRView.bind(this)}><strong>LR12345</strong></Link>
                      </span>
                    </div>
                    <div>
                      <span>Estimated Cost - </span>
                      <span><strong><em class="icon icon-rupee" /> 10,00,000</strong>
                        <Link href="#" onClick={this.toggleBillView.bind(this)}> (View Bill)</Link>
                      </span>
                    </div>
                    <div>
                      <span>Advance Amount - </span>
                      <span><strong><strong><em class="icon icon-rupee" /> 2,00,000</strong></strong></span>
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
                    <li id="Tab1" className={this.state.tabActive === 'Tracking Details' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Tracking Details')}>Tracking Details </a>
                    </li>
                    <li id="Tab2" className={this.state.tabActive === 'Quotation' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Quotation')}>Quotation</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div  id="Tracking Details" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Tracking Details
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <Link class="button button-margin-left" href="">
                      <em class="icon icon-plus is-small" /> Add Tracking Details</Link>
                  </div>
                </div>

                <div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Source<br/>Branch</th>
                            <th>Destination<br/>Branch</th>
                            <th>Location for<br/>ATC</th>
                            <th>Location for<br/>Customer</th>
                            <th>User<br/>Name</th>
                            <th>Remarks</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>10/10/2018</td>
                            <td>In Transit</td>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>Belgaon</td>
                            <td>Belgaon</td>
                            <td>manohar Sule</td>
                            <td>-</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>10/10/2018</td>
                            <td>In Transit</td>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>Belgaon</td>
                            <td>Belgaon</td>
                            <td>manohar Sule</td>
                            <td>-</td>
                            <td>
                              <button class="button-margin-left ">
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>10/10/2018</td>
                            <td>In Transit</td>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>Belgaon</td>
                            <td>Belgaon</td>
                            <td>manohar Sule</td>
                            <td>-</td>
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
              <div  id="Quotation" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> Quotation
                    </label>
                  </div>
                  <div class="column no-padding has-text-right">
                    <Link class="button button-margin-left" href="">
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
                              <button class="button-margin-left ">
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
                              <button class="button-margin-left ">
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
                              <button class="button-margin-left ">
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
                              <button class="button-margin-left ">
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
          this.state.isBillViewModalOpen &&
          <Modal title="Bill" modalSize="is-large" onClose={this.toggleBillView.bind(this)}>
            <ModalBody>
              <div class="row">
                <div class="column no-padding">
                  <img src="assets/static/lr.jpg" style="width:100%;height:600px"/>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" onClick={this.toggleBillView.bind(this)}>Close</button>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }
}
