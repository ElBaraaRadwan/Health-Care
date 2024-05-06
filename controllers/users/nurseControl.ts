import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { nurseSchema } from "../../validation/schema.validation";

interface Body {
  name?: string;
  phone?: number;
  email?: string;
  nationalID: number;
  depID?: number;
  patients?: number[] | null;
}

const createNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = nurseSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
    const body: Body = await req.body;
    const Check = await prisma.nurse.findUnique({
      where: { nationalID: body.nationalID },
    });
    if (!Check) {
      await prisma.nurse
        .create({
          data: {
            name: body.name,
            phone: body.phone,
            email: body.email,
            nationalID: body.nationalID,
            depID: body.depID,
            patients: {
              connect: body.patients ? body.patients.map((id) => ({ id })) : [],
            },
          },
        })
        .then((result) => {
          res.status(200).json({
            msg: "Success",
            data: result,
          });
        })
        .catch((error) => {
          res.status(400).json({
            msg: "Error",
            data: error,
          });
        });
    } else {
      res.status(400).json({
        msg: "Error",
        data: `Nurse with ID:${body.nationalID} already exists`,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const updateNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = nurseSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
    const body: Body = await req.body;
    const test = await prisma.nurse
      .update({
        where: { id: +req.params.id },
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          nationalID: body.nationalID,
          depID: body.depID,
          patients: {
            connect: body.patients ? body.patients.map((id) => ({ id })) : [],
          },
        },
      })
      .then(() => {
        res.status(201).json({
          msg: "Successfully Updated Nurse",
          data: test,
        });
      })
      .catch((error) => {
        res.status(400).json({
          msg: "Error",
          data: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const deleteNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;
    if (!(await prisma.nurse.findUnique({ where: { id } }))) {
      res.status(404).json({
        msg: `Nurse with id: ${id} Does not exist`,
      });
      return;
    } else {
      await prisma.nurse
        .delete({
          where: {
            id,
          },
        })
        .then((result) => {
          res.status(201).json({
            msg: `Successfully deleted nurse`,
            result,
          });
        })
        .catch((error) => {
          res.status(400).json({
            msg: "Error",
            data: error,
          });
        });
    }
  } catch (error) {}
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
          const updatedData = JSON.stringify(
            result,
            (key, value) =>
              typeof value === "bigint" ? value.toString() : value // return everything else unchanged
          );
          res.status(200).json(JSON.parse(updatedData));
        }
      })
      .catch((err) => {
        res.status(400).json({
          msg: "Error",
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const getNurses = async (req: Request, res: Response): Promise<void> => {
  const nurses = await prisma.nurse.findMany({
    include: { patients: true, department: true },
  });
  if (!nurses) {
    res.status(404).json({
      msg: "Error",
      data: "No nurses found",
    });
    return;
  } else {
    const updatedData = JSON.stringify(
      nurses,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
    res.status(200).json(JSON.parse(updatedData));
  }
};

export { createNurse, updateNurse, deleteNurse, getNurse, getNurses };
