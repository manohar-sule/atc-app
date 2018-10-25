import { h, Component } from 'preact';
import SideBar1 from '../../components/sideBar1';

export default class Home extends Component {

  componentDidMount() {

  }
  render() {
    return (
      <div>
      <SideBar1 activeMenu={'/home'}/>
        <div id="main-body" class=" main outer-most-div margin-left-76" >
          <section class="row" style="margin-bottom:7px">
            <div class="column">
              <ul class="breadcrumbs">
                <li class="active">Home</li>
              </ul>
            </div>
          </section>
          <section class="row has-text-center" style="margin-top:40vh">
            <div class="column">
              <h4>Coming Soon...</h4>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
