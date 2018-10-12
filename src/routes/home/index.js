import { h, Component } from 'preact';
import SideBar from '../../components/sideBar';

export default class Home extends Component {

  componentDidMount() {

  }
  render() {
    return (
      <div>
        <SideBar activeMenu="/home" />
        <div class="main">
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
