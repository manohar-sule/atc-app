import { h, Component } from 'preact';
import { route } from 'preact-router';
// import { AppStore } from '../../lib/store';

export default class NavigationDropdown extends Component {

  navigateToPage(e) {
    if (!e.target.value) {
      return;
    }
    route(e.target.value);
  }

  componentWillMount() {
    this.state = {
      isClientAdmin: {},
      selectedRoute: ''
    };

  }

  componentDidMount() {
    this.setState({selectedRoute:this.props.currentRoute});
  }

  render(props, { selectedRoute}) {
    return (
      <div class="column display-inline p-l-0 ">
        <span class=" select" style="width:auto!important">
          <select onChange={this.navigateToPage.bind(this)} name="selectedRoute" title="Navigate To"
            className={'p-l-0 main-navigation-select ' + (selectedRoute ? 'selected-option' : '')}>
            {/*This is an example*/}
            <option value="/" selected={selectedRoute === '/'}>Clients</option>

          </select>
        </span>
      </div>
    );
  }
}
