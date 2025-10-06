import React from "react";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";

function App() {
  return (
    <div className="App">
      <h1>Slack Messaging App (MERN + MongoDB)</h1>
      <MessageForm onMessageSent={() => window.location.reload()} />
      <MessageList />
    </div>
  );
}

export default App;
