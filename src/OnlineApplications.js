import React from 'react';
import './App.css';
import Application from './Application'

class OnlineApps extends React.Component {
  render() {
    return (
      <div class="online-apps">Online Apps
          <Application value={'Panda'} />
          <Application value={'Goose'} />
      </div>
    );
  }
}

export default OnlineApps;
