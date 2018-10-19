import { h, Component } from 'preact';
import { route } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import { Toast } from '../../lib/toastr';
import { AppStore } from '../../lib/store';
import { stopLoader } from '../../lib/utils';
import { Link } from 'preact-router';
import http from 'fetch-bb';

export default class ForgotPassword extends Component {
  login(e) {
    e.preventDefault();
    route('/');
    // this.setState({
    //   isResponseReceived: true,
    //   email: e.target.email.value,
    //   password: e.target.password.value,
    //   shortName: this.props.matches.shortName,
    //   isButtonClicked: true
    // });
    // return http
    //   .post(`${CONSTANTS.API_URL}/api/auth/local`, {
    //     email: e.target.email.value,
    //     password: e.target.password.value,
    //     shortName: this.state.shortName
    //   })
    //   .then((response) => {
    //     AppStore.set('token', {
    //       token: response.token
    //     });
    //     this.setState({
    //       isResponseReceived:false,
    //       isButtonClicked: false
    //     });
    //     return http.get(`${CONSTANTS.API_URL}/api/user/me`)
    //       .then((userinfo) => {
    //         AppStore.set('userinfo', userinfo);
    //         // console.log(userinfo);
    //         if (userinfo.company.isConsumerVerificationStage) {
    //           return route('consumerVerificationList/companyverificationpending?pageNo=1');
    //         }
    //         return route('/home');
    //       });
    //   })
    //   .catch((HTTPException) => {
    //     console.error(HTTPException);
    //     this.setState({
    //       isResponseReceived:false,
    //       isButtonClicked: false
    //     });
    //     return new Toast(HTTPException.message, Toast.TYPE_ERROR, Toast.TIME_LONG);
    //   });
  }

  checkForValidshortName () {
    return http
      .get(`${CONSTANTS.API_URL}/api/company/shortName/${this.state.shortName}`)
      .then(() => {
      //  console.log(resp);
      })
      .catch((HTTPException) => {
        new Toast('Invalid Short Name', Toast.TYPE_ERROR, Toast.TIME_LONG);
        console.error(HTTPException);
        return route('/notFound');
      });
  }

  componentWillMount () {
    this.state = {
      shortName: '',
      email: '',
      password: '',
      token: '',
      isResponseReceived: false,
      isButtonClicked: false
    };
  }

  componentDidMount() {
    if (AppStore.get('token') && Object.keys(AppStore.get('token')).length){
      return http
        .get(`${CONSTANTS.API_URL}/api/validateSession/${AppStore.get('token').token}`)
        .then(() => {
          return route('/home');
        })
        .catch((HTTPException) => {
          new Toast('Session Expired.', Toast.TYPE_ERROR, Toast.TIME_LONG);
          console.error(HTTPException);
          stopLoader();
          AppStore.removeAll();
          return route('/');
        });
    }
    return;
  }

  render() {
    return (
      <section class="row-center main-login-section">
        <div class="limiter auth-center">
          <div class="container-login100">
            <div class="wrap-login100">

              <form class="login100-form validate-form" onSubmit={this.login.bind(this)}>
                <img src="assets/static/atc.jpg" style="width:200px"/>
                <br/>
                <span style="display:inline-block;margin:10px 0;font-size:15px">
                  Please enter your registered Email ID
                </span>
                <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                  <input class="input100" value={this.state.email} id="email" type="email" autofocus name="email" maxlength="75" placeholder="Email"
                    disabled={this.state.isResponseReceived} required />
                  <span class="focus-input100"/>
                  <span class="symbol-input100" style="position: absolute;left: 75%;">
                    <i class="fa fa-envelope" aria-hidden="true"/>
                  </span>
                </div>

                <div class="container-login100-form-btn">
                  <button class="login100-form-btn">
                    SEND
                  </button>
                </div>

                <div class="text-center p-t-12">
                  <Link class="hyperlink" href={`/`} style="color:#ad0b0b!important">Go to Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    );
  }
}
