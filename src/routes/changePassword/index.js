import { h, Component } from 'preact';
import {route} from 'preact-router';
import { Toast } from '../../lib/toastr';
import CONSTANTS from '../../lib/constants';
import { AppStore } from '../../lib/store';
import http from 'fetch-bb';
import linkState from 'linkstate';

let changePasswordToken;

export default class changePassword extends Component {

  showHide(e) {
    e.preventDefault();
    // e.stopPropagation();
    this.setState({
      otype: this.state.otype === 'text' ? 'password' : 'text'
    });
  }

  showHideN(e) {
    e.preventDefault();
    // e.stopPropagation();
    this.setState({
      ntype: this.state.ntype === 'text' ? 'password' : 'text'
    });
  }

  changePassword(e) {
    e.preventDefault();
    this.setState({
      isResponseReceived:true,
      newpassword : e.target.newPass.value,
      confirmNewPassword : e.target.confirmPass.value,
      isButtonClicked: true
      // shortName: AppStore.get('userinfo').company.shortName
    });

    let newpassword = e.target.newPass.value;
    let confirmNewPassword = e.target.confirmPass.value;
    // if (newpassword !== confirmNewPassword){
    //   this.setState({
    //     isResponseReceived:false,
    //     isButtonClicked: false
    //   });
    //   new Toast('Passwords do not match', Toast.TYPE_ERROR, Toast.TIME_LONG);
    // }
    http.put(`${CONSTANTS.API_URL}/api/user/changepassword`,{
      newPassword: newpassword,
      confirmpassword: confirmNewPassword
    })
      .then(() => {
        new Toast('Password changed successfully, login again with new password', Toast.TYPE_DONE, Toast.TIME_LONG);
        this.setState({errorMessage: ''});
        this.logout();
      })
      .catch((HTTPException) => {
        if (HTTPException.statusCode === 409) {
          this.setState({
            isResponseReceived:false,
            isButtonClicked: false,
            shortName: ''
          });
          new Toast('Passwords do not match', Toast.TYPE_ERROR, Toast.TIME_LONG);
          return this.setState({errorMessage: 'Passwords do not match', successMessage: ''});
        }
        else if (HTTPException.statusCode === 400) {
          this.setState({
            isResponseReceived:false,
            isButtonClicked: false,
            shortName: ''
          });
          new Toast('Passwords must contain At least 6 characters, including UPPERCASE, lowercase letters, '+
           'special characters and Digits', Toast.TYPE_ERROR, Toast.TIME_LONG);
          return this.setState({errorMessage: 'Passwords must contain At least 6 characters, including UPPERCASE, lowercase letters, '+
             'special characters and Digits', successMessage: ''});
        }
        this.setState({
          isResponseReceived: false,
          isButtonClicked: false,
          shortName: AppStore.get('userinfo').company.shortName
        });
      });
  }

  logout() {
    http.post(`${CONSTANTS.API_URL}/api/user/logout`)
      .then(() => {
        AppStore.removeAll();
        new Toast('Successfully logged out', Toast.TYPE_DONE, Toast.TIME_LONG);
        route(`/`);
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
      });
  }

  goBack() {
    return history.go(-2);
  }

  componentWillMount() {
    this.state = {
      otype: 'password',
      ntype: 'password',
      score: 'null',
      shortName: '',
      isResponseReceived: false,
      isButtonClicked: false,
      newpassword : '',
      confirmNewPassword :'',
      errorMessage: '',
      successMessage: ''
    };
    let userinfo=AppStore.get('userinfo');
    this.setState({
      shortName: userinfo.company.shortName
    });
  }
  componentDidMount() {
    changePasswordToken = this.props.matches.changePasswordToken;
    if (!changePasswordToken) {
      route('/changePassword');
    }
  }

  render ({}, {}) {//newpassword, confirmNewPassword
    return (
      <section class="row row-center has-text-center auth-section verify-background">
        <div class="column auth-center" style="max-width:35rem !important;">
          <form class="box" onSubmit={this.changePassword.bind(this)}>
            <div class="row">
              <div class="column">
                <h6 class="inline">Confirm Password</h6>
              </div>
            </div>
            <div class="row">
              <div class="column auth-form" style="position:relative;">
                <div class="row field">
                  <input id="txtpassword" name="newPass" placeholder="Enter New Password" onInput={linkState(this, 'newpassword')}
                    type={this.state.otype}  disabled={this.state.isResponseReceived} value={this.state.newpassword} required/>
                  <label for="txtpassword" class="has-text-left" style="font-size:0.8em">Enter New Password</label>
                  <span style="position: absolute; font-size: 1.6rem; right: 26px; top: 50px; cursor: pointer" onClick={this.showHide.bind(this)}>
                    <i class={this.state.otype === 'text' ? 'icon-eye' : 'icon-eye-disabled'}/>
                  </span>
                </div>
                <div class="row field">
                  <input id="confirmPass" name="confirmPass" type={this.state.ntype} placeholder="Confirm New Password" value={this.state.confirmNewPassword}
                    disabled={this.state.isResponseReceived} onInput={linkState(this, 'confirmNewPassword')} required/>
                  <label for="confirmPass" class="has-text-left" style="font-size:0.8em">Confirm New Password</label>
                  <span onClick={this.showHideN.bind(this)} style="position: absolute; font-size: 1.6rem; right: 26px; top: 115px; cursor: pointer">
                    <i class={this.state.ntype === 'text' ? 'icon-eye' : 'icon-eye-disabled'}/>
                  </span>
                </div>

                {this.state.errorMessage && (
                  <div id="error" class="error-color">
                    <span>
                      {this.state.errorMessage}

                    </span>
                  </div>
                )}
                {this.state.successMessage && (
                  <div>
                    <span>{this.state.successMessage}

                    </span>
                  </div>
                )}
                <div class="row">
                  <div class="column">
                    <button type="button" onClick={this.goBack.bind(this)} id="confirmButton" class="is-fullwidth">Cancel</button>
                  </div>
                  <div class="column">
                    <button type="submit" disabled={this.state.isButtonClicked} id="confirmButton" class="is-fullwidth">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <p>  Choose a strong password and do not reuse it for other accounts..</p>
        </div>
      </section>
    );
  }
}
