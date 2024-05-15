import { Router } from "express";
import {
  assignNurseToProgram,
  assignProgramToPatient,
  setAllergy,
} from "../../controllers/users/ProgramControl";

const router = Router();

router.put("/updateUser/:id", assignNurseToProgram);
router.put("/updateUser/:id&:program", assignProgramToPatient);
router.put("/updateUser/:id", setAllergy);

export default router;
