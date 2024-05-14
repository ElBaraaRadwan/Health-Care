import { Router } from "express";
import {
  assignHeadToDep,
  assignNurseToDep,
  assignPatientToNurse,
} from "../../../controllers/v2/users/assignControl";

const router = Router();

router.post("/HeadToDep/:ids", assignHeadToDep);
router.post("/NurseToDep/:ids", assignNurseToDep);
router.post("/PatientToNurse/:ids", assignPatientToNurse);

export default router;
