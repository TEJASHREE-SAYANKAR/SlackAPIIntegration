import express from "express";
import {
  sendMessage,
  getMessages,
  getMessageByTs,
  updateMessage,
  deleteMessage,
  getLocalMessages
} from "../controllers/slackController.js";

const router = express.Router();

router.post("/send", sendMessage);            // send/schedule message
router.get("/messages", getMessages);         // get all from Slack
router.get("/message/:ts", getMessageByTs);   // get single message by timestamp
router.get("/local", getLocalMessages);       // get stored DB messages
router.put("/update", updateMessage);         // edit message
router.delete("/delete", deleteMessage);      // delete message

export default router;
