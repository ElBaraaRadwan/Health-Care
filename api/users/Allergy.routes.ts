import { Router } from "express";
const router = Router();
import { setAllergy, delAllergy } from "../../controllers/users/AllergyControl";
import { validateAllergy } from "../../middleware/validate";

router.put("/user/setAllergy/:id", validateAllergy, setAllergy);
router.put("/user/deleteAllergy/", delAllergy);

export default router;
