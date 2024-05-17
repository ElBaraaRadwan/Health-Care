import { Router } from "express";
import {
  assignNurseToProgram,
  assignProgramToPatient,
  modifyProgram,
  deleteProgram,
  createProgram,
  getProgram,
  getPrograms,
} from "../../controllers/users/ProgramControl";

const router = Router();
router.put("/user/NurseToProgram/", assignNurseToProgram);
router.put("/user/ProgramToPatient/", assignProgramToPatient);
router.put("/modifyProgram/", modifyProgram);
router.post("/createProgram/", createProgram);
router.delete("/deleteProgram/:id", deleteProgram);
router.get("/getProgram/:id", getProgram);
router.get("/getPrograms", getPrograms);

export default router;
