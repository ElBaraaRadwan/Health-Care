import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersByRole,
} from "../../controllers/users/UserControl";

const router = Router();

router.get("/getUser/:id", getUser);

router.post("/createUser", createUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/getAllUsers", getUsers);

router.get("/getUsersByRole/:role", getUsersByRole);

export default router;
