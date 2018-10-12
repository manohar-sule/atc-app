import { h, Component } from 'preact';
import CONSTANTS from '../../../lib/constants';
import { Link } from 'preact-router';
import { AppStore } from '../../../lib/store';
import http from 'fetch-bb';

export default class UserVerification extends Component {
  verifyUserToken() {
    http.put(`${CONSTANTS.API_URL}/api/admin/user/verify?verificationToken=${this.state.token}`)
      .then(() => {
        this.setState({isLinkValid: true});
        AppStore.set('tokenForGettingUser', this.state.token);
      })
      .catch(() => {
        this.setState({isLinkInvalid: true});
      });
  }
  componentWillMount() {
    this.state = {
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
        {/*
          T1328 - APP - Silo admin view changes
          Developer - Arvind Shinde
          Date: 22 june 2018
        */}
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
                  <label>Thank You for verifying. You can now proceed to <Link class="hyperlink" href='/admin/setpassword'> Set Password</Link></label>
                )
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
}
