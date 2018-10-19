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

export default class Clients extends Component {

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
      name: 'Client Name',
      displayName: 'Display Name 1',
      address: {
        line1: 'line1',
        line2: 'line2',
        city: 'city',
        state: 'state'
      },
      type: 'clientType',
      rating:'3.5'
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

  render({}, { clientList, isClientAddModal, isButtonLocked, modalTitle, name, displayName, address }) {

    const columns = ['Name', 'Display Name', 'Type', 'City', 'State', 'Rating', 'Action'];
    return (
      <div>
        <div id="main-body" class=" main outer-most-div margin-left-76">
          <section class="row" style="margin-bottom:5px">
            <div class="column">
              <span style="font-size:20px"><em class="icon icon-user is-small"/> Clients</span>
            </div>
          </section>
          <section class="row">
            <div class="column no-padding">
              <div class="box">
                <div class="row">
                  <div class="column column-20 float-right search-box">
                    <em class="icon icon-search" />
                    <input type="text" id="search" placeholder="Enter Client Name"
                      name="search" value="" />
                  </div>
                  <div class="column has-text-right">
                    <button type="button" onClick={this.toggleAddClient.bind(this)}>Add Client</button>
                  </div>
                </div>
              </div>
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
                {
                  (clientList.map((row) => (<tr>
                    <td>{row.name}</td>
                    <td>{row.displayName}</td>
                    <td>{row.type || '-'}</td>
                    <td>{row.address.city}</td>
                    <td>{row.address.state || '-'}</td>
                    <td>{row.rating || '-'}</td>
                    <td>
                      <button  onClick={this.editClient.bind(this, row)}>Edit</button>
                      <button  onClick={this.clientDetailClick.bind(this, row)}>View Detail</button>
                    </td>
                  </tr>)))
                }
                {
                  !clientList.length && this.state.loadingClientList && (
                    <span>Loading...</span>
                  )
                }
                {!clientList.length && !this.state.loadingClientList && (<span>No Data Found</span>)}
              </tbody>
            </table>
            <div class="has-text-right column no-padding pagination">
              <Pagination count={this.state.totalPages} currentPageNo={this.state.currentPageNo} onChangePageClick={this.onChangePageClick.bind(this)} />
            </div>
          </div>
          {
            !isClientAddModal && (
              <Modal title={modalTitle} modalSize="is-medium" onClose={this.toggleAddClient.bind(this)}>
                <form name="Add Client" onSubmit={this.createOrEditClient.bind(this)}>
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
      </div>
    );
  }
}
