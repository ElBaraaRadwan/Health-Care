import prisma from "../../../lib/prisma";
import { Request, Response } from "express";
import handleError from "../../../lib/handleError";

const assignHeadToDep = async (req: Request, res: Response): Promise<void> => {
  try {
    const ids = req.params.ids.split("-");
    const headDeptID: number = +ids[0];
    const depID: number = +ids[1];
    // headDeptID - depID
    const headDept = await prisma.user.findUnique({
      where: { id: +headDeptID },
    });
    const dep = await prisma.department.findUnique({ where: { id: depID } });

    if (!dep) {
      res
        .status(404)
        .json({ message: `Department with ID:${depID} Doesn't Exists` });
      return;
    }
    if (!headDept) {
      res.status(404).json({
        message: `HeadDept with ID:${headDeptID} Doesn't Exists`,
      });
      return;
    }

    await prisma.headDept
      .create({
        data: {
          depID: depID,
          headDepID: headDeptID,
          department: { connect: { id: depID } },
          user: { connect: { id: headDeptID } },
        },
      })
      .then((result) => {
        res
          .status(200)
          .json({ message: "HeadDept assigned successfully", result });
      });
    return;
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const assignNurseToDep = async (req: Request, res: Response): Promise<void> => {
  try {
    const ids = req.params.ids.split("-");
    const nurseID: number = +ids[0];
    const depID: number = +ids[1];
    // nurseID - depID
    const nurse = await prisma.user.findUnique({
      where: { id: +nurseID },
    });
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

    // if (nurse.depID === +depID) {
    //   res.status(400).json({
    //     message: `Nurse is already assigned to a Department ${nurse.depID}`,
    //   });
    //   return;
    // } else {
    await prisma.nurse
      .create({
        data: {
          depID,
          nurseID,
          department: { connect: { id: nurseID } },
          user: { connect: { id: nurseID } },
        },
      })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Nurse assigned successfully", result });
      });
    return;
    // }
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
    const ids = req.params.ids.split("-");
    const patientID: number = +ids[0];
    const nurseID: number = +ids[1];
    // patientID - nurseID

    const nurse = await prisma.user.findUnique({
      where: { id: nurseID },
    });
    const patient = await prisma.user.findUnique({
      where: { id: patientID },
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

    // if (patient.nurseID === +nurseID) {
    //   res.status(400).json({
    //     message: `Patient is already assigned to a Nurse ${patient.nurseID}`,
    //   });
    //   return;
    // } else {
    await prisma.patient
      .create({
        data: {
          nurseID: nurseID,
          patientID: patientID,
          nurse: { connect: { nurseID } },
          user: { connect: { id: patientID } },
        },
      })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Patient assigned successfully", result });
      });
    return;
    // }
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

export { assignNurseToDep, assignPatientToNurse, assignHeadToDep };
