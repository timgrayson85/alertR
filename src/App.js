import React from 'react';
import OnlineApps from './OnlineApps'
import Header from './Header'
import MyApps from './MyApps'
import Alerts from './Alerts'
import './App.css';

function App() {
  return( 
  <div class="app-container">
  <Header />
  <OnlineApps />
  <MyApps />
  <Alerts />
  </div>
  );
}

export default App;
