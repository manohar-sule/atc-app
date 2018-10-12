import { h, Component } from 'preact';
import CONSTANTS from '../../../lib/constants';
import { Toast } from '../../../lib/toastr';
// import { route } from 'preact-router';
import http from 'fetch-bb';

export default class ForgotPassword extends Component {
  send(e) {
    e.preventDefault();
    this.setState({
      email: e.target.email.value,
      isResponseReceived:true,
      errorMessage: '',
      successMessage: ''
    });
    http.post(`${CONSTANTS.API_URL}/api/admin/forgotpassword`, {
      email: this.state.email
    })
      .then(() => {
        new Toast('Please check your Inbox for further instructions', Toast.TYPE_DONE, Toast.TIME_LONG);
        this.setState({successMessage: 'Please check your Inbox for further instructions'});
        this.setState({errorMessage: ''});
        this.state.isSendButtonDisabled = true;
        this.setState({
          isResponseReceived:false
        });
      })
      .catch(() => {
        this.setState({errorMessage: 'Registered user not found'});
        this.setState({successMessage: ''});
        this.setState({
          isResponseReceived:false
        });
        return false;
      });
  }

  componentWillMount() {
    this.state = {
      isSendButtonDisabled: false,
      email: '',
      errorMessage: '',
      successMessage: '',
      isResponseReceived: false
    };
  }

  render () {
    return (
      <section class="row row-center has-text-center auth-section"
        style="height: 100vh; position: fixed; left: 0; right: 0; background-image: linear-gradient(rgba(13, 138, 238, 0.6), \
        rgba(0, 0, 0, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.imgur.com/Ew0b1TU.jpg');">
        <div class="column column-40 auth-center">
          <form class="box" name="forgotpasswordform" onSubmit={this.send.bind(this)}>
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
            <div class="row"> {/* comment end */}
              <div class="column auth-form">
                <div class="field">
                  <input autofocus type="email" id="email" placeholder="Email" name="email" disabled={this.state.isResponseReceived} required />
                  <label for="email" class="has-text-left" style="font-size:0.8em">Enter your registered Email</label>
                </div>
                <div id="error" class="error-color">{this.state.errorMessage}</div>
                <div id="error" class="success-color">{this.state.successMessage}</div>
                <button disabled={this.state.isSendButtonDisabled} class="button-margin is-fullwidth">Send</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
