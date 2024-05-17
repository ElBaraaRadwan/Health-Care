import { Router } from "express";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartments,
  getDepartment,
  disconnectFromDep,
} from "../../controllers/dep/control";

const router = Router();

router.get("/getDepartment/:id", getDepartment);

router.post("/createDepartment", createDepartment);

router.put("/updateDepartment/:id", updateDepartment);

router.put("/disconnectFromDepartment/", disconnectFromDep);

router.delete("/deleteDepartment/:id", deleteDepartment);

router.get("/getAllDepartments", getDepartments);

export default router;
