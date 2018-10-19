import { h, Component } from 'preact';
import { route } from 'preact-router';
import CONSTANTS from '../../lib/constants';
import { Toast } from '../../lib/toastr';
import { AppStore } from '../../lib/store';
import { stopLoader } from '../../lib/utils';
import { Link } from 'preact-router';
import http from 'fetch-bb';

export default class Login extends Component {
  login(e) {
    e.preventDefault();
    route('/home');
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

      <section>
        <div class="limiter">
          <div class="container-login100">
            <div class="wrap-login100">
              <div class="login100-pic js-tilt" data-tilt>
                <img src="./assets/static/atc_1.png" alt="IMG"/>
              </div>

              <form class="login100-form validate-form" onSubmit={this.login.bind(this)}>
                <span class="login100-form-title">
                  Member Login
                </span>

                <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                  <input class="input100" value={this.state.email} id="email" type="email" autofocus name="email" maxlength="75" placeholder="Email"
                    disabled={this.state.isResponseReceived} required />
                  <span class="focus-input100"/>
                  <span class="symbol-input100" style="position: absolute;left: 75%;">
                    <i class="fa fa-envelope" aria-hidden="true"/>
                  </span>
                </div>

                <div class="wrap-input100 validate-input" data-validate = "Password is required">
                  <input class="input100" value={this.state.password} id="password" type="password" placeholder="Password"
                    disabled={this.state.isResponseReceived} required/>
                  <span class="focus-input100"/>
                  <span class="symbol-input100" style="position: absolute;left: 75%;">
                    <i class="fa fa-lock" aria-hidden="true"/>
                  </span>
                </div>

                <div class="container-login100-form-btn">
                  <button class="login100-form-btn">
                    Login
                  </button>
                </div>

                <div class="text-center p-t-12">
                  <Link class="hyperlink" href={`/forgotpassword`}>Forgot password?</Link>
                </div>

                <div class="text-center p-t-136">
                  <a class="txt2" href="#">
                    Create your Account
                    <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"/>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

      </section>
    );
  }
}
