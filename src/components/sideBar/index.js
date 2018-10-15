import { h, Component } from 'preact';

export default class Pagination extends Component {

  componentWillMount(){
    this.state={
      route : '/data/prospects'
    };
  }

  componentDidMount() {
    this.setState({activeMenu:this.props.activeMenu});
  }

  render(props, state) {

    return (
      <div class="sidenav">
        <a href="/home">ATC</a>
        <a href="/home" class={state.activeMenu === '/home' ? 'sideNavActive' : ''}>
          <em class="icon icon-home is-large" /> Home
        </a>
        <a href="/branches" class={state.activeMenu === '/branches' ? 'sideNavActive' : ''}>
          <em class="icon icon-home is-large" /> Branch
        </a>
        <a href="/users" class={state.activeMenu === '/users' ? 'sideNavActive' : ''}>
          <em class="icon icon-user is-large" /> User
        </a>
        <a href="/roles" class={state.activeMenu === '/roles' ? 'sideNavActive' : ''}>
          <em class="icon icon-user is-large" /> Role
        </a>
      </div>
    );
  }
}
