import React from 'react';
import './App.css';
import { addAppEvent } from './api'

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'Online',
      lastUpdate: '2019-05-08 10:41'
    };
  }

  render() {
    return (
      <div class="application"> 
        <span class="app-name">
          {this.props.value}
        </span>
        <span class="app-status">
          {this.state.status}
        </span>
        <span class="app-lastupdate">
          {this.state.lastUpdate}
        </span>
        <button onClick={(e) => addAppEvent(this.props.value)}>
          Add
        </button>
        <button>
          Subscribe
        </button>
      </div>
    );
  }
}

export default Application;
