import { h } from 'preact';
import { Router } from 'preact-router';
import AdminLogin from './login';
import NotFound from '../../components/error_pages/not_found';

const Admin = () => {
  return (
    <Router>
      <NotFound path ='/notFound' type="404" default/>
      <AdminLogin path="/admin/login" />
    </Router>
  );
};

export default Admin;
