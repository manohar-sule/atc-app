import { h, Component } from 'preact';
import { Link } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import { AppStore } from '../../lib/store';
import http from 'fetch-bb';
import { route } from 'preact-router';
//import { Toast } from '../../lib/toastr';

export default class Header1 extends Component {

  openNav() {
    let sideNavDiv = Array.prototype.slice.call(document.querySelectorAll('.gn-menu-main'), 0);
    if (sideNavDiv.length > 0) {
      document.getElementById("gn-menu-a").classList.toggle('gn-selected');
      document.getElementById("gn-menu-nav").classList.toggle('gn-open-all');
    }
    if ( document.getElementById("gn-menu-nav").classList.contains('gn-open-all') ) {
      let contentDiv = Array.prototype.slice.call(document.querySelectorAll('.outer-most-div'), 0);
      if (contentDiv.length > 0) {
        let $target = document.getElementById('main-body');
        $target.classList.remove('margin-left-76');
        $target.classList.add('margin-left-266');
      }
    } else {
      document.getElementById("main-body").classList.remove('margin-left-266');
      document.getElementById("main-body").classList.add('margin-left-76');
    }


    // let contentDiv = Array.prototype.slice.call(document.querySelectorAll('.outer-most-div'), 0);
    // if (contentDiv.length > 0) {
    //   let $target = document.getElementById('main-body');
    //   $target.classList.toggle('margin-left-200');
    // }
  }

  componentDidMount() {
    return http.get(`${CONSTANTS.API_URL}/api/user/me`)
      .then((userinfo) => {
        AppStore.set('userinfo', userinfo);
        this.setState({
          brand: userinfo.company.brand,
          username: userinfo.name,
          userDisplayName: userinfo.displayName,
          email: userinfo.email,
          isClientAdmin: userinfo.isClientAdmin,
          shortName: userinfo.company.shortName,
          companyName: userinfo.company.name,
          isConsumerVerificationStage: userinfo.company.isConsumerVerificationStage
        });
        if (userinfo.department && userinfo.department.length) {
          this.setState({
            departmentName: userinfo.department[0].name
          });
        }
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
      });
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
      <div class="container">
        <ul id="gn-menu" class="gn-menu-main gn-selected">
          <li class="gn-trigger">
            <a id="gn-menu-a" class="gn-icon gn-icon-menu" onclick={this.openNav.bind(this)}><span>Menu</span></a>
            <nav id="gn-menu-nav" class="gn-menu-wrapper gn-open-part">
              <div class="gn-scroller">
                <ul class="gn-menu">
                  <li>
                    <a class="gn-icon icon icon-home" href="/home">Home</a>
                  </li>
                  <li>
                    <a class="gn-icon icon-paper-plane-o" href="/consignments">Consignments</a>
                  </li>
                  <li><a href="/clients" class="gn-icon icon icon-user">Clients</a></li>
                  <li><a href="/vendors" class="gn-icon icon icon-user">Vendors</a></li>
                  <li><a class="gn-icon gn-icon-help">Help</a></li>
                  <li>
                    <a class="gn-icon gn-icon-archive">Organization</a>
                    <ul class="gn-submenu">
                      <li><a href="/branches" class="gn-icon gn-icon-article">Branch</a></li>
                      <li><a href="/users" class="gn-icon icon icon-user">User</a></li>
                      <li><a href="/roles" class="gn-icon gn-icon-videos">Role</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </li>
          {
            //   <li><a href="/home">
            //
            //  <img src="./assets/static/atc.jpg" alt="IMG" style="width: 168px; height: 50px;"/>
            // </a></li>
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
