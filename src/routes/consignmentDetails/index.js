import { h, Component } from 'preact';
// import SideBar from '../../components/sideBar';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
// import {  startLoader, stopLoader } from '../../lib/utils';
// import CONSTANTS from '../../lib/constants';
// import http from 'fetch-bb';
// import { Toast } from '../../lib/toastr';
import { Link } from 'preact-router';

export default class ConsignmentDetails extends Component {
  componentWillMount() {
    this.state ={
      tabActiveforEnroll:'',
      pincodeDetails: {},
      isCreateDispatchModalOpen: false,
      isConsignmentDetailsModalOpen: false,
      isLRViewModalOpen: false,
      isBillViewModalOpen: false,
      tabActive: 'LR',
      isAddTrackingDetailsModalOpen: false
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

  toggleLRView() {
    this.setState({isLRViewModalOpen: !this.state.isLRViewModalOpen});
  }

  toggleBillView() {
    this.setState({isBillViewModalOpen: !this.state.isBillViewModalOpen});
  }

  openTab(tabName) {
    let i, x;
    x = document.getElementsByClassName("tabcontent");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    // console.log(document);
    document.getElementById(tabName).style.display = "block";

    this.setState({ tabActive: tabName });
  }

  toggleAddTrackingDetails() {
    console.log('in');
    this.setState({isAddTrackingDetailsModalOpen: !this.state.isAddTrackingDetailsModalOpen});
  }

  render({}) {
    return (
      <div>
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
                    <label style="width:100%;">Billing Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>Billing Amount - </span>
                      <span><strong><em class="icon icon-rupee" /></strong>25,00,000</span>
                    </div>
                    <div>
                      <span>Advance Amount - </span>
                      <span><strong><em class="icon icon-rupee" /></strong>5,00,000</span>
                    </div>
                    <div>
                      <span>Balance Amount - </span>
                      <span><strong><em class="icon icon-rupee" /></strong>20,00,000</span>
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
                      <span>ETD - </span>
                      <span><strong>10:30 AM, 30th October 2018</strong></span>
                    </div>
                    <div>
                      <span>ETA - </span>
                      <span><strong>12:00 PM, 31st October 2018</strong></span>
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
          </div>
          <section class="box no-padding">
            <div class="row">
              <div class="column no-padding">
                <div class="tabs" style="margin-bottom:0">
                  <ul>
                    <li id="Tab1" className={this.state.tabActive === 'LR' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'LR')}>LR </a>
                    </li>
                    <li id="Tab2" className={this.state.tabActive === 'Tracking Details' ? 'is-active': ''}>
                      <a onClick={this.openTab.bind(this, 'Tracking Details')}>Tracking Details</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="row">
              <div  id="LR" class="tabcontent" style="padding:10px">
                <div class="row">
                  <div class="column no-padding">
                    <label style="width:100%;">
                      <em class="icon icon-paper-plane-o is-small" /> LR
                    </label>
                  </div>
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
                    <button class="button button-margin-left" onClick={this.toggleAddTrackingDetails.bind(this)} >
                      <em class="icon icon-plus is-small" /> Add Tracking Details</button>
                  </div>
                </div>

                <div class="row">
                  <div class="column no-padding">
                    <div class="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Current Location<br/>(ATC)</th>
                            <th>Current Location<br/>(Customer)</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Via</th>
                            <th>Vehicle</th>
                            <th>Driver Name</th>
                            <th>Driver Contact</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>10/10/2018</td>
                            <td>Belgaon</td>
                            <td>Belgaon</td>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>-</td>
                            <td>MH 12 AB 1234</td>
                            <td>Manohar Sule</td>
                            <td>9876543210</td>
                            <td>In Transit</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddTrackingDetails.bind(this)} >
                                <em class="icon icon-edit-modify-streamline is-small" /> Edit
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>10/10/2018</td>
                            <td>Belgaon</td>
                            <td>Belgaon</td>
                            <td>Belgaon</td>
                            <td>Banglore</td>
                            <td>-</td>
                            <td>MH 12 AB 1234</td>
                            <td>Manohar Sule</td>
                            <td>9876543210</td>
                            <td>In Transit</td>
                            <td>
                              <button class="button-margin-left " onClick={this.toggleAddTrackingDetails.bind(this)} >
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
        {
          this.state.isAddTrackingDetailsModalOpen &&
          <Modal title="Add Tracking Details" modalSize="is-small" onClose={this.toggleAddTrackingDetails.bind(this)}>
            <form>
              <ModalBody>
                <div class="row">
                  <div class="column column-50 float-left">
                    <label>Date</label>
                    <input type="date" />
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <label>Current Location (ATC)</label>
                    <input type="text" />
                  </div>
                  <div class="column">
                    <label>Current Location (Customer)</label>
                    <input type="text" />
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <label>To</label>
                    <input type="text" />
                  </div>
                  <div class="column">
                    <label>From</label>
                    <input type="text" />
                  </div>
                </div>
                <div class="row">
                  <div class="column column-50 float-left">
                    <label>Via</label>
                    <input type="text" />
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <label>Vehicle Number</label>
                    <input type="text" />
                  </div>
                  <div class="column">
                    <label>Driver Name</label>
                    <input type="text" />
                  </div>
                </div>
                <div class="row">
                  <div class="column">
                    <label>Driver Contact</label>
                    <input type="text" />
                  </div>
                  <div class="column column-50 float-left">
                    <label>Status</label>
                    <input type="text" />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" onClick={this.toggleAddTrackingDetails.bind(this)}>Close</button>
                <button type="button" onClick={this.toggleAddTrackingDetails.bind(this)}>Add</button>
              </ModalFooter>
            </form>
          </Modal>
        }
      </div>
    );
  }
}
