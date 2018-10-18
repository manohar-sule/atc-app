import { h, Component } from 'preact';
import SideBar from '../../components/sideBar';
import { Modal, ModalBody, ModalFooter } from '../../components/modal';
import {  startLoader, stopLoader } from '../../lib/utils';
import CONSTANTS from '../../lib/constants';
import http from 'fetch-bb';
import { Toast } from '../../lib/toastr';
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
  subscriptionDetail() {
    this.setState({ isSubscriptionDetailModalOpen: !this.state.isSubscriptionDetailModalOpen });
  }
  toggleSubscriptionDetailModal() {
    this.setState({
      isSubscriptionDetailModalOpen: !this.state.isSubscriptionDetailModalOpen
    });
  }
  editSubscription(e) {
    e.preventDefault();
  }
  addSubscriber(tile) {
    this.setState({ isAddSubscriberModalOpen: !this.state.isAddSubscriberModalOpen });
    this.openTabForEnrolling(tile);

  }
  toggleAddSubscriberModal() {
    this.setState({
      isAddSubscriberModalOpen: !this.state.isAddSubscriberModalOpen,
      pincodeDetails: {},
      tabActiveforEnroll:'step1'
    });
    document.getElementById('addSubscriberForm').reset();
  }
  createSubscriber(e) {
    e.preventDefault();
  }

  toggleCreateDispatchModal() {
    this.setState({
      isCreateDispatchModalOpen: !this.state.isCreateDispatchModalOpen,
      selectedDispatchType:'',
      isEmailNotificationsOn:'',
      selectedEmailTempType:'',
      isSMSNotificationsOn:'',
      selectedSmsTempType:'',
      tabActiveforDispatch:'step1'
    });
  }
  selectTypeOfDispatch(e){
    e.preventDefault();
    this.setState({
      selectedDispatchType:e.target.value});
  }
  setNotificationValue(notificationValue,e) {
    if (notificationValue==='isEmailNotificationsOn')
    {
      this.setState({isEmailNotificationsOn: e.target.checked});
    }

    if (notificationValue==='isSMSNotificationsOn')
    {
      this.setState({isSMSNotificationsOn: e.target.checked});
    }

    if (notificationValue==='isMonitorResponse')
    {
      this.setState({isMonitorResponse: e.target.checked});
    }
  }
  selectEmailTemplateType(e){
    e.preventDefault();
    this.setState({
      selectedEmailTempType:e.target.value});
  }
  selectSmsTemplateType(e){
    e.preventDefault();
    this.setState({
      selectedSmsTempType:e.target.value});
  }
  openTabForDispatch(tabName) {
    this.setState({tabActiveforDispatch: tabName});
  }
  getPincodeDetails() {
    startLoader();
    let pincode = document.getElementById("pincode").value;
    return http.get(`${CONSTANTS.API_URL}/api/getPincodeDetails/${pincode}`)
      .then((data) => {
        this.setState({ pincodeDetails: data });
        stopLoader();
      })
      .catch((HTTPException) => {
        stopLoader();
        new Toast("Pincode details not found. Please verify the pincode.", Toast.TYPE_ERROR, Toast.TIME_NORMAL);
        this.setState({
          pincodeDetails: {}
        });
        console.error(HTTPException.message);
      });
  }

  openTabForEnrolling(tabName) {
    this.setState({ tabActiveforEnroll: tabName });
  }



  toggleConsignmentDetails() {
    this.setState({isConsignmentDetailsModalOpen: !this.state.isConsignmentDetailsModalOpen});
  }

  render({}, {tabActiveforEnroll}) {
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
              <span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: orange;"></span>
<span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: orange;"></span>
<span class="fa fa-star checked" style="font-size: 20px;padding: 2px;color: orange;"></span>
<span class="fa fa-star" style="font-size: 20px;padding: 2px;"></span>
<span class="fa fa-star" style="font-size: 20px;padding: 2px;"></span>
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
                        <th>Client</th>
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
                        <td>Client Name</td>
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
                        <td>Client Name</td>
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
                        <td>Client Name</td>
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
                        <td>Client Name</td>
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
                  {
                    this.state.isSubscriptionDetailModalOpen &&
                    <form id="addSubscriberForm" onSubmit={this.editSubscription.bind(this)}>
                      <Modal title="Subscription Details" modalSize="is-large" onClose={this.toggleSubscriptionDetailModal.bind(this)}>
                        <ModalBody>
                          <table>
                            <tr>
                              <td>Name - </td>
                              <td>Mahamad Abudul</td>
                            </tr>
                            <tr>
                              <td>Publication - </td>
                              <td>Dhatukam</td>
                            </tr>
                            <tr>
                              <td>Status - </td>
                              <td>Active</td>
                            </tr>
                            <tr>
                              <td>Type - </td>
                              <td>paid</td>
                            </tr>
                            <tr>
                              <td>Validity - </td>
                              <td>3 Months</td>
                            </tr>
                            <tr>
                              <td>Delivery Address - </td>
                              <td> # C - 199 k s s i d c hebbal industrial area</td>
                            </tr>
                            <tr>
                              <td>Mobile - </td>
                              <td>98234569999</td>
                            </tr>
                            <tr>
                              <td>State - </td>
                              <td>Maharashtra</td>
                            </tr>
                            <tr>
                              <td>Pincode - </td>
                              <td>414001</td>
                            </tr>
                            <tr>
                              <td>City - </td>
                              <td>Savedi</td>
                            </tr>
                            <tr>
                              <td>District - </td>
                              <td>Dhatukam</td>
                            </tr>
                          </table>

                        </ModalBody>
                        <ModalFooter>
                          <button onClick={this.toggleSubscriptionDetailModal.bind(this)}>Close</button>
                          <button type="submit">Edit</button>

                        </ModalFooter>
                      </Modal>
                    </form>
                  }
                  {
                    this.state.isAddSubscriberModalOpen &&
                    <form id="addSubscriberForm" onSubmit={this.createSubscriber.bind(this)}>
                      <Modal title="Enroll" modalSize="is-large" onClose={this.toggleAddSubscriberModal.bind(this)}>
                        <ModalBody>

                          <div class="column no-padding">
                            <div class="tabs">
                              <ul>
                                <li id="step1" className={tabActiveforEnroll === 'step1' ? 'is-active': ''}>
                                  <a>STEP 1 </a>
                                </li>
                                <li id="step2" className={tabActiveforEnroll === 'step2' ? 'is-active': ''}>
                                  <a>STEP 2</a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div class="display-inline-block">
                            {
                              this.state.tabActiveforEnroll === 'step1' && (
                                <div  id="step1" class="tabcontent">
                                  <div class="row">
                                    <div class="column">
                                      <h6>Raw Data</h6><br/>
                                      <table>
                                        <tr>
                                          <td>Organization Name: </td>
                                          <td> Ameena Entrentrpres</td>
                                        </tr>
                                        <tr>
                                          <td>Addres: </td>
                                          <td>199 k s s i d c hebbal industrial area</td>
                                        </tr>
                                        <tr>
                                          <td>State: </td>
                                          <td>Maharashtra</td>
                                        </tr>
                                        <tr>
                                          <td>City: </td>
                                          <td>Mysore</td>
                                        </tr>
                                        <tr>
                                          <td>Pin: </td>
                                          <td>414001</td>
                                        </tr>
                                        <tr>
                                          <td>Landline: </td>
                                          <td>0241-2342630</td>
                                        </tr>
                                        <tr>
                                          <td>Mobile: </td>
                                          <td>9877665544</td>
                                        </tr>
                                      </table>
                                    </div>



                                    <div class="column">
                                      <h6>Edit Subscriber</h6><br/>
                                      <div class="row">
                                        <div class="column column-20">Org Name: </div>
                                        <div class="column">
                                          <input type="text" name="organizationName" value={this.state.organizationName} />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column column-20">Address: </div>
                                        <div class="column">
                                          <textarea type="text" name="address">{this.state.address}</textarea>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column column-20">Pincode: </div>
                                        <div class="column">
                                          <input type="text" name="pincode" id="pincode" />
                                          {/*<input type="text" name="pincode" onBlur={this.getPincodeDetails.bind(this)} />*/}
                                        </div>
                                        <div class="column">
                                          <button  onClick={this.getPincodeDetails.bind(this)}>Search</button>
                                        </div>

                                      </div>
                                      {
                                        this.state.pincodeDetails.PostOffice &&
                                      <div class="row">
                                        <div class="column column-20">Locality: </div>
                                        <div class="column">
                                          <select name="locality" >
                                            <option value=''  selected>Select Locality</option>
                                            {
                                              this.state.pincodeDetails.PostOffice.map((detail) =>
                                                ( <option >{detail.Name}</option>))
                                            }
                                          </select>
                                        </div>
                                      </div>
                                      }
                                      {
                                        this.state.pincodeDetails.PostOffice &&
                                        <div class="row">
                                          <div class="column column-20">City: </div>
                                          <div class="column">
                                            <input type="text" name="city" value={this.state.pincodeDetails.PostOffice[0].Taluk} />
                                          </div>
                                        </div>
                                      }
                                      {
                                        this.state.pincodeDetails.PostOffice &&
                                        <div class="row">
                                          <div class="column column-20">State: </div>
                                          <div class="column">
                                            <input type="text" name="state" value={this.state.pincodeDetails.PostOffice[0].State} />
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="column has-text-right">
                                      <button type="submit"> Save </button>
                                      <button  type="reset" onClick={this.toggleAddSubscriberModal.bind(this)}>Close</button>
                                    </div>
                                  </div>
                                </div>
                              )}

                            {
                              this.state.tabActiveforEnroll === 'step2' && (
                                <div  id="step1" class="tabcontent">
                                  <h6>Add Subscription</h6><br/>
                                  <div class="row">
                                    <div class="column">

                                      <div class="row">
                                        <div class="column column-20">Org Name: </div>
                                        <div class="column">
                                          <input type="text" name="organizationName" value={this.state.organizationName} />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column column-20">Publication: </div>
                                        <div class="column">
                                          <input type="text" name="organizationName"  />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column column-20">Issue: </div>
                                        <div class="column">
                                          <input type="text" name="organizationName"  />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column column-20">Type: </div>
                                        <div class="column">
                                          <input type="text" name="organizationName"  />
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column column-20">Validity: </div>
                                        <div class="column">
                                          <input type="text" name="organizationName"  />
                                        </div>
                                      </div>
                                    </div>

                                    <div class="column">
                                      <div class="row">
                                        <div class="column column-20">Address: </div>
                                        <div class="column">
                                          <textarea type="text" name="address">{this.state.address}</textarea>
                                        </div>
                                      </div>
                                      <div class="row">
                                        <div class="column column-20">Pincode: </div>
                                        <div class="column">
                                          <input type="text" name="pincode" id="pincode" />
                                          {/*<input type="text" name="pincode" onBlur={this.getPincodeDetails.bind(this)} />*/}
                                        </div>
                                        <div class="column">
                                          <button  onClick={this.getPincodeDetails.bind(this)}>Search</button>
                                        </div>

                                      </div>
                                      {
                                        this.state.pincodeDetails.PostOffice &&
                                      <div class="row">
                                        <div class="column column-20">Locality: </div>
                                        <div class="column">
                                          <select name="locality" >
                                            <option value=''  selected>Select Locality</option>
                                            {
                                              this.state.pincodeDetails.PostOffice.map((detail) =>
                                                ( <option >{detail.Name}</option>))
                                            }
                                          </select>
                                        </div>
                                      </div>
                                      }
                                      {
                                        this.state.pincodeDetails.PostOffice &&
                                        <div class="row">
                                          <div class="column column-20">City: </div>
                                          <div class="column">
                                            <input type="text" name="city" value={this.state.pincodeDetails.PostOffice[0].Taluk} />
                                          </div>
                                        </div>
                                      }
                                      {
                                        this.state.pincodeDetails.PostOffice &&
                                        <div class="row">
                                          <div class="column column-20">State: </div>
                                          <div class="column">
                                            <input type="text" name="state" value={this.state.pincodeDetails.PostOffice[0].State} />
                                          </div>
                                        </div>
                                      }
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="column has-text-right">
                                      <button  type="reset" onClick={this.toggleAddSubscriberModal.bind(this)}>Close</button>
                                    </div>
                                  </div>
                                </div>

                              )}
                          </div>
                        </ModalBody>
                      </Modal>
                    </form>
                  }
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
        {
          this.state.isCreateDispatchModalOpen &&
          <Modal title="Create Dispatch" modalSize="is-small" onClose={this.toggleCreateDispatchModal.bind(this)}>
            <ModalBody>
              <form>
                <div class="column no-padding">
                  <div class="tabs">
                    <ul>
                      <li id="step1" className={this.state.tabActiveforDispatch === 'step1' ? 'is-active': ''}>
                        <a>1 Dispatch Detail</a>
                      </li>
                      <li id="step2" className={this.state.tabActiveforDispatch === 'step2' ? 'is-active': ''}>
                        <a>2 Communication Detail</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="display-inline-block">
                  {
                    this.state.tabActiveforDispatch === 'step1' && (
                      <div  id="step1" class="tabcontent">
                        <div class="row">
                          <div class="column column-25">Type of dispatch: </div>
                          <div class="column column-50">
                            <select onChange={this.selectTypeOfDispatch.bind(this)}>
                              <option value=''>Select Type of dispatch</option>
                              <option>Publication</option>
                              <option>Mailer</option>
                              <option>Calendar</option>
                            </select>
                          </div>
                        </div>
                        {
                          this.state.selectedDispatchType==='Publication' && (
                            <div>
                              <div class="row">
                                <div class="column column-25">Publication: </div>
                                <div class="column column-50">
                                  <select>
                                    <option>Select Publication</option>
                                    <option>Dhatukaam</option>
                                    <option>Dhatukarya</option>
                                  </select>
                                </div>
                              </div>
                              <div class="row">
                                <div class="column column-25">Issue/Edition: </div>
                                <div class="column column-50">
                                  <select>
                                    <option>Select Issue/Edition</option>
                                    <option>September 2018</option>
                                    <option>October 2018</option>
                                  </select>
                                </div>
                              </div>
                              <div class="row" style="margin-bottom:5px">
                                <div class="column column-25">Available Stock: </div>
                                <div class="column column-50">
                                  <label>100 pcs.</label>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        <div class="row">
                          <div class="column column-25">Courier Agency: </div>
                          <div class="column column-50">
                            <select>
                              <option>Select Courier Agency</option>
                              <option>DTDC</option>
                              <option>Post</option>
                            </select>
                          </div>
                        </div>
                        <div class="row">
                          <div class="column has-text-right">
                            <button type="button" onClick={this.openTabForDispatch.bind(this,'step2')}>Next</button>
                            <button type="button" onClick={this.toggleCreateDispatchModal.bind(this)}>Close</button>
                          </div>
                        </div>
                      </div>
                    )}
                  {
                    this.state.tabActiveforDispatch === 'step2' && (
                      <div>
                        <div style="margin-bottom:10px" class="row">
                          <div class="column">
                            <input type="checkbox" value='isEmailNotificationsOn' name="isEmailNotificationsOn"
                              onChange={this.setNotificationValue.bind(this,'isEmailNotificationsOn')}/> Notify By E-mail
                            <input type="checkbox" value='isSMSNotificationsOn' name="isSMSNotificationsOn"
                              onChange={this.setNotificationValue.bind(this,'isSMSNotificationsOn')} style="margin-left:10px"/> Notify by SMS
                            <input type="checkbox" value='isMonitorResponse' name="isMonitorResponse"
                              onChange={this.setNotificationValue.bind(this,'isMonitorResponse')} style="margin-left:10px"/> Monitor Response
                          </div>
                        </div>
                        {this.state.isEmailNotificationsOn &&(
                          <div>
                            <div class="row" style="margin-left: 7px;">
                              <strong>E-mail Notification Settings:</strong>
                            </div>
                            <div class="row">
                              <div class="column column-25">Email Template Type: </div>
                              <div class="column column-50">
                                <select onChange={this.selectEmailTemplateType.bind(this)}>
                                  <option value=''>Select Template Type</option>
                                  <option>Welcome Email</option>
                                  <option>Thank you Email</option>
                                </select>
                              </div>
                            </div>
                            {this.state.selectedEmailTempType &&(

                              <div class="row">
                                <div class="column column-25">Email Template: </div>
                                <div class="column column-50">
                                  <textarea style="height:100px;width:350px;margin-bottom: 10px;" value="Selected template" disabled />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {this.state.isEmailNotificationsOn && this.state.isSMSNotificationsOn && (
                          <hr />
                        )}
                        {this.state.isSMSNotificationsOn &&(
                          <div>
                            <div class="row" style="margin-left: 7px;">
                              <strong>SMS Notification Settings:</strong>
                            </div>
                            <div class="row">
                              <div class="column column-25">SMS Type: </div>
                              <div class="column column-50">
                                <select>
                                  <option value=''>Select SMS Type</option>
                                  <option>Inbound</option>
                                  <option>Outbound</option>
                                  <option>Both</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="column column-25">SMS Template Type: </div>
                              <div class="column column-50">
                                <select onChange={this.selectSmsTemplateType.bind(this)}>
                                  <option value=''>Select Template Type</option>
                                  <option>Welcome SMS</option>
                                  <option>Thank you SMS</option>
                                </select>
                              </div>
                            </div>
                            {this.state.selectedSmsTempType && (

                              <div class="row">
                                <div class="column column-25">SMS Template: </div>
                                <div class="column column-50">
                                  <textarea style="height:100px;width:350px;margin-bottom: 10px;" value="Selected template" disabled/>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        <div class="row">
                          <div class="column has-text-right">
                            <button type="button" onClick={this.openTabForDispatch.bind(this,'step1')}>Previous</button>
                            <Link href="/data/dispatch/create">
                              <button type="button" class="button-margin-left">Proceed</button>
                            </Link>
                            <button type="button" onClick={this.toggleCreateDispatchModal.bind(this)}>Close</button>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </form>
            </ModalBody>

          </Modal>
        }
      </div>
    );
  }
}
