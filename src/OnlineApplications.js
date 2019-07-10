import React from 'react';
import './App.css';
import Application from './Application'

class OnlineApps extends React.Component {

  render() {
    return (
      <div class="online-apps">Online Apps
          {this.props.allApps.map(x => (
          <Application name={x.name} status={x.status} />
          ))}
      </div>
    );
  }
}

export default OnlineApps;
