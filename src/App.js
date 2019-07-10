import React from 'react';
import OnlineApplications from './OnlineApplications'
import Header from './Header'
import MyApplications from './MyApplications'
import Alerts from './Alerts'
import './App.css';

const allApps = [{ name: 'Panda', status:'Online', lastUpdated: '20190512' }
              , { name: 'Goose', status:'Offline', lastUpdated: '20190511' }];

class App extends React.Component {

  render() {
    return (
    <div class="app-container">
      <Header />
      <OnlineApplications allApps={allApps}/>
      <MyApplications />
      <Alerts />
    </div>
    );
  }
}

export default App;
