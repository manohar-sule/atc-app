import { h, Component } from 'preact';
import { route } from 'preact-router';
import { AppStore } from '../../lib/store';
import CONSTANTS from '../../lib/constants';
import http from 'fetch-bb';
import { Link } from 'preact-router';

export default class AdminNavigationDropdown extends Component {
  navigateToSubComponent(e) {
    if (e.target.value === 'companyList') {
      return route(`/admin/companies`);
    }
    if (e.target.value === 'tariffCategory') {
      return route(`/admin/tariffCategory`);
    }
    if (e.target.value === '/admin/supportUsers') {
      return route(`/admin/supportUsers`);
    }
    if (e.target.value === 'report') {
      route(`/admin/company/${this.state.companyDetails._id}/report`);
      return location.reload();
    }
    if (e) {
      this.setState({
        displayViewName: e.target.value
      });
      route(`/admin/company/${this.state.companyDetails._id}/${e.target.value}`);
    }
  }

  getCompanyDetails() {
    return http.get(`${CONSTANTS.API_URL}/api/silo/company/${this.props.companyID}`)
      .then((companyDetails) => {
        this.setState({
          companyDetails
        });
        AppStore.set('companyDetails', companyDetails);
      })
      .catch((HTTPException) => {
        console.error(HTTPException);
      });
  }

  componentWillMount() {
    this.state = {
      displayViewName: this.props.value,
      companyDetails: '',
      loggedInUserInfo: AppStore.get('userinfo')
    };
  }

  componentDidMount() {
    this.getCompanyDetails();
  }


  render({}, {companyDetails, loggedInUserInfo}) {
    const displayStatus = { demo: 'DEMO', active: 'ACTIVE', disabled: 'DISABLED', suspended: 'SUSPENDED', live: 'LIVE' };
    return (
      <section class="box">
        <div class="row">

          <div class="column column-60 no-padding">
            <h6 class="header-color-blue"><Link href={`/admin/company/${companyDetails._id}/dashboard`} >
              {companyDetails.name} ({companyDetails.shortName})</Link></h6>
            <span class="tag">{displayStatus[companyDetails.status] || '-'}</span>
            {/*<span> | Location # {companyDetails.address || '-'}</span>*/}
          </div>
          <div class="column has-text-right">
            <span class="select" style="width:auto!important">
              <select style="width:auto;" onChange={this.navigateToSubComponent.bind(this)} value="">
                <option value="">Navigate To</option>
                {/*<option value="companyDashboard" >Company Dashboard</option>*/}
                {/* T1031 - Replace company dashboard by tenant dashboard*/}
                <option value="dashboard" >Tenant Dashboard</option>
                <option value="companyList">Powerdek<sup style="font-size:8px;">TM</sup> Tenants list</option>
                {
                  !loggedInUserInfo.isSupportUser && (
                    <option value="users" >Manage Tenant Admins</option>
                  )
                }
                <option value="discoms" >Manage DISCOMS</option>
                <option value="discomDivision" >Manage Billing Unit</option>
                <option value="consumer" >Manage Consumers</option>
                {/*<option value="tariffCategory" >Manage Tariff Categories</option>
                <option value="consumerBulkLog" >Consumer Bulk Log</option>*/}
                <option value="report" >Legacy Report</option>
              </select>
            </span>
          </div>
        </div>
      </section>
    );
  }
}
