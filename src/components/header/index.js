import { h, Component } from 'preact';
import { Link } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import { AppStore } from '../../lib/store';
import http from 'fetch-bb';
import { route } from 'preact-router';
//import { Toast } from '../../lib/toastr';

export default class Header extends Component {

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
      <div>
        <nav class="header">
          <div>
            <Link href="/home" class="no-padding billwise-logo">
              <img />
            </Link>
          </div>
          <div>
            <div class="dropdown-1">
              <button class="dropbtn" onClick={this.myFunction.bind(this)}>P</button>
              <div id="myDropdown" class={'dropdown-content-1 ' + (this.state.show ? 'show' : '')}>
                <a><button class="dropbtn">P</button> <strong>Pallavi Kelgaonkar</strong></a>
                <a href="/verifyOldPassword">Change Password</a>
                <a onClick={this.logout.bind(this)}>Logout</a>
              </div>
            </div>
            <div class="global-search float-right search-box">
              <form onSubmit={this.search.bind(this)}>
                <em class="icon icon-search" />
                <input type="text" id="search" placeholder="Search"
                  name="search" value="" />
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
