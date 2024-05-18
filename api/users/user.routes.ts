import { Router } from "express";
import {
  SignIn,
  SignUp,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersByRole,
} from "../../controllers/users/UserControl";
import { validateUser, validateSignIn } from "../../middleware/validate";

const router = Router();

router.get("/getUser/:id", getUser);

router.post("/SignUp", validateUser, SignUp);

router.post("/SignIn", validateSignIn, SignIn);

router.put("/updateUser/:id", validateUser, updateUser);

router.delete("/deleteUser/:id", deleteUser);

router.get("/getAllUsers", getUsers);

router.get("/getUsersByRole/:role", getUsersByRole);

export default router;
