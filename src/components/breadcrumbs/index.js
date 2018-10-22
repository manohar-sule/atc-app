import { h, Component } from 'preact';

export default class Breadcrumbs extends Component {

  render({}, {}) {
    return (
      <div>
        <section>
          <ul class="breadcrumbs">
            <li><a href="#">Main page</a></li>
            <li><a href="#">About</a></li>
            <li>History</li>
          </ul>
        </section>
      </div>
    );
  }
}
