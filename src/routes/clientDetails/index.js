import { h, Component } from 'preact';
import SideBar from '../../components/sideBar';
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

  render({}) {
    return (
      <div>
        <SideBar activeMenu="/clients"/>
        <div class="main">
          <section class="box">
            <div class="row">
              <div class="column no-padding">
                <h6 class="header-color-blue" style="padding-left:0 !important">
                  <em class="icon icon-user is-small" /> Client Name (DisplayName)
                </h6>
                <span class="tag is-normal" style="margin-top:8px;padding:3px 0.75rem">Type</span>
              </div>
              <div class="column has-text-right">
                <span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: orange;"/>
                <span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: orange;"/>
                <span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: orange;"/>
                <span class="fa fa-star" style="font-size: 20px;padding: 2px;"/>
                <span class="fa fa-star" style="font-size: 20px;padding: 2px;"/>
              </div>
            </div>
          </section>
          <div class="row">
            <div class="column" style="padding-left: 0px;">
              <section class="box" style="padding:0!important">
                <div class="row details-heading">
                  <div class="column no-padding">
                    <label style="width:100%;">Client Personal Information</label>
                  </div>
                </div>
                <div class="row details-info">
                  <div class="column no-padding">
                    <div>
                      <span>Name - </span>
                      <span><strong>Client preson name</strong></span>
                    </div>
                    <div>
                      <span>Email -</span>
                      <span><strong>Client@info.com</strong></span>
                    </div>
                    <div>
                      <span>Type -</span>
                      <span><strong>Client type</strong></span>
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
                    <label style="width:100%;">Contact Information</label>
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
                  </div>
                </div>
              </section>
            </div>
            <div class="column" style="padding-right: 0px;">
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
          </div>
          <section class="box">
            <div class="row">
              <div class="column no-padding">
                <label style="width:100%;">
                  <em class="icon icon-paper-plane-o is-small" /> Consignments
                </label>
                <div class="row" style="margin-bottom:10px">
                  <div class="column no-padding">
                    <div>
                      <span>Total Number of Consignments - </span>
                      <span><strong>4</strong></span>
                    </div>
                    <div>
                      <span>Booked - </span>
                      <span><strong>1</strong></span>
                    </div>
                  </div>
                  <div class="column">
                    <div>
                      <span>In Transit - </span>
                      <span><strong>2</strong></span>
                    </div>
                    <div>
                      <span>Delivered - </span>
                      <span><strong>1</strong></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column no-padding has-text-right">
                <Link class="button button-margin-left" href="/data/dispatch/create">
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
                        <th>Reference Number</th>
                        <th>Booked Date</th>
                        <th>Delivered Date</th>
                        <th>Destination</th>
                        <th>Issue/Edition</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>P43582316</td>
                        <td>10680</td>
                        <td>18/08/2018</td>
                        <td>20/08/2018</td>
                        <td>Pune</td>
                        <td>August 2018</td>
                        <td><em class="icon icon-flag-checkered is-small" /> Delivered</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)}>Track</button>
                          <button class="button-margin-left ">
                            <em class="icon icon-refresh is-small" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>P43582317</td>
                        <td>9131</td>
                        <td>19/09/2018</td>
                        <td>-</td>
                        <td>Mysore</td>
                        <td>August 2018</td>
                        <td><em class="icon icon-flag is-small" /> In Transit</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)} >Track</button>
                          <button class="button-margin-left ">
                            <em class="icon icon-refresh is-small" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>P43582318</td>
                        <td>11004</td>
                        <td>19/09/2018</td>
                        <td>-</td>
                        <td>Mysore</td>
                        <td>August 2018</td>
                        <td><em class="icon icon-flag is-small" /> In Transit</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)} >Track</button>
                          <button class="button-margin-left ">
                            <em class="icon icon-refresh is-small" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>P43582319</td>
                        <td>9036</td>
                        <td>21/08/2018</td>
                        <td>-</td>
                        <td>Mysore</td>
                        <td>August 2018</td>
                        <td><em class="icon icon-flag-o is-small" /> Booked</td>
                        <td>
                          <button class="button-margin-left " onClick={this.toggleConsignmentDetails.bind(this)} >Track</button>
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
                    <span>Dispatch ID - </span>
                    <span><strong>11223344</strong></span>
                  </div>
                  <div>
                    <span>Consignment Number - </span>
                    <span><strong>P123456</strong></span>
                  </div>
                  <div>
                    <span>Reference Number - </span>
                    <span><strong>654321</strong></span>
                  </div>
                </div>
                <div class="column">
                  <div>
                    <span>Current Status - </span>
                    <span><strong>Not Available</strong></span>
                  </div>
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
