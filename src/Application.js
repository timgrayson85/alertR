import React from 'react';
import './App.css';
import { handleAppSubEvent } from './api'

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
      hasBeenAdded: false,
      lastUpdate: '09/07/2019 23:00'
    };

      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
  }

  getState() {
    this.setState({ 
      status : this.props.status
    });
  }

  handleClick = (name) => {
    this.setState(state => ({
      hasBeenAdded: !state.hasBeenAdded
    }));

    handleAppSubEvent(name, !this.state.hasBeenAdded); 
  }

  render() {
    return (
      <div class="application"> 
        <span class="app-name">
          {this.props.name}
        </span>
        <span class="app-status">
          {this.state.status}
        </span>
        <span class="app-lastupdate">
          {this.state.lastUpdate}
        </span>
        <button onClick={() => this.handleClick(this.props.name)}>
          {this.state.hasBeenAdded ? 'Remove' : 'Add'}      
        </button>
      </div>
    );
  }
}

export default Application;
