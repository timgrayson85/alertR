import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

interface Application {
  name: string;
  location: string;
}

interface Subscription {
  name: string;
  alertLevel: string;
  alertMessage: string;  alertDate: string;
}

interface Alert {
  name: string;
  severity: string;
  colour: string;
}

interface AlertData {
  Name: string;
  AlertLevel: string;
  AlertMessage: string;
}

//const ALERT_LEVELS = ['OK', 'Info', 'Warning', 'Critical'];
const ALERT_COLORS: Record<string, string> = {
  Critical: '#ef4444',
  Warning: '#f59e0b',
  Info: '#3b82f6',
  OK: '#22c55e',
};

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [myApps, setMyApps] = useState<string[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [alertModal, setAlertModal] = useState<{ app: string; open: boolean } | null>(null);
  const [selectedLevel, setSelectedLevel] = useState('Warning');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    fetch('/api/applications')
      .then(res => res.json())
      .then(setApplications)
      .catch(err => console.error('Failed to fetch applications:', err));

    fetch('/api/alert-levels')
      .then(res => res.json())
      .then(setAlerts)
      .catch(err => console.error('Failed to fetch alert levels:', err));

    newSocket.on('application-added', (name: string) => {
      setMyApps((prev) => [...prev, name]);
    });

    newSocket.on('application-removed', (name: string) => {
      setMyApps((prev) => prev.filter((app) => app !== name));
    });

    newSocket.on('subscription-added', (data: Subscription) => {
      setSubscriptions((prev) => {
        if (prev.some((sub) => sub.name === data.name)) return prev;
        return [...prev, data];
      });
    });

    newSocket.on('subscription-removed', (name: string) => {
      setSubscriptions((prev) => prev.filter((sub) => sub.name !== name));
    });

    newSocket.on('alert-raised', (data: AlertData) => {
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.name === data.Name
            ? {
                ...sub,
                alertLevel: data.AlertLevel,
                alertMessage: data.AlertMessage,
                alertDate: new Date().toLocaleString(),
              }
            : sub
        )
      );
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const removeApp = (name: string) => {
    if (socket) {
      socket.emit('remove-application', name);
    }
  };

  const subscribe = (name: string) => {
    if (socket && !subscriptions.some((s) => s.name === name)) {
      socket.emit('add-subscription', name);
    }
  };

  const unsubscribe = (name: string) => {
    if (socket) {
      socket.emit('remove-subscription', name);
    }
  };

  const addToMyApps = (name: string) => {
    if (socket && !myApps.includes(name)) {
      socket.emit('add-application', name);
    }
  };

  const raiseAlert = () => {
    if (socket && alertModal) {
      socket.emit('alert-raised', {
        Name: alertModal.app,
        AlertLevel: selectedLevel,
        AlertMessage: alertMessage,
      });
      setAlertModal(null);
      setAlertMessage('');
      setSelectedLevel('Warning');
    }
  };

  const filteredApps = applications.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAlertColor = (level: string) => ALERT_COLORS[level] || '#6b7280';

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">
          <span className="logo-icon">🚨</span>
          alertR
        </h1>
        <p className="tagline">Real-time application monitoring</p>
      </header>

      <main className="main">
        <section className="section">
          <h2 className="section-title">
            <span className="section-icon">🌐</span>
            Online Applications
          </h2>
          <input
            type="text"
            className="search-input"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="app-grid">
            {filteredApps.map((app) => (
              <div key={app.name} className="app-card">
                <div className="app-info">
                  <span className="app-name">{app.name}</span>
                  <span className="app-location">{app.location}</span>
                </div>
                <div className="app-actions">
                  <button className="btn btn-secondary" onClick={() => addToMyApps(app.name)}>
                    Add to My Apps
                  </button>
                  <button className="btn btn-primary" onClick={() => subscribe(app.name)}>
                    Watch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="columns">
          <section className="section">
            <h2 className="section-title">
              <span className="section-icon">📌</span>
              My Applications
            </h2>
            {myApps.length === 0 ? (
              <p className="empty-state">No applications added yet. Click "Watch" to add.</p>
            ) : (
              <div className="app-list">
                {myApps.map((app) => (
                  <div key={app} className="list-item">
                    <span className="item-name">{app}</span>
                    <div className="item-actions">
                      <button className="btn btn-warning" onClick={() => setAlertModal({ app, open: true })}>
                        Alert
                      </button>
                      <button className="btn btn-secondary" onClick={() => removeApp(app)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="section">
            <h2 className="section-title">
              <span className="section-icon">👀</span>
              Watching
            </h2>
            {subscriptions.length === 0 ? (
              <p className="empty-state">Not watching any applications yet.</p>
            ) : (
              <div className="watch-list">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.name}
                    className="watch-item"
                    style={{ borderLeftColor: getAlertColor(sub.alertLevel) }}
                  >
                    <div className="watch-header">
                      <span className="watch-name">{sub.name}</span>
                      <span
                        className="watch-badge"
                        style={{ backgroundColor: getAlertColor(sub.alertLevel) }}
                      >
                        {sub.alertLevel}
                      </span>
                    </div>
                    {sub.alertMessage && (
                      <p className="watch-message">{sub.alertMessage}</p>
                    )}
                    <div className="watch-footer">
                      <span className="watch-time">{sub.alertDate}</span>
                      <button className="btn btn-small" onClick={() => unsubscribe(sub.name)}>
                        Unwatch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {alertModal && (
        <div className="modal-overlay" onClick={() => setAlertModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Raise Alert for {alertModal.app}</h2>
            <div className="form-group">
              <label>Alert Level</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="form-select"
          >
            {alerts.map((level) => (
              <option key={level.name} value={level.name}>
                {level.name}
              </option>
            ))}
          </select>
        </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                placeholder="Describe the issue..."
                className="form-textarea"
                rows={3}
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setAlertModal(null)}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={raiseAlert}
                disabled={!alertMessage.trim()}
              >
                Raise Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;