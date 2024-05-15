import { Request, Response } from "express";
import { programValidation } from "../../validation/schema.validation";
import { Stringify } from "../../lib/Helper";
import handleError from "../../lib/handleError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

interface Program {
  name: string;
  potentialProblems: string;
  preventionAndTherapies: string;
  medications: Med[];
  diagnosticTestsAndMonitoring: string;
  duration: Date;
}

interface Med {
  name: string;
  dosage: string;
}

interface Allergies {
  name: string;
  sideEffects: string;
}

const assignProgramToPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const body: Program = await req.body;
    const patient = await prisma.user.findUnique({ where: { id } });
    if (patient?.role !== "patient") {
      res.status(400).json({
        msg: `User with id: ${id} Is not patient`,
      });
      return;
    }
    if (!patient) {
      res.status(400).json({
        msg: `nurse with id: ${id} Does not exist`,
      });
      return;
    }
    const { error } = programValidation.validate(body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
    await prisma.user
      .update({
        where: { id },
        data: {
          patientPrograms: {
            create: {
              name: body.name,
              potentialProblems: body.potentialProblems,
              preventionAndTherapies: body.preventionAndTherapies,
              diagnosticTestsAndMonitoring: body.diagnosticTestsAndMonitoring,
              duration: body.duration,
              medications: {
                create: {
                  name: body.medications[0].name,
                  dosage: body.medications[0].dosage,
                },
              },
            },
          },
        },
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

const setAllergy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const body: Allergies = await req.body;
    const nurse = await prisma.user.findUnique({ where: { id } });
    if (nurse?.role !== "nurse") {
      res.status(400).json({
        msg: `User with id: ${id} Is not nurse`,
      });
      return;
    }
    if (!nurse) {
      res.status(400).json({
        msg: `nurse with id: ${id} Does not exist`,
      });
      return;
    }
    await prisma.user
      .update({
        where: { id },
        data: {
          allergies: {
            create: {
              name: body.name,
              sideEffects: body.sideEffects,
            },
          },
        },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully set allergies",
          data: Stringify(result),
        });
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
  try {
    const { searchParams } = new URL(req.url);
    const id: string = searchParams.get("id") || "";
    const program: number = +(searchParams.get("program") ?? 0);

    const nurse = await prisma.user.findUnique({ where: { id } });
    if (nurse?.role !== "nurse") {
      res.status(400).json({
        msg: `User with id: ${id} Is not Nurse`,
      });
      return;
    }
    if (!nurse) {
      res.status(400).json({
        msg: `Nurse with id: ${id} Does not exist`,
      });
      return;
    }
    await prisma.user
      .update({
        where: { id },
        data: {
          nursePrograms: {
            connect: { id: program },
          },
        },
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

export { assignNurseToProgram, setAllergy, assignProgramToPatient };
