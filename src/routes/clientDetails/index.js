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
      isConsignmentDetailsModalOpen: false
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
  }

  render({}) {
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
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
                      <span>Company Name - </span>
                      <span><strong>Nissin Noodles</strong></span>
                    </div>
                    <div>
                      <span>Display Name -</span>
                      <span><strong>Nissin</strong></span>
                    </div>
                    <div>
                      <span>Type -</span>
                      <span><strong>Full Load</strong></span>
                    </div>
                    <div>
                      <span>Address -</span>
                      <span><strong>N.C. Kelkar Road, Pune, Maharashtra</strong></span>
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
                      <span><strong>Contact preson name</strong></span>
                    </div>
                    <div>
                      <span>Contat No -</span>
                      <span><strong>022-25555</strong></span>
                    </div>
                    <div>
                      <span>Contat No -</span>
                      <span><strong>876895632</strong></span>
                    </div>
                    <div>
                      <span>Address -</span>
                      <span><strong>Pune, Maharashtra</strong></span>
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
                      <span><strong>PAN No.</strong></span>
                    </div>
                    <div>
                      <span>TIN No -</span>
                      <span><strong>Khfsftv45c</strong></span>
                    </div>
                    <div>
                      <span>GST No -</span>
                      <span><strong>Khfsftv45c</strong></span>
                    </div>
                    <div>
                      <span>Pending Invoices -</span>
                      <span><strong>1,25,123 Rs.</strong></span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
          <section class="box">
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
                        <th>Consignment ID</th>
                        <th>Source Branch</th>
                        <th>Target Branch</th>
                        <th>Pick Up Location</th>
                        <th>Delivery Location</th>
                        <th>Estimated Cost</th>
                        <th>Advance Amount</th>
                        <th>Actual Billing Cost</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1234</td>
                        <td>Pune</td>
                        <td>Bangalore</td>
                        <td>Kothrud, Pune</td>
                        <td>Bangalore</td>
                        <td>10,000</td>
                        <td>5,000</td>
                        <td>15,000</td>
                        <td><em class="icon icon-flag-checkered is-small" /> Delivered</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                          <button class="button-margin-left ">
                            <em class="icon icon-refresh is-small" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>1235</td>
                        <td>Pune</td>
                        <td>Bangalore</td>
                        <td>Kothrud, Pune</td>
                        <td>Bangalore</td>
                        <td>10,000</td>
                        <td>5,000</td>
                        <td>15,000</td>
                        <td><em class="icon icon-flag-checkered is-small" /> Delivered</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                          <button class="button-margin-left ">
                            <em class="icon icon-refresh is-small" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>12145</td>
                        <td>Pune</td>
                        <td>Bangalore</td>
                        <td>Kothrud, Pune</td>
                        <td>Bangalore</td>
                        <td>10,000</td>
                        <td>5,000</td>
                        <td>15,000</td>
                        <td><em class="icon icon-flag-checkered is-small" /> Delivered</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                          <button class="button-margin-left ">
                            <em class="icon icon-refresh is-small" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>1578</td>
                        <td>Pune</td>
                        <td>Bangalore</td>
                        <td>Kothrud, Pune</td>
                        <td>Bangalore</td>
                        <td>10,000</td>
                        <td>5,000</td>
                        <td>15,000</td>
                        <td><em class="icon icon-flag-checkered is-small" /> Delivered</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                          <button class="button-margin-left ">
                            <em class="icon icon-refresh is-small" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>


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

      </div>
    );
  }
}
