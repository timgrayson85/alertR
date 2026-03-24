# 🚨 alertR

**Real-time alert notifications for when things go wrong.**

Let your colleagues know instantly when something bad has happened.

![demo](http://g.recordit.co/cziKJwlF9h.gif)

---

## ✨ Features

- 🔔 **Real-time alerts** — Instantly notify your team when incidents occur
- 🌐 **Modern React UI** — Clean, dark-themed dashboard
- 💾 **LowDB storage** — Lightweight JSON-based persistence, no database server required
- 🔌 **REST API** — Clean API endpoints for applications and alert levels
- ⚡ **Socket.IO** — Real-time updates pushed instantly to all clients
- 🤖 **AI-ready** — Includes GitHub Copilot agent configuration for web development assistance

---

## 🔧 Recent Updates

This project has been modernised (2026):

- ✅ Migrated from MySQL to LowDB for simpler setup
- ✅ Replaced legacy HTML frontend with React + TypeScript
- ✅ Updated to Socket.IO v4
- ✅ Added REST API endpoints (`/api/applications`, `/api/alert-levels`)
- ✅ Removed hard-coded values from frontend (now fetched from API)
- ✅ Added CORS support for development
- ✅ Security vulnerability fixes applied

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18+ recommended)
- npm (comes with Node.js)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/timgrayson85/alertR.git
   cd alertR
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client && npm install && cd ..
   ```

4. **Start the backend** (in one terminal)
   ```bash
   npm start
   ```

5. **Start the React dev server** (in another terminal)
   ```bash
   cd client && npm start
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
cd client && npm run build && cd ..
npm start
# App runs on http://localhost:3001
```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Frontend | React 19 + TypeScript |
| Storage | LowDB (JSON) |
| Real-time | Socket.IO |
| Build | Vite (client), Grunt (legacy) |
| Testing | Mocha |

---

## 📁 Project Structure

```
alertR/
├── app.js                 # Main backend entry point
├── db-setup.js            # LowDB configuration and seed data
├── data/                  # JSON database storage (auto-created)
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   └── App.css        # Styles (dark theme)
│   └── package.json
├── .github/
│   └── agents/
│       └── web-dev.agent.md  # GitHub Copilot agent config
└── package.json
```

---

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/applications` | GET | Returns list of monitored applications |
| `/api/alert-levels` | GET | Returns available alert levels |

---

## 🤖 GitHub Copilot Agent

This project includes a custom Copilot agent configuration for web development assistance:

```yaml
.github/agents/web-dev.agent.md
```

The agent is configured to help with HTML, CSS, JavaScript, React, Node.js, and related web technologies.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋 Support

Found a bug or have a feature request? [Open an issue](https://github.com/timgrayson85/alertR/issues) and let's chat!

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/timgrayson85">Tim Grayson</a>
</p>