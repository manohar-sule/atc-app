import { h, Component } from 'preact';
import { Link } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import { AppStore } from '../../lib/store';
import http from 'fetch-bb';
import { route } from 'preact-router';
//import { Toast } from '../../lib/toastr';

export default class Header1 extends Component {



  componentDidMount() {
  }

  toggleMenu() {
    this.setState({
      navMenu: !this.state.navMenu
    });
  }

  logout() {
    route(`/`);
    // http.post(`${CONSTANTS.API_URL}/api/user/logout`)
    //   .then(() => {
    //     AppStore.removeAll();
    //     // AppStore.set('shortName', this.state.shortName);
    //     new Toast('Successfully logged out', Toast.TYPE_DONE, Toast.TIME_LONG);
    //     route(`/`);
    //   })
    //   .catch((HTTPException) => {
    //     console.error(HTTPException);
    //   });
  }

  search(e) {
    e.preventDefault();
    route('/globalSearch');
  }

  myFunction() {
    this.setState({show: !this.state.show});
  }

  componentWillMount() {
    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div>
        <ul class="gn-menu-main1">
        {

          // <li class="gn-trigger">
          //   <a id="gn-menu-a" class="gn-icon gn-icon-menu" onclick={this.openNav.bind(this)}><span>Menu</span></a>
          //   <nav id="gn-menu-nav" class="gn-menu-wrapper gn-open-part">
          //     <div class="gn-scroller">
          //       <ul class="gn-menu">
          //         <li>
          //           <a class="gn-icon icon icon-home" href="/home">Home</a>
          //         </li>
          //         <li>
          //           <a class="gn-icon icon-paper-plane-o" href="/consignments">Consignments</a>
          //         </li>
          //         <li><a href="/clients" class="gn-icon icon icon-user">Clients</a></li>
          //         <li><a href="/vendors" class="gn-icon icon icon-user">Vendors</a></li>
          //         <li><a class="gn-icon gn-icon-help">Help</a></li>
          //         <li>
          //           <a class="gn-icon gn-icon-archive">Organization</a>
          //           <ul class="gn-submenu">
          //             <li><a href="/branches" class="gn-icon gn-icon-article">Branch</a></li>
          //             <li><a href="/users" class="gn-icon icon icon-user">User</a></li>
          //             <li><a href="/roles" class="gn-icon gn-icon-videos">Role</a></li>
          //           </ul>
          //         </li>
          //       </ul>
          //     </div>
          //   </nav>
          // </li>
        }
          <li style="float:right; border-left: 1px solid #c6d0da;">
            <a class="codrops-icon codrops-icon-prev" href="/home" style="padding:6px 15px">
              <img src="assets/static/atc.jpg" style="width:100px" />
            </a>
          </li>
          <li style="float:right; border-left: 1px solid #c6d0da;"><a class="codrops-icon codrops-icon-prev" href="#"><span>Branch Name</span></a></li>
          <li  class="codrops-icon codrops-icon-prev search-box">
            <em class="icon icon-search" style="top:0"/>
            <input type="text" id="search" placeholder="Search"
              name="search" value="" style="border:none"/>
          </li>
        </ul>
      </div>
    );
  }
}
