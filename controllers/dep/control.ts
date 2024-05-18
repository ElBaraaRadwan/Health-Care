import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Department, validateDepartment } from "../../middleware/validate";
import { Stringify, addId } from "../../lib/Helper";
import handleError from "../../lib/handleError";

const prisma = new PrismaClient({ errorFormat: "pretty" });

const createDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: Department = await req.body;
    if (await prisma.department.findUnique({ where: { name: body.name } })) {
      res.status(400).json({
        msg: "Department already exists",
      });
      return;
    }
    validateDepartment(req, res, body);
    await prisma.department
      .create({
        data: {
          name: body.name,
          headDept: { connect: { id: body.headDeptID } },
          nurses: { connect: addId(body.nurses || []) },
        },
        include: { nurses: true, headDept: true },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully created department",
          result: Stringify(result),
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
    const body: Department = await req.body;
    const department = await prisma.department.findUnique({
      where: { id },
      include: { nurses: true, headDept: true },
    });
    if (!department) {
      res.status(400).json({
        msg: `Department with id: ${id} Does not exist`,
      });
      return;
    }
    validateDepartment(req, res, body);

    await prisma.department
      .update({
        where: { id: +req.params.id },
        data: {
          ...body,
          nurses: { connect: addId(body.nurses || []) },
        },
        include: { nurses: true, headDept: { where: { id: body.headDeptID } } },
      })
      .then((updatedData) => {
        res.status(201).json({
          msg: "Successfully updated department",
          result: Stringify(updatedData),
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const disconnectFromDep = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { depID, nurseID, headID } = req.query;
  if (depID === undefined) {
    res.status(400).json({
      msg: "Missing depID",
    });
    return;
  } else if (!nurseID && !headID) {
    res.status(400).json({
      msg: "Missing nurseID or headID",
    });
    return;
  }
  const dep: number = +depID;
  const headId: string = headID?.toString() ?? "";
  const nurseId: string = nurseID?.toString() ?? "";
  try {
    // const id: number = +req.params.id;
    const department = await prisma.department.findUnique({
      where: { id: dep },
      include: { nurses: true, headDept: true },
    });
    if (!department) {
      res.status(400).json({
        msg: `Department with id: ${dep} Does not exist`,
      });
      return;
    }
    await prisma.department
      .update({
        where: { id: dep },
        data: {
          headDept: { disconnect: { id: headId } },
          nurses: { disconnect: { id: nurseId } },
        },
        include: { nurses: true, headDept: true },
      })
      .then((updatedData) => {
        res.status(201).json({
          msg: "Successfully disconnected from department",
          result: Stringify(updatedData),
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
      include: { nurses: true, headDept: true },
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
          nurses: true,
          headDept: true,
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
    include: { nurses: true, headDept: true },
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
  disconnectFromDep,
};
