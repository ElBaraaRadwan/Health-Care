import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import { depSchema } from "../../validation/schema.validation";

interface Body {
  name: string;
  nurse: number[] | null;
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
    const CheckDep = await prisma.department.findUnique({
      where: { name: body.name },
    });
    if (!CheckDep) {
      await prisma.department
        .create({
          data: {
            name: body.name,
            nurse: {
              connect: body.nurse ? body.nurse.map((id) => ({ id })) : [],
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
    try {
      const body: Body = await req.body;
      const updatedData = await prisma.department.update({
        where: { id: +req.params.id },
        data: {
          name: body.name,
          nurse: {
            connect: body.nurse
              ? body.nurse.map((id) => ({ id: Number(id) }))
              : [],
          },
        },
      });
      res.status(201).json({
        msg: "Successfully updated department",
        data: updatedData,
      });
    } catch (error) {
      res.status(400).json({
        msg: "Error",
        data: error,
      });
    }
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

const getDepartments = async (req: Request, res: Response): Promise<void> => {
  const departments = await prisma.department.findMany({
    include: { nurse: true },
  });
  if (!departments) {
    res.status(404).json({
      msg: "Error",
      data: "No Departments found",
    });
    return;
  } else {
    const updatedData = JSON.stringify(
      departments,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    );
    res.status(200).json(JSON.parse(updatedData));
  }
};

export {
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
};
