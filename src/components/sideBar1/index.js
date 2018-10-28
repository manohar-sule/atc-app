import { h, Component } from 'preact';
// import { Link } from 'preact-router';
// import CONSTANTS from '../../lib/constants';
// import { AppStore } from '../../lib/store';
// import http from 'fetch-bb';
// import { route } from 'preact-router';
//import { Toast } from '../../lib/toastr';

export default class SideBar1 extends Component {

  openNav() {
    let sideNavDiv = Array.prototype.slice.call(document.querySelectorAll('.gn-menu-main'), 0);
    if (sideNavDiv.length > 0) {
      document.getElementById("gn-menu-a").classList.toggle('gn-selected');
      document.getElementById("gn-menu-nav").classList.toggle('gn-open-all');
    }
    if ( document.getElementById("gn-menu-nav").classList.contains('gn-open-all') ) {
      console.log('in if gn-open-all');
      let contentDiv = Array.prototype.slice.call(document.querySelectorAll('.outer-most-div'), 0);
      if (contentDiv.length > 0) {
        console.log('in if contentDiv');
        let $target = document.getElementById('main-body');
        $target.classList.remove('margin-left-76');
        $target.classList.add('margin-left-266');
      }
    } else {
      console.log('in else');
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
    this.setState({activeMenu:this.props.activeMenu});
    // console.log('in sidebar');
    // if ( document.getElementById("gn-menu-nav").classList.contains('gn-open-all') ) {
    //   console.log('in if');
    //   document.getElementById("main-body").classList.remove('margin-left-76');
    //   document.getElementById("main-body").classList.add('margin-left-266');
    // } else {
    //   console.log('in else');
    //   document.getElementById("main-body").classList.remove('margin-left-266');
    //   document.getElementById("main-body").classList.add('margin-left-76');
    // }
  }

  componentWillMount() {
  }

  render(state) {
    return (
      <div class="container">
        <ul id="gn-menu" class="gn-menu-main gn-selected">
          <li class="gn-trigger">
            <a id="gn-menu-a" class="gn-icon gn-icon-menu" onclick={this.openNav.bind(this)}><span>Menu</span></a>
            <nav id="gn-menu-nav" class="gn-menu-wrapper gn-open-part">
              <div class="gn-scroller">
                <ul class="gn-menu">
                  <li class={state.activeMenu === '/home' ? 'gn-menu-li-active' : ''}>
                    <a class="gn-icon icon icon-home" href="/home">Home</a>
                  </li>
                  <li class={state.activeMenu === '/consignments' ? 'gn-menu-li-active' : ''}>
                    <a class="gn-icon icon-paper-plane-o" href="/consignments">Consignments</a>
                  </li>
                  <li class={state.activeMenu === '/clients' ? 'gn-menu-li-active' : ''}>
                    <a href="/clients" class="gn-icon icon icon-user">Clients</a>
                  </li>
                  <li class={state.activeMenu === '/vendors' ? 'gn-menu-li-active' : ''} >
                    <a href="/vendors" class="gn-icon icon icon-user">Vendors</a>
                  </li>
                  <li><a class="gn-icon gn-icon-help">Help</a></li>
                  <li>
                    <a class="gn-icon gn-icon-archive">Organization</a>
                    <ul class="gn-submenu">
                      <li class={state.activeMenu === '/branches' ? 'gn-menu-li-active' : ''} >
                        <a href="/branches" class="gn-icon gn-icon-article">Branch</a>
                      </li>
                      <li class={state.activeMenu === '/users' ? 'gn-menu-li-active' : ''}>
                        <a href="/users" class="gn-icon icon icon-user">User</a>
                      </li>
                      <li class={state.activeMenu === '/roles' ? 'gn-menu-li-active' : ''}>
                        <a href="/roles" class="gn-icon gn-icon-videos">Role</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </li>
          {
            // <li style="float:right; border-left: 1px solid #c6d0da;">
            //   <a class="codrops-icon codrops-icon-prev" href="/home" style="padding:6px 15px">
            //     <img src="assets/static/atc.jpg" style="width:100px" />
            //   </a>
            // </li>
            // <li style="float:right; border-left: 1px solid #c6d0da;"><a class="codrops-icon codrops-icon-prev" href="#"><span>Branch Name</span></a></li>
            // <li  class="codrops-icon codrops-icon-prev search-box">
            //   <em class="icon icon-search" style="top:0"/>
            //   <input type="text" id="search" placeholder="Search"
            //     name="search" value="" style="border:none"/>
            // </li>
          }

        </ul>
      </div>
    );
  }
}
