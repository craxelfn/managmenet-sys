const router = require("express").Router();
const User = require("../models/User");

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) return res.status(404).json("User not found");
    
    const usersInSameDepartment = await User.find({
      department: user.department,
    }).exec();
    
    res.status(200).json(usersInSameDepartment);
  } catch (err) {
    console.error("Error fetching users by department:", err.message || err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) return res.status(404).json("User not found");
  
      res.status(200).json("User deleted successfully");
    } catch (err) {
      console.error("Error deleting user:", err.message || err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
