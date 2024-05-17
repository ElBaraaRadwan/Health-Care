import { Router } from "express";
const router = Router();
import {
  setAllergy,
  delAllergy,
  // deleteAllergy,
  // modifyAllergy,
} from "../../controllers/users/AllergyControl";

router.put("/user/setAllergy/:id", setAllergy);
router.put("/deleteAllergy/", delAllergy);
// router.put("/modifyAllergy/:id", modifyAllergy);

export default router;
