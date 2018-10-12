import { h, Component } from 'preact';
import { Link } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import { AppStore } from '../../lib/store';
import { route } from 'preact-router';
import { Toast } from '../../lib/toastr';
import http from 'fetch-bb';
import { startLoader, stopLoader } from '../../lib/utils';

export default class Profile extends Component {
  getUserProfile() {
    startLoader();
    return http
      .get(`${CONSTANTS.API_URL}/api/user/me`)
      .then((profileInfo) => {
        this.setState({
          profile: profileInfo
        });
        stopLoader();
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
        stopLoader();
      });
  }

  logout() {
    http.post(`${CONSTANTS.API_URL}/api/user/logout`)
      .then(() => {
        AppStore.removeAll();
        AppStore.set('shortName', this.state.shortName);
        new Toast('Successfully logged out', Toast.TYPE_DONE, Toast.TIME_LONG);
        route(`/${this.state.shortName}/login`);
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
      });
  }

  componentWillMount() {
    this.state = {
      profile: {},
      shortName: ''
    };
  }
  componentDidMount() {
    this.getUserProfile();
    let userInfo = AppStore.get('userinfo');
    this.setState({shortName: userInfo.company.shortName});
  }

  render({}, { profile }) {
    return (
      <div class="row">
        <section class="column column-20">
          <div class="box">
            <p>
              <strong>E-Mail: </strong> {profile.email || 'Not Available'}
            </p>
            <p>
              <strong>Phone: </strong>{profile.mobile || 'Not Available'}
            </p>
            {/*
              <p>
                <strong>Role: </strong> {profile.role || 'Not Available'}
              </p>
            */}
            <p>
              <strong>Organization : </strong> {profile.company ? profile.company.name : 'Not Available'}
            </p>
            <hr />
            <span>
              <Link class="button is-fullwidth" href="/verifyOldPassword">Change Password</Link>
            </span>
            <span>
              <button onClick={this.logout.bind(this)} class="button is-fullwidth button-outline" >Logout</button>
            </span>
          </div>
        </section>
        <section class="column">
          <div class="box">
            <h4>{profile.name}</h4>
          </div>
          <div class="box">
            <h6>Advance User Info Panel</h6>
            <span>
              Something useful activities into this............
            </span>
          </div>
        </section>
      </div>
    );
  }
}
