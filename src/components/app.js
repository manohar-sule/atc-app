import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Match } from 'preact-router/src/match';

import Header from './header';
import Login from '../routes/login';
import Admin from '../routes/admin';
import NotFound from '../components/error_pages/not_found';
import ForgotPassword from '../routes/forgotpassword';
import ResetPassword from '../routes/resetpassword';
import Profile from '../routes/profile';
import VerifyOldPassword from '../routes/verifyOldPassword';
import ChangePassword from '../routes/changePassword';
import UserVerification from '../routes/userVerification';
import SetPassword from '../routes/setpassword';
import Footer from './footer';
import AdminForgotPassword from '../routes/admin/forgotpassword';
import AdminVerifyOldPassword from '../routes/admin/verifyOldPassword';
import AdminChangePassword from '../routes/admin/changePassword';
import AdminSetPassword from '../routes/admin/setpassword';
import AdminUserVerification from '../routes/admin/userVerification';
import AdminResetPassword from '../routes/admin/resetpassword';
import Home from '../routes/home';
import AdminPanel from '../routes/adminPanel';

export default class App extends Component {
  checkAdminConditions(path) {
    return path !== '/admin/forgotpassword' && path !== '/admin/resetpassword' && path !== '/admin/verify' && path !== '/admin/setpassword' && path !== '/'
      && path !== '/admin/login';
  }
  render() {
    return (<div class="container">
      <Match path="/">
        {
          ({path}) => {
            if (path !== '/setup' && !/\/forgotpassword/.test(path) &&
             path !== '/resetpassword' && path !== '/verify' && path !== '/setpassword' && path !== '/notFound' && this.checkAdminConditions(path)) {
              return (<Header/>);
            }
          }
        }
      </Match>
      <Footer/>
      <Router>
        <NotFound path ='/notFound' type="404" default/>
        <Login path="/"/>
        <Home path="/home"/>
        <AdminPanel path="adminPanel" />
        <Admin path="/admin/:submodule?/:id?"/>
        <UserVerification path="/verify"/>
        <ForgotPassword path="/forgotpassword"/>
        <ResetPassword path="/resetpassword"/>
        <Profile path="/profile" />
        <VerifyOldPassword path="/verifyOldPassword" />
        <ChangePassword path="/changePassword" />
        <SetPassword path="/setpassword" />
        <AdminUserVerification path="/admin/verify"/>
        <AdminVerifyOldPassword path="/admin/verifyOldPassword" />
        <AdminChangePassword path="/admin/changePassword" />
        <AdminForgotPassword path="/admin/forgotpassword"/>
        <AdminSetPassword path="/admin/setpassword" />
        <AdminResetPassword path="/admin/resetpassword" />
      </Router>
    </div>);
  }
}