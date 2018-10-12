import { h, Component } from 'preact';
import {route} from 'preact-router';
import { Toast } from '../../../lib/toastr';
import CONSTANTS from '../../../lib/constants';
import { AppStore } from '../../../lib/store';
import http from 'fetch-bb';
import linkState from 'linkstate';

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
    http.put(`${CONSTANTS.API_URL}/api/admin/user/changepassword`,{
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
            isButtonClicked: false
          });
          new Toast('Passwords do not match', Toast.TYPE_ERROR, Toast.TIME_LONG);
          return this.setState({errorMessage: 'Passwords do not match', successMessage: ''});
        }
        else if (HTTPException.statusCode === 400) {
          this.setState({
            isResponseReceived:false,
            isButtonClicked: false
          });
          new Toast('Passwords must contain At least 6 characters, including UPPERCASE, lowercase letters, '+
           'special characters and Digits', Toast.TYPE_ERROR, Toast.TIME_LONG);
          return this.setState({errorMessage: 'Passwords must contain At least 6 characters, including UPPERCASE, lowercase letters, '+
             'special characters and Digits', successMessage: ''});
        }
        this.setState({
          isResponseReceived: false,
          isButtonClicked: false
        });
      });
  }

  logout() {
    http.post(`${CONSTANTS.API_URL}/api/admin/logout`)
      .then(() => {
        AppStore.removeAll();
        new Toast('Successfully logged out', Toast.TYPE_DONE, Toast.TIME_NORMAL);
        route(`/admin/login`);
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
      isResponseReceived: false,
      isButtonClicked: false,
      newpassword : '',
      confirmNewPassword :'',
      errorMessage: '',
      successMessage: ''
    };
  }

  componentDidMount() {
  }

  render ({}, {}) {//newpassword, confirmNewPassword
    return (
      <section class="row row-center has-text-center auth-section verify-background">
        <div class="column  auth-center">
          <form class="box" onSubmit={this.changePassword.bind(this)}>
            <div class="row">
              <div class="column">
                <h6 class="inline">Confirm Password</h6>
              </div>
            </div>
            <div class="row">
              <div class="column auth-form" style="position:relative;">
                <div class="row field">
                  <input id="txtpassword" name="newPass" value={this.state.newpassword}
                    type={this.state.otype} placeholder="Enter New Password" disabled={this.state.isResponseReceived}
                    onInput={linkState(this, 'newpassword')} required/>
                  <label for="txtpassword" class="has-text-left" style="font-size:0.8em">Enter New Password</label>
                  <span onClick={this.showHide.bind(this)} class="has-text-right"
                    style="position:absolute; cursor: pointer; font-size: 1.6em; right: 16px; top: 50px;">
                    <i class={this.state.otype === 'text' ? 'icon-eye' : 'icon-eye-disabled'}/>
                  </span>
                </div>
                <div class="row field">
                  <input id="confirmPass" name="confirmPass" type={this.state.ntype} placeholder="Confirm New Password"
                    value={this.state.confirmNewPassword} onInput={linkState(this, 'confirmNewPassword')} disabled={this.state.isResponseReceived} required/>
                  <label for="confirmPass" class="has-text-left" style="font-size:0.8em">Confirm New Password</label>
                  <span onClick={this.showHideN.bind(this)} class="has-text-right"
                    style="position:absolute; cursor: pointer; font-size: 1.6em; right: 16px; top: 115px;">
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
