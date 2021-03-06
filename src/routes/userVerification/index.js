import { h, Component } from 'preact';
import CONSTANTS from '../../lib/constants';
import { Link } from 'preact-router';
import { AppStore } from '../../lib/store';
import http from 'fetch-bb';

export default class UserVerification extends Component {
  verifyUserToken() {
    http.put(`${CONSTANTS.API_URL}/api/user/verify?verificationToken=${this.state.token}`)
      .then((resp) => {
        this.setState({isLinkValid: true, shortName: resp.shortName});
        AppStore.set('shortName', resp);
        AppStore.set('tokenForGettingUser', this.state.token);
      })
      .catch(() => {
        this.setState({isLinkInvalid: true});
      });
  }
  componentWillMount() {
    this.state = {
      shortName: '',
      token: ''
    };
    this.setState({token: this.props.matches.verificationToken});
  }
  componentDidMount() {
    this.verifyUserToken();
  }
  render({}, { isLinkValid, isLinkInvalid }) {
    return (
      <section class="row row-center has-text-center auth-section">
        <div class="column column-40 auth-center">
          <div class="row">
            <div class="column">
              <img src="/assets/static/PowerDECK_Logo.svg" />
              <sup>TM</sup>
            </div>
          </div>
          <div class="row box" style="height:100px;align-items:center">
            <div class="column">
              {
                isLinkInvalid && (<label>This link is expired</label>)
              }
              {
                isLinkValid && (
                  <label>Thank You for verifying. You can now proceed to <Link class="hyperlink" href='/setpassword'> Set Password</Link></label>
                )
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}
