const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Create database file in the project directory
const dbPath = path.join(__dirname, 'data', 'db.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, {
    alerts: [
        { id: 1, name: 'Critical', severity: 'Critical', colour: 'Red' },
        { id: 2, name: 'Warning', severity: 'Warning', colour: 'Amber' },
        { id: 3, name: 'Info', severity: 'Info', colour: 'Blue' },
        { id: 4, name: 'OK', severity: 'OK', colour: 'Green' }
    ],
    applications: [
        { id: 1, name: 'TradeX', location: 'Front Office' },
        { id: 2, name: 'Book3000', location: 'Front Office' },
        { id: 3, name: 'LegalCheck', location: 'Middle Office' },
        { id: 4, name: 'DataFaker', location: 'Middle Office' },
        { id: 5, name: 'RiskAnalyser', location: 'Back Office' },
        { id: 6, name: 'Accounter', location: 'Back Office' }
    ],
    history: []
});

// Initialise the database
async function initDb() {
    // Ensure data directory exists
    const fs = require('fs');
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Read existing data or use defaults
    await db.read();
    
    // Write initial data if file doesn't exist
    if (!db.data.history) {
        db.data.history = [];
    }
    await db.write();
    
    console.log('Database initialised');
}

// Helper functions to mimic SQL queries
const queries = {
    // Get latest alert for an application
    getLatestAlert: (appName) => {
        const history = db.data.history.filter(h => h.applicationName === appName);
        if (history.length === 0) return null;
        return history.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    },
    
    // Add alert to history
    addAlert: async (appName, alertName, message) => {
        db.data.history.push({
            applicationName: appName,
            alertName: alertName,
            date: new Date().toISOString(),
            description: message
        });
        await db.write();
    },
    
    // Get monthly stats for an application
    getAppStats: (appName) => {
        const history = db.data.history.filter(h => h.applicationName === appName);
        const stats = {};
        history.forEach(h => {
            const month = h.date.substring(0, 7); // YYYY-MM
            stats[month] = (stats[month] || 0) + 1;
        });
        return Object.entries(stats)
            .map(([month, count]) => ({ Month: month, count }))
            .sort((a, b) => b.Month.localeCompare(a.Month));
    },
    
    // Get all applications
    getApplications: () => db.data.applications,
    
    // Get all alert levels
    getAlerts: () => db.data.alerts
};

module.exports = { db, initDb, queries };