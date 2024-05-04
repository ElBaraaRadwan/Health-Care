import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { depSchema } from "../../validation/schema.validation";

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
    await prisma.department
      .create({
        data: req.body,
      })
      .then((result) => {
        res.status(201).json({
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
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const updateDepartment = async (req: Request, res: Response): Promise<void> => {
  interface Body {
    name: string;
    nurses: number[];
  }
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
    await prisma.department
      .update({
        where: { id: parseInt(req.params.id) },
        data: {
          name: body.name,
          nurse: {
            connect: body.nurses.map((id) => ({ id })),
          },
        },
      })
      .then((result) => {
        res.status(201).json({
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
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const deleteDepartment = async (req: Request, res: Response): Promise<void> => {
  const deleteDepartment = await prisma.department.delete({
    where: {
      id: req.body.id,
    },
  });
  res.json(deleteDepartment);
};

const getDepartment = async (req: Request, res: Response): Promise<void> => {
  const department = await prisma.department.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json(department);
};

const getDepartments = async (req: Request, res: Response): Promise<void> => {
  const departments = await prisma.department.findMany();
  res.json(departments);
};

export {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
};
