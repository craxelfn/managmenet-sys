const router = require("express").Router();
const {
  createConversation,
  getUserConversations,
  getConversationByTwoUserIds,
} = require("../controllers/conversationsController");

// Create a new conversation
router.post("/", createConversation);

// Get conversations of a user
router.get("/:userId", getUserConversations);

// Get conversation that includes two user IDs
router.get("/find/:firstUserId/:secondUserId", getConversationByTwoUserIds);

module.exports = router;
