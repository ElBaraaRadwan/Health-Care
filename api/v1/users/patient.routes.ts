import { Router } from "express";
import {
  createPatient,
  updatePatient,
  deletePatient,
  getPatient,
  getPatients,
} from "../../../controllers/users/patientControl";

const router = Router();

router.get("/getPatient/:id", getPatient);

router.post("/createPatient", createPatient);

router.put("/updatePatient/:id", updatePatient);

router.delete("/deletePatient/:id", deletePatient);

router.get("/getAllPatients", getPatients);

export default router;
