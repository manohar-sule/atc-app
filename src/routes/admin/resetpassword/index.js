import { h, Component } from 'preact';
import CONSTANTS from '../../../lib/constants';
import { route } from 'preact-router';
import { Link } from 'preact-router';
import http from 'fetch-bb';
// import { AppStore } from '../../lib/store';

let resetToken;

export default class ResetPassword extends Component {

  resetPassword(e) {
    e.preventDefault();
    this.setState({
      isResponseReceived:true,
      isButtonClicked: true
    });
    this.setState({newPassword: e.target.newPassword.value});
    this.setState({confirmPassword: e.target.confirmPassword.value});
    // if (this.state.newPassword !== this.state.confirmPassword) {
    //   this.setState({
    //     isResponseReceived:false,
    //     isButtonClicked: false
    //   });
    //   return this.setState({errorMessage: 'Passwords do not match'});
    // }
    return http
      .post(`${CONSTANTS.API_URL}/api/admin/resetpassword?resetToken`, {
        newPassword: e.target.newPassword.value,
        confirmNewPassword: e.target.confirmPassword.value,
        resetToken: this.props.matches.resetToken
      })
      .then(() => {
        this.setState({successMessage: 'Your password has been reset. You can now proceed to '});
        this.setState({errorMessage: ''});
        this.setState({
          isResponseReceived:false,
          isButtonClicked: false
        });
      })
      .catch((HTTPException) => {
        if (HTTPException.statusCode === 409) {
          this.setState({
            isResponseReceived:false,
            isButtonClicked: false
          });
          return this.setState({errorMessage: 'Passwords do not match', successMessage: ''});
        }
        else if (HTTPException.statusCode === 400) {
          this.setState({
            isResponseReceived:false,
            isButtonClicked: false
          });
          return this.setState({errorMessage: 'Passwords must contain At least 6 characters,including UPPERCASE, lowercase letters, '+
           'special characters and Digits', successMessage: ''});
        }
        this.setState({
          isResponseReceived: false,
          isButtonClicked: false
        });
        return this.setState({errorMessage: 'This link is expired. Please ', successMessage: ''});
      });
  }
  componentWillMount() {
    this.state = {
      newPassword: '',
      confirmPassword: '',
      errorMessage: '',
      successMessage: '',
      isButtonClicked: false,
      isResponseReceived: false
    };
  }
  componentDidMount() {
    resetToken = this.props.matches.resetToken;
    if (!resetToken) {
      route(`/admin/forgotpassword`);
    }
  }

  render () {
    return (
      <section class="row row-center has-text-center auth-section"
        style=" background-image: linear-gradient(rgba(13, 138, 238, 0.6),\
      rgba(0, 0, 0, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.imgur.com/Ew0b1TU.jpg');">
        <div class="column column-40 auth-center">
          <form class="box" name="resetpasswordform" onSubmit={this.resetPassword.bind(this)}>
            <div class="row">
              {/*
                T1328 - APP - Silo admin view changes
                Developer - Arvind Shinde
                Date: 22 june 2018
              */}
              <div class="column">
                <img src="/assets/static/PowerDECK_Logo.svg" />
                <sup>TM</sup>
              </div>
            </div>
            <div class="row"> { /*comment end*/ }
              <div class="column auth-form">
                <div class="field">
                  <input autofocus type="password" placeholder="New Password" name="newPassword" disabled={this.state.isResponseReceived} required />
                  <label for="email" class="has-text-left" style="font-size:0.8em">Enter New Password</label>
                </div>
                <div class="field">
                  <input autofocus type="password" placeholder="Confirm Password" name="confirmPassword" disabled={this.state.isResponseReceived} required />
                  <label for="email" class="has-text-left" style="font-size:0.8em">Confirm Password</label>
                </div>

                {this.state.errorMessage && (
                  <div id="error" class="error-color">
                    <span>
                      {this.state.errorMessage}
                      {
                        this.state.errorMessage === 'This link is expired. Please ' &&
                        (<Link class="hyperlink" href={`/${this.state.shortName}/forgotpassword`}>generate a new one</Link>)
                      }
                    </span>
                  </div>
                )}
                {this.state.successMessage && (
                  <div>
                    <span>{this.state.successMessage}
                      <Link class="hyperlink" href="/admin/login">Login</Link>
                    </span>
                  </div>
                )}
                <button class="is-fullwidth" disabled={this.state.isButtonClicked}>Reset Password</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
