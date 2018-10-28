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

  render({}, {}) {

    const columns = ['From', 'To', 'Type of Vehicle', 'Rate'];
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <ul class="breadcrumbs">
                <li><a href="/home">Home</a></li>
                <li class="active">Rates</li>
              </ul>
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
                <tr>
                  <td>Pune</td>
                  <td>Mumbai</td>
                  <td>TATA 407</td>
                  <td>10,000</td>
                </tr>
                <tr>
                  <td>Pune</td>
                  <td>Mumbai</td>
                  <td>TATA Ace</td>
                  <td>15,000</td>
                </tr>
                <tr>
                  <td>Pune</td>
                  <td>Banglore</td>
                  <td>TATA 407</td>
                  <td>25,000</td>
                </tr>
                <tr>
                  <td>Pune</td>
                  <td>Banglore</td>
                  <td>TATA Ace</td>
                  <td>40,0000</td>
                </tr>
                <tr>
                  <td>Mumbai</td>
                  <td>Banglore</td>
                  <td>TATA 407</td>
                  <td>37,000</td>
                </tr>
              </tbody>
            </table>
            <div class="has-text-right column no-padding pagination">
              <Pagination count={this.state.totalPages} currentPageNo={this.state.currentPageNo} onChangePageClick={this.onChangePageClick.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
