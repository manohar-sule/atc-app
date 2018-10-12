import { h, Component } from 'preact';
import CONSTANTS from '../../lib/constants';
import { Toast } from '../../lib/toastr';
import { route } from 'preact-router';
import http from 'fetch-bb';

export default class ForgotPassword extends Component {

  shouldComponentUpdate() {

  }

  send(e) {
    e.preventDefault();
    route('/');
    // this.setState({
    //   email: e.target.email.value,
    //   isResponseReceived:true,
    //   errorMessage: '',
    //   successMessage: '',
    //   shortName: this.props.matches.shortName
    // });
    // http.post(`${CONSTANTS.API_URL}/api/forgotpassword`, {
    //   email: this.state.email,
    //   shortName: this.state.shortName
    // })
    //   .then(() => {
    //     this.setState({successMessage: 'Please check your Inbox for further instructions'});
    //     this.setState({errorMessage: ''});
    //     this.state.isSendButtonDisabled = true;
    //     this.setState({
    //       isResponseReceived:false
    //     });
    //   })
    //   .catch(() => {
    //     this.setState({errorMessage: 'Registered user not found'});
    //     this.setState({successMessage: ''});
    //     this.setState({
    //       isResponseReceived:false
    //     });
    //     return false;
    //   });
  }

  checkForValidshortName() {
    http
      .get(`${CONSTANTS.API_URL}/api/company/shortName/${this.state.shortName}`)
      .then((resp) => {
        console.log(resp);
      })
      .catch((HTTPException) => {
        new Toast('Invalid Short Name', Toast.TYPE_ERROR, Toast.TIME_LONG);
        console.error(HTTPException);
        return route('/notFound');
      });
  }

  componentWillMount() {
    this.state = {
      isSendButtonDisabled: false,
      email: '',
      errorMessage: '',
      successMessage: '',
      shortName: '',
      isResponseReceived: false
    };
    this.setState({
      shortName: this.props.matches.shortName
    });
  }

  componentDidMount() {
    // this.checkForValidshortName();
  }

  render () {
    return (
      <section class="row row-center has-text-center auth-section">
        <div class="column column-40 auth-center">
          <form name="forgotpasswordform" onSubmit={this.send.bind(this)}>
            <div class="row">
              <div class="column">
                <h2 style="font-weight:bold;letter-spacing:5px;color:#2c1d4a">ATC</h2>
              </div>
            </div>
            <div class="row box">
              <div class="column auth-form">
                <div class="field">
                  <input autofocus value={this.state.email} id="email" type="email" placeholder="Email" maxlength="75" name="email"
                    disabled={this.state.isResponseReceived} required />
                  <label for="email" class="has-text-left" style="font-size:0.8em">Enter your Registered Email</label>
                </div>
                <div id="error" class="error-color">{this.state.errorMessage}</div>
                <div id="error" class="success-color">{this.state.successMessage}</div>
                <button type="submit" disabled={this.state.isSendButtonDisabled} class="button-margin is-fullwidth auth-button">Send</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
