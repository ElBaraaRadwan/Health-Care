import { Request, Response } from "express";
import { Stringify } from "../../lib/Helper";
import handleError from "../../lib/handleError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

const assignProgramToPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { patientID, programID } = req.query;
  if (!patientID || !programID) {
    res.status(400).json({
      msg: "Missing nurseID or programID",
    });
    return;
  }
  const patientId: string = patientID.toString();
  const programId: number = +programID;
  try {
    const patient = await prisma.user.findUnique({ where: { id: patientId } });
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });
    if (patient?.role !== "patient") {
      res.status(400).json({
        msg: `User with id: ${patientId} Is not patient`,
      });
      return;
    }
    if (!patient) {
      res.status(400).json({
        msg: `Patient with id: ${patientId} Does not exist`,
      });
      return;
    }
    if (!program) {
      res.status(400).json({
        msg: `Program with id: ${programId} Does not exist`,
      });
      return;
    }
    await prisma.user
      .update({
        where: { id: patientId },
        data: {
          patientPrograms: {
            connect: { id: programId },
          },
        },
        include: { patientPrograms: true },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully assigned program to patient",
          data: Stringify(result),
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const updateProgram = async (req: Request, res: Response): Promise<void> => {
  const { programID } = req.query;
  if (!programID) {
    res.status(400).json({
      msg: "Missing programID",
    });
    return;
  }
  const programId: number = +programID;
  try {
    const body = await req.body;
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });
    if (!program) {
      res.status(400).json({
        msg: `Program with id: ${programId} Does not exist`,
      });
      return;
    }

    await prisma.program
      .update({
        where: { id: programId },
        data: {
          name: body.name,
          potentialProblems: body.potentialProblems,
          preventionAndTherapies: body.preventionAndTherapies,
          diagnosticTestsAndMonitoring: body.diagnosticTestsAndMonitoring,
          duration: new Date(body.duration).toISOString(),
          medications: body.medications,
        },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully updated program to patient",
          data: Stringify(result),
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const createProgram = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = await req.body;
    const check = await prisma.program.findFirst({
      where: { name: body.name },
    });
    if (check) {
      res.status(400).json({
        msg: `Program: [${body.name}] already exist`,
      });
      return;
    }
    await prisma.program
      .create({
        data: {
          name: body.name,
          potentialProblems: body.potentialProblems,
          preventionAndTherapies: body.preventionAndTherapies,
          diagnosticTestsAndMonitoring: body.diagnosticTestsAndMonitoring,
          duration: new Date(body.duration).toISOString(),
          medications: body.medications,
        },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully updated program to patient",
          data: Stringify(result),
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const deleteProgram = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;
    if (!(await prisma.program.findUnique({ where: { id } }))) {
      res.status(400).json({
        msg: `Program with id: ${id} Does not exist`,
      });
      return;
    }
    const deleteProgram = await prisma.program.delete({
      where: {
        id,
      },
    });
    res.status(201).json({
      msg: `Successfully deleted program`,
      deleteProgram,
    });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const assignNurseToProgram = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { nurseID, programID } = req.query;
  if (!nurseID || !programID) {
    res.status(400).json({
      msg: "Missing nurseID or programID",
    });
    return;
  }
  const nurseId: string = nurseID.toString();
  const programId: number = +programID;
  try {
    const nurse = await prisma.user.findUnique({ where: { id: nurseId } });
    const program = await prisma.program.findUnique({
      where: { id: programId },
    });
    if (nurse?.role !== "nurse") {
      res.status(400).json({
        msg: `User with id: ${nurseId} Is not Nurse`,
      });
      return;
    }
    if (!program) {
      res.status(400).json({
        msg: `Program with id: ${programId} Does not exist`,
      });
      return;
    }
    if (!nurse) {
      res.status(400).json({
        msg: `Nurse with id: ${nurseId} Does not exist`,
      });
      return;
    }
    await prisma.user
      .update({
        where: { id: nurseId },
        data: {
          nursePrograms: {
            connect: { id: programId },
          },
        },
        include: { nursePrograms: true },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully assigned program to nurse",
          data: Stringify(result),
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const getProgram = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;
    const program = await prisma.program.findUnique({ where: { id } });
    if (!program) {
      res.status(400).json({
        msg: `Program with id: ${id} Does not exist`,
      });
      return;
    }
    res.status(201).json({
      data: Stringify(program),
    });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const getPrograms = async (req: Request, res: Response): Promise<void> => {
  try {
    const programs = await prisma.program.findMany();
    res.status(201).json({
      data: Stringify(programs),
    });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

export {
  assignNurseToProgram,
  assignProgramToPatient,
  updateProgram,
  createProgram,
  deleteProgram,
  getProgram,
  getPrograms,
};
