import { h, Component } from 'preact';
import { Link } from 'preact-router';
import { AppStore } from '../../lib/store';
import { route } from 'preact-router';
import http from 'fetch-bb';
import { Toast } from '../../lib/toastr';
import CONSTANTS from '../../lib/constants';

export default class AdminHeader extends Component {
  toggleMenu() {
    this.setState({
      navMenu: !this.state.navMenu
    });
  }

  logout(e) {
    e.preventDefault();
    return http.post(`${CONSTANTS.API_URL}/api/admin/logout`)
      .then(() => {
        AppStore.removeAll();
        new Toast('Successfully logged out.', Toast.TYPE_DONE, Toast.TIME_NORMAL);
        route('/admin/login');
      })
      .catch((HTTPException) => {
        new Toast(HTTPException.message, Toast.TYPE_DONE, Toast.TIME_LONG);
        console.error(HTTPException.message);
      });
  }

  componentWillMount() {
    this.state = {
      userName: ''
    };
  }

  componentDidMount() {
    return http.get(`${CONSTANTS.API_URL}/api/admin/user/me`)
      .then((response) => {
        AppStore.set('userinfo', response);
        this.setState({userName: response.displayName});
      })
      .catch((HTTPException) => {
        console.error(HTTPException.message);
      });
  }

  render({}) {
    return (<nav class="header">
      <div>
        <Link href="/admin/companies" class="no-padding billwise-logo">
          <img class="billwise-logo" src="/assets/static/PowerDECK Logo_white.svg" height="55" width="150"/>
        </Link>
        {
          // T1496: Text / Images in the Header is not Aligned
          // developer: Manohar
          // change in style
          // date: 17/7/18
        }
        <span style="padding-top: 10px; color: white; font-size: 1.6rem;">| TENANT ADMINISTRATION</span>
        {/*
          <Link href="/" class="brand">{brand}</Link>
          <a onClick={this.toggleMenu.bind(this)} class="hamburger">Menu</a>
        */}
      </div>
      <ul class={"menu " + ( this.state.navMenu ? 'active' : '')}>
        {/*<Link activeClassName="active" href="#">
          <em class="icon icon-bell-two initial is-small" />Notifications
        </Link>*/}
        <Link class="dropdown" href="#">
          <span class="username-wrap" style="margin-left: 20px; display: inline;">
            <em class="icon icon-ios-contact initial is-small"style="position: absolute; top: 3px; left: 15px;"/>{this.state.userName}</span>
          <div class="dropdown-content" >
            <Link href="/admin/verifyOldPassword">Change Password</Link>
            <a onClick={this.logout.bind(this)}>Logout</a>
          </div>
        </Link>
        {/*
        <Link activeClassName="active" href="/">Home</Link>
        <Link activeClassName="active" path="/consumers" href="/consumers">Consumers</Link>

      */}
      </ul>
      {
      //   <ul class={"menu " + ( this.state.navMenu ? 'active' : '')}>
      //   <Link activeClassName="active" href="/admin">Home</Link>
      //   <Link activeClassName="active" href="/admin/companies">Companies</Link>
      //   <Link activeClassName="active" href="/admin/consumer">Upload Consumers</Link>
      //   <span class="tag is-light">Admin</span>
      //   <Link activeClassName="active" href="#" onClick={this.logout}>Logout</Link>
      // </ul>
      }
    </nav>);
  }
}
