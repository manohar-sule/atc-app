import { h, Component } from 'preact';
import { route, Link } from 'preact-router';
import CONSTANTS from '../../../lib/constants';
import { Toast } from '../../../lib/toastr';
import { AppStore } from '../../../lib/store';
import http from 'fetch-bb';

export default class SiloLogin extends Component {
  login(e) {
    e.preventDefault();
    this.setState({
      isResponseReceived: true,
      email: e.target.email.value,
      password: e.target.password.value,
      isButtonClicked: true
    });
    return http
      .post(`${CONSTANTS.API_URL}/api/auth/silo`, {
        email: e.target.email.value,
        password: e.target.password.value
      })
      .then((response) => {
        AppStore.set('token', {
          token: response.token
        });
        return http.get(`${CONSTANTS.API_URL}/api/admin/user/me`)
          .then((userinfo) => {
            AppStore.set('userinfo', userinfo);
            // console.log(userinfo);
            return route('/admin/companies');
          });

      })
      .catch((HTTPException) => {
        console.error(HTTPException);
        this.setState({
          isResponseReceived:false,
          isButtonClicked: false
        });
        new Toast(HTTPException.message, Toast.TYPE_ERROR, Toast.TIME_LONG);
      });
  }

  componentDidMount() {
    this.state = {
      isResponseReceived: false,
      email: '',
      password: '',
      isButtonClicked: false
    };
  }

  render() {
    return (
      <section class="row row-center has-text-center auth-section"
        style=" background-image: linear-gradient(rgba(13, 138, 238, 0.6),\
        rgba(0, 0, 0, 0.6)),linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://i.imgur.com/Ew0b1TU.jpg');">
        <div class="column column-40 auth-center" >
          <h5 style="color: white; text-transform: uppercase;">Login to your account</h5>
          <form class="box" name="loginform" onSubmit={this.login.bind(this)}>
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
                  <input type="email" placeholder="Email" name="email" id="email" required="required" value={this.state.email}
                    disabled={this.state.isResponseReceived} autofocus="autofocus"/>
                  <label for="email" class="has-text-left" style="font-size:0.8em">Email</label>
                </div>
                <div class="field">
                  <input type="password" placeholder="Enter Your Password" name="password" id="password" required="required"
                    disabled={this.state.isResponseReceived} value={this.state.password}/>
                  <label for="password" class="has-text-left" style="font-size:0.8em">Password</label>
                </div>
                <button class="is-fullwidth" disabled={this.state.isButtonClicked}>Login</button>
                <Link href="/admin/forgotpassword" class="hyperlink">Forgot Password </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
