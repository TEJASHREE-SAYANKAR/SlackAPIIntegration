import React, { useState } from "react";
import { sendMessage } from "../api";

const MessageForm = ({ onMessageSent }) => {
  const [text, setText] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({ text, scheduleTime: scheduleTime || null });
    setText("");
    setScheduleTime("");
    onMessageSent();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={scheduleTime}
        onChange={(e) =>
          setScheduleTime(Math.floor(new Date(e.target.value).getTime() / 1000))
        }
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
