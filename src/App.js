import React from 'react';
import OnlineApplications from './OnlineApplications'
import Header from './Header'
import MyApplications from './MyApplications'
import Alerts from './Alerts'
import './App.css';


class App extends React.Component {

  render() {
    return (
    <div class="app-container">
      <Header />
      <OnlineApplications />
      <MyApplications />
      <Alerts />
    </div>
    );
  }
}

export default App;
