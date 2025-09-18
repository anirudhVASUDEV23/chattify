import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// router.get("/test", arcjetProtection, (req, res) => {
//   res.status(200).json({ message: "Test route is working" });
// });

router.post("/login", login);

router.use(arcjetProtection);

router.post("/signup", signup);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, (req, res) => {
  res.status(200).json(req.user);
});

/*in /check if user is logged in we are sending the user object
else from the protectedRoute middleware we are sending the error of Unauthorized
*/

export default router;
