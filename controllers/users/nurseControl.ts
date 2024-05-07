import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { nurseSchema } from "../../validation/schema.validation";
import { Stringify, addId } from "../../lib/Helper";
import handleError from "../../lib/handleError";

interface Body {
  name: string;
  phone?: number;
  email?: string;
  nationalID: number;
  depID?: number;
  patients?: number[];
}

const createNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: Body = await req.body;
    if (
      !(await prisma.nurse.findUnique({
        where: { nationalID: body.nationalID },
      }))
    ) {
      res.status(400).json({
        msg: "Error",
        data: `Nurse with ID:${body.nationalID} already exists`,
      });
      return;
    }
    const { error } = nurseSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }

    await prisma.nurse
      .create({
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          nationalID: body.nationalID,
          department: {
            connect: {
              id: body.depID,
            },
          },
          patients: { connect: addId(body.patients || []) },
        },
        include: { patients: true, department: true },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully created patient",
          data: result,
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const updateNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!(await prisma.nurse.findUnique({ where: { id: +req.params.id } }))) {
      res.status(404).json({
        msg: `Nurse with id: ${req.params.id} Does not exist`,
      });
      return;
    }
    const { error } = nurseSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
    const body: Body = await req.body;
    await prisma.nurse
      .update({
        where: { id: +req.params.id },
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          nationalID: body.nationalID,
          department: {
            connect: {
              id: body.depID,
            },
          },
          patients: {
            connect: addId(body.patients || []),
          },
        },
        include: { patients: true, department: true },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully Updated Nurse",
          data: result,
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const deleteNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!(await prisma.nurse.findUnique({ where: { id: +req.params.id } }))) {
      res.status(404).json({
        msg: `Nurse with id: ${req.params.id} Does not exist`,
      });
      return;
    }
    await prisma.nurse
      .delete({
        where: {
          id: +req.params.id,
        },
      })
      .then((result) => {
        res.status(202).json({
          msg: `Successfully deleted nurse`,
          result,
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const getNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.nurse
      .findUnique({
        where: {
          id: +req.params.id,
        },
        include: {
          patients: true,
          department: true,
        },
      })
      .then((result) => {
        if (!result) {
          res.status(404).json({
            msg: `Nurse with id: ${req.params.id} Does not exist`,
          });
          return;
        } else {
          res.status(200).json(Stringify(result));
        }
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const getNurses = async (req: Request, res: Response): Promise<void> => {
  const nurses = await prisma.nurse.findMany({
    include: { patients: true, department: true },
  });
  if (!nurses) {
    res.json({ msg: "No nurses found" });
    return;
  } else {
    res.status(200).json(Stringify(nurses));
  }
};

export { createNurse, updateNurse, deleteNurse, getNurse, getNurses };
