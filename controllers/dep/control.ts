import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { depSchema } from "../../validation/schema.validation";
import { Stringify, addId } from "../../lib/Helper";
import handleError from "../../lib/handleError";

interface Body {
  name: string;
  nurse?: number[];
}

const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = depSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
    const body: Body = await req.body;
    if (!(await prisma.department.findUnique({ where: { name: body.name } }))) {
      res.status(400).json({
        msg: "Department already exists",
      });
      return;
    }
    await prisma.department
      .create({
        data: { name: body.name, nurse: { connect: addId(body.nurse || []) } },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully created department",
          result,
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const updateDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;
    if (!(await prisma.department.findUnique({ where: { id } }))) {
      res.status(400).json({
        msg: `Department with id: ${id} Does not exist`,
      });
      return;
    }
    const { error } = depSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
    const body: Body = await req.body;
    await prisma.department
      .update({
        where: { id: +req.params.id },
        data: { name: body.name, nurse: { connect: addId(body.nurse || []) } },
      })
      .then((updatedData) => {
        res.status(201).json({
          msg: "Successfully updated department",
          updatedData,
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = +req.params.id;
    if (!(await prisma.department.findUnique({ where: { id } }))) {
      res.status(400).json({
        msg: `Department with id: ${id} Does not exist`,
      });
      return;
    }
    const deleteDepartment = await prisma.department.delete({
      where: {
        id,
      },
    });
    res.status(201).json({
      msg: `Successfully deleted department`,
      deleteDepartment,
    });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const getDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.department
      .findUnique({
        where: {
          id: +req.params.id,
        },
        include: {
          nurse: true,
        },
      })
      .then((result) => {
        if (!result) {
          res.status(404).json({
            msg: `Department with id: ${req.params.id} Does not exist`,
          });
          return;
        }
        res.status(200).json(Stringify(result));
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const getDepartments = async (req: Request, res: Response): Promise<void> => {
  const departments = await prisma.department.findMany({
    include: { nurse: true },
  });
  if (!departments) {
    res.json({ msg: "No Departments found" });
    return;
  } else {
    res.status(200).json(Stringify(departments));
  }
};

export {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
};
