import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { depSchema } from "../../validation/schema.validation";

interface Body {
  name: string;
  nurses: number[] | null;
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
    const Check = await prisma.department.findUnique({
      where: { name: body.name },
    });
    if (!Check) {
      await prisma.department
        .create({
          data: body, //TODO: make assignment nurse work
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
    } else {
      res.status(400).json({
        msg: "Error",
        data: "Department already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const updateDepartment = async (req: Request, res: Response): Promise<void> => {
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
        where: { id: +req.params.id },
        data: {
          name: body.name,
          // nurse: { FIXME: This is not working as expected
          //   connect: body.nurses ? body.nurses.map((id) => ({ id })) : [],
          // },
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
  try {
    const id: number = +req.params.id;
    if (!(await prisma.department.findUnique({ where: { id } }))) {
      res.status(404).json({
        msg: `Department with id: ${id} Does not exist`,
      });
      return;
    } else {
      await prisma.department
        .delete({
          where: {
            id,
          },
        })
        .then((result) => {
          res.status(201).json({
            msg: `Successfully deleted department`,
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
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const getDepartment = async (req: Request, res: Response): Promise<void> => {
  const department = await prisma.department.findUnique({
    where: {
      id: +req.params.id,
    },
    include: {
      nurse: true,
    },
  });
  if (!department) {
    res.status(404).json({
      msg: `Department with id: ${req.params.id} Does not exist`,
    });
    return;
  } else {
    res.status(200).json(department);
  }
};

const getDepartments = async (req: Request, res: Response): Promise<void> => {
  const departments = await prisma.department.findMany({
    include: { nurse: true },
  });
  res.json(departments);
};

export {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
};
