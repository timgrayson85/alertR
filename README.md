# 🚨 alertR

```
                   _    _     _ _
            /\    | |  | |   | | |
           /  \   | |  | | __| | | ___ _ __
          / /\ \  | |  | |/ _` | |/ _ \ '__|
         / ____ \ | |__| | (_| | |  __/ |
        /_/    \_\\____/ \__,_|_|\___|_|
```

**Real-time alert notifications for when things go wrong.**

Let your colleagues know instantly when something bad has happened.

![demo](http://g.recordit.co/cziKJwlF9h.gif)

---

## ✨ Features

- 🔔 **Real-time alerts** — Instantly notify your team when incidents occur
- 🌐 **Web-based dashboard** — Easy-to-use interface for managing alerts
- 🗄️ **MySQL backend** — Reliable data storage for alert history
- ⚡ **Node.js powered** — Fast, lightweight, and scalable

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v14+ recommended)
- MySQL database
- npm (comes with Node.js)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/timgrayson85/alertR.git
   cd alertR
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   node mysql-setup.js
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   ```

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime   | Node.js    |
| Database  | MySQL      |
| Build     | Grunt      |
| Testing   | Mocha      |

---

## 📁 Project Structure

```
alertR/
├── app.js              # Main application entry point
├── public/             # Static assets (CSS, JS, images)
├── index.html          # Frontend dashboard
├── mysql-setup.js      # Database configuration script
├── test/               # Test suite
└── package.json        # Dependencies and scripts
```

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