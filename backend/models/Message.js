import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  ts: { type: String },  // Slack timestamp ID
  channel: { type: String, required: true },
  user: { type: String, default: "bot" },
  scheduled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Message", messageSchema);
