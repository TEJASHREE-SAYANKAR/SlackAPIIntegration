# 📩 Slack Messaging App (MERN + MongoDB + Slack API)

This project is a **Slack Messaging App** built with the **MERN stack** (MongoDB, Express, React, Node.js) and integrated with the **Slack API**.
It allows you to **send, schedule, edit, retrieve, and delete messages** inside a Slack workspace (via the **Slack Developer Sandbox**).

---

## 🚀 Features

* 🔑 **Slack Authentication (Token-based via Sandbox)**
* ✉️ **Send Messages** to a channel
* ⏰ **Schedule Messages** for future delivery
* 📜 **Retrieve Messages** from Slack or MongoDB
* 🔍 **Fetch Specific Message** by Slack timestamp
* ✏️ **Edit Messages**
* 🗑️ **Delete Messages**
* 🗄️ **MongoDB Integration** for storing message history

---

## 📂 Folder Structure

```
slack-mern-app/
│
├── backend/               # Express + MongoDB + Slack API
│   ├── config/            # DB connection
│   ├── controllers/       # Slack logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── server.js          # Entry point
│   └── .env               # Environment variables
│
├── frontend/              # React (CRA or Vite)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── api.js         # API calls
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/slack-mern-app.git
cd slack-mern-app
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

#### Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/slackdb
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_CHANNEL_ID=slack_channel_id
```

#### Start backend

```bash
npm start
```

Backend runs at: **[http://localhost:5000](http://localhost:5000)**

---

### 3. Setup Frontend

```bash
cd ../frontend
```

If using **Create React App**:

```bash
npx create-react-app .
npm install axios
npm start
```

If using **Vite**:

```bash
npm create vite@latest .
npm install axios
npm run dev
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)** (CRA) or **[http://localhost:5173](http://localhost:5173)** (Vite)

---

## 🧑‍💻 Slack Developer Sandbox Setup

1. Go to 👉 [Slack Developer Sandbox](https://api.slack.com/docs/developer-sandbox)
2. Create a **sandbox workspace**
3. Create a **Slack App** inside it
4. Add OAuth scopes under **OAuth & Permissions**:

   * `chat:write`
   * `chat:write.public`
   * `channels:history`
   * `chat:write.customize`
5. Install the app to workspace → get **Bot Token (xoxb-...)**
6. Copy **Channel ID** (right-click channel → Copy link → extract ID)
7. Add them to `.env`

---

## 🔗 API Endpoints (Backend)

Base URL: `http://localhost:5000/api/slack`

| Method | Endpoint       | Description                      |
| ------ | -------------- | -------------------------------- |
| POST   | `/send`        | Send or schedule message         |
| GET    | `/messages`    | Retrieve all messages (Slack)    |
| GET    | `/message/:ts` | Retrieve specific message by ts  |
| GET    | `/local`       | Retrieve stored MongoDB messages |
| PUT    | `/update`      | Edit a message                   |
| DELETE | `/delete`      | Delete a message                 |

---

## 🎨 Frontend UI

* **MessageForm** → send new or scheduled message
* **MessageList** → view messages from MongoDB, edit or delete them
* **Search by Timestamp** → fetch specific message from Slack by ID

---

## 🛠️ Tech Stack

* **Frontend:** React (CRA or Vite), Axios
* **Backend:** Express, MongoDB, Mongoose, Axios, dotenv, cors
* **Slack API:** `chat.postMessage`, `chat.scheduleMessage`, `chat.update`, `chat.delete`, `conversations.history`, `conversations.replies`
* **Database:** MongoDB (local or Atlas)

---

## 📌 Notes

* Always test in the **Slack Developer Sandbox** (not production).
* Messages you send will appear in your sandbox channel.
* MongoDB stores a local history of sent/scheduled messages.

---

## ✅ Assignment Coverage

* Authentication/Login → ✅ Slack Bot Token via Sandbox
* Send or Schedule Message → ✅ Implemented
* Retrieve Message → ✅ By history + timestamp
* Edit Message → ✅ Implemented
* Delete Message → ✅ Implemented
* Developer Sandbox → ✅ Safe test environment

---

## 🏁 Run All Together

1. Start MongoDB

   ```bash
   mongod
   ```
2. Run Backend

   ```bash
   cd backend
   npm start
   ```
3. Run Frontend

   ```bash
   cd frontend
   npm start   # (CRA)
   npm run dev # (Vite)
   ```
4. Open browser → **[http://localhost:3000](http://localhost:3000)**

