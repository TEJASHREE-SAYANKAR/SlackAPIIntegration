import axios from "axios";
import Message from "../models/Message.js";

const SLACK_API = "https://slack.com/api";
const token = process.env.SLACK_BOT_TOKEN;
const channel = process.env.SLACK_CHANNEL_ID;

// ✅ Send or Schedule a Message
export const sendMessage = async (req, res) => {
  const { text, scheduleTime } = req.body;

  try {
    let response;
    if (scheduleTime) {
      response = await axios.post(`${SLACK_API}/chat.scheduleMessage`, {
        channel,
        text,
        post_at: scheduleTime,
      }, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });

      if (response.data.ok) {
        await Message.create({
          text,
          channel,
          ts: response.data.scheduled_message_id,
          scheduled: true
        });
      }
    } else {
      response = await axios.post(`${SLACK_API}/chat.postMessage`, {
        channel,
        text,
      }, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      });

      if (response.data.ok) {
        await Message.create({
          text,
          channel,
          ts: response.data.ts,
          scheduled: false
        });
      }
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Retrieve all messages (Slack API)
export const getMessages = async (req, res) => {
  try {
    const response = await axios.get(`${SLACK_API}/conversations.history?channel=${channel}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data.messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Retrieve specific message by timestamp (Slack API)
export const getMessageByTs = async (req, res) => {
  const { ts } = req.params;
  try {
    const response = await axios.get(`${SLACK_API}/conversations.replies?channel=${channel}&ts=${ts}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    res.json(response.data.messages[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Retrieve stored local messages (MongoDB)
export const getLocalMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Edit a message
export const updateMessage = async (req, res) => {
  const { ts, text } = req.body;
  try {
    const response = await axios.post(`${SLACK_API}/chat.update`, {
      channel,
      ts,
      text,
    }, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    });

    if (response.data.ok) {
      await Message.findOneAndUpdate({ ts }, { text });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a message
export const deleteMessage = async (req, res) => {
  const { ts } = req.body;
  try {
    const response = await axios.post(`${SLACK_API}/chat.delete`, {
      channel,
      ts,
    }, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    });

    if (response.data.ok) {
      await Message.findOneAndDelete({ ts });
    }

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
