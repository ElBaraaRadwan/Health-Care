import prisma from "../../../lib/prisma";
import { Request, Response } from "express";
import handleError from "../../../lib/handleError";

const assignHeadToDep = async (req: Request, res: Response): Promise<void> => {
  try {
    const { headDeptID, depID } = req.body;
    const headDept = await prisma.nurse.findUnique({
      where: { userID: headDeptID },
    });
    const dep = await prisma.department.findUnique({ where: { id: depID } });

    if (!headDept) {
      res
        .status(404)
        .json({ message: `headDept with ID:${headDeptID} Doesn't Exists` });
      return;
    }
    if (!dep) {
      res
        .status(404)
        .json({ message: `Department with ID:${depID} Doesn't Exists` });
      return;
    }

    if (headDept.depID === depID) {
      res.status(400).json({
        message: `HeadDept is already assigned to a Department ${headDept.depID}`,
      });
      return;
    } else {
      await prisma.headDept.update({
        where: { userID: headDeptID },
        data: {
          depID: depID,
        },
        include: { department: true },
      });
      res.status(200).json({ message: "HeadDept assigned successfully" });
      return;
    }
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const assignNurseToDep = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nurseID, depID } = req.body;
    const nurse = await prisma.nurse.findUnique({ where: { userID: nurseID } });
    const dep = await prisma.department.findUnique({ where: { id: depID } });

    if (!nurse) {
      res
        .status(404)
        .json({ message: `Nurse with ID:${nurseID} Doesn't Exists` });
      return;
    }
    if (!dep) {
      res
        .status(404)
        .json({ message: `Department with ID:${depID} Doesn't Exists` });
      return;
    }

    if (nurse.depID === depID) {
      res.status(400).json({
        message: `Nurse is already assigned to a Department ${nurse.depID}`,
      });
      return;
    } else {
      await prisma.nurse.update({
        where: { userID: nurseID },
        data: {
          depID: depID,
        },
        include: { department: true },
      });
      res.status(200).json({ message: "Nurse assigned successfully" });
      return;
    }
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const assignPatientToNurse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { nurseID, patientID } = req.body;
    const nurse = await prisma.nurse.findUnique({ where: { userID: nurseID } });
    const patient = await prisma.patient.findUnique({
      where: { userID: patientID },
    });

    if (!nurse) {
      res
        .status(404)
        .json({ message: `Nurse with ID:${nurseID} Doesn't Exists` });
      return;
    }
    if (!patient) {
      res
        .status(404)
        .json({ message: `Patient with ID:${patientID} Doesn't Exists` });
      return;
    }

    if (patient.nurseID === nurseID) {
      res.status(400).json({
        message: `Patient is already assigned to a Nurse ${patient.nurseID}`,
      });
      return;
    } else {
      await prisma.patient.update({
        where: { userID: patientID },
        data: {
          nurseID: nurse.userID,
        },
        include: { nurse: true },
      });
      res.status(200).json({ message: "Patient assigned successfully" });
      return;
    }
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

export { assignNurseToDep, assignPatientToNurse, assignHeadToDep };
