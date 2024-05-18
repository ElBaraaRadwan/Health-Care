import { Router } from "express";
import {
  assignNurseToProgram,
  assignProgramToPatient,
  updateProgram,
  deleteProgram,
  createProgram,
  getProgram,
  getPrograms,
} from "../../controllers/users/ProgramControl";
import { validateProgram } from "../../middleware/validate";

const router = Router();
router.put("/user/NurseToProgram/", assignNurseToProgram);
router.put("/user/ProgramToPatient/", assignProgramToPatient);
router.put("/modifyProgram/", validateProgram, updateProgram);
router.post("/createProgram/", validateProgram, createProgram);
router.delete("/deleteProgram/:id", deleteProgram);
router.get("/getProgram/:id", getProgram);
router.get("/getPrograms", getPrograms);

export default router;
