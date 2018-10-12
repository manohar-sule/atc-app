import { h, Component } from 'preact';
import { route } from 'preact-router';
import { AppStore } from '../../lib/store';

export default class TenantNavigationDropdown extends Component {
  navigateToSubComponent(e) {
    if (e.target.value === 'atcTenants') {
      return route(`/admin/companies`);
    }
    if (e.target.value === 'manageSupportUser') {
      return route(`/admin/supportUsers`);
    }
    if (e.target.value === 'tariffCategory') {
      return route(`/admin/tariffCategory`);
    }
    if (e.target.value === 'manageAdmins') {
      return route(`/admin/users`);
    }
    if (e.target.value === 'viewAdminActionLogs') {
      return route(`/admin/actionLogs`);
    }
    if (e.target.value === 'consumerBulkLog') {
      return route(`/admin/consumerBulkLog`);
    }
  }
  componentWillMount() {
    this.state = {
      loggedInUserInfo: AppStore.get('userinfo')
    };
  }

  render({}, {loggedInUserInfo}) {

    return (
      <section class="box">
        <div class="row">


          <div class="column has-text-right">
            <span class="select" style="width:auto!important">
              <select style="width:auto;" onChange={this.navigateToSubComponent.bind(this)} value="">
                <option value="">Navigate To</option>
                <option value="atcTenants" >ATC<sup style="font-size:8px;">TM</sup> Tenants</option>
                {
                  !loggedInUserInfo.isSupportUser && (
                    <option value="viewAdminActionLogs" >View Admin Action Logs</option>
                  )
                }

                <option value="manageAdmins" >Manage Admins</option>
                <option value="manageSupportUser" >Manage Support User</option>
                <option value="tariffCategory" >Manage Tariff Categories</option>
                <option value="consumerBulkLog" >Consumer Bulk Log</option>
              </select>
            </span>
          </div>
        </div>
      </section>
    );
  }
}
