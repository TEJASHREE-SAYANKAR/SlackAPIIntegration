import React, { useEffect, useState } from "react";
import { getLocalMessages, updateMessage, deleteMessage, getMessageByTs } from "../api";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchTs, setSearchTs] = useState("");
  const [searchedMsg, setSearchedMsg] = useState(null);

  const fetchMessages = async () => {
    const { data } = await getLocalMessages();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleEdit = async (ts) => {
    await updateMessage({ ts, text: editText });
    setEditing(null);
    fetchMessages();
  };

  const handleDelete = async (ts) => {
    await deleteMessage({ ts });
    fetchMessages();
  };

  const handleSearch = async () => {
    if (!searchTs) return;
    const { data } = await getMessageByTs(searchTs);
    setSearchedMsg(data);
  };

  return (
    <div>
      <h3>Stored Messages (MongoDB)</h3>

      {/* Search by timestamp */}
      <div>
        <input
          type="text"
          placeholder="Enter Slack message timestamp..."
          value={searchTs}
          onChange={(e) => setSearchTs(e.target.value)}
        />
        <button onClick={handleSearch}>Fetch by Timestamp</button>
      </div>

      {searchedMsg && (
        <div>
          <strong>Found Message:</strong> {searchedMsg.text || "Not Found"}
        </div>
      )}

      {/* Messages List */}
      {messages.map((msg) => (
        <div key={msg._id}>
          {editing === msg.ts ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleEdit(msg.ts)}>Save</button>
              <button onClick={() => setEditing(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{msg.text}</span>
              {msg.scheduled && <em> (Scheduled)</em>}
              <button onClick={() => { setEditing(msg.ts); setEditText(msg.text); }}>Edit</button>
              <button onClick={() => handleDelete(msg.ts)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
