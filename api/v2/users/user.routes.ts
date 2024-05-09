import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../../../controllers/v2/users/UserControl";

const router = Router();

router.get("/getUser/:id", getUser);

router.post("/createUser", createUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/getAllUsers", getUsers);

export default router;
