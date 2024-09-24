const router = require("express").Router();
const {
  addMessage,
  getMessagesByConversationId,
} = require("../controllers/messageController");

// Add a new message
router.post("/", addMessage);

// Get all messages for a specific conversation
router.get("/:conversationId", getMessagesByConversationId);

module.exports = router;
