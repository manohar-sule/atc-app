import { h, Component } from 'preact';
// import CONSTANTS from '../../lib/constants';
// import http from 'fetch-bb';
// import {  startLoader, stopLoader } from '../../lib/utils';
//import Pagination from '../../components/pagination';
// import { route } from 'preact-router';
// import { Toast } from '../../lib/toastr';
import SideBar from '../../components/sideBar';
//import { Modal, ModalBody, ModalFooter } from '../../components/modal';
//import { Link } from 'preact-router';

export default class AdminPanel extends Component {

  componentWillMount() {
    this.state ={};
  }

  componentDidMount() {}

  render({}, {}) {
    return (
      <div>
        <SideBar activeMenu="/adminPanel"/>
      </div>
    );
  }
}
