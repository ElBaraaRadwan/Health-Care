import { Request, Response } from "express";
import { Stringify } from "../../lib/Helper";
import handleError from "../../lib/handleError";
import { hashPassword } from "../../lib/passwordHash";
import { $Enums, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = await req.body;
    const checkIfExists = await prisma.user.findUnique({
      where: { nationalID: body.nationalID },
    });
    if (checkIfExists) {
      res.status(400).json({
        msg: `user with NationalID:${body.nationalID} already exists`,
      });
      return;
    }
    const hashedPassword = await hashPassword(body.password);
    await prisma.user
      .create({
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          nationalID: body.nationalID,
          passwordHash: hashedPassword,
          role: body.role.toLowerCase() as $Enums.Role,
          gender: body.gender.toUpperCase() as $Enums.Gender,
        },
      })
      .then((result) => {
        const data = Stringify(result);
        res.status(201).json({ msg: "Successfully created user", data });
        return;
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = await req.body;

    const checkIfExists = await prisma.user.findUnique({
      where: { nationalID: body.nationalID },
    });
    if (checkIfExists) {
      res.status(404).json({
        msg: `user with nationalID: ${body.nationalID} Does not exist`,
      });
      return;
    }
    await prisma.user
      .update({
        where: {
          id: req.params.id,
        },
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          nationalID: body.nationalID,
          role: body.role.toUpperCase() as $Enums.Role,
          gender: body.gender.toUpperCase() as $Enums.Gender,
        },
      })
      .then((result) => {
        const data = Stringify(result);
        res.status(201).json({
          msg: "Successfully Updated",
          data,
        });
        return;
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!(await prisma.user.findUnique({ where: { id: req.params.id } }))) {
      res.status(404).json({
        msg: `user with id: ${req.params.id} Does not exist`,
      });
      return;
    }
    await prisma.user
      .delete({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        const data = Stringify(result);
        res.status(202).json({
          msg: "Successfully deleted user",
          data,
        });
      });
  } catch (error) {
    res.status(500).json({ msg: "Error", data: error });
  }
};

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const test = await prisma.user.findUnique({ where: { id: req.params.id } });
    if (!test) {
      res.status(404).json({
        msg: `user with id: ${req.params.id} Does not exist`,
      });
      return;
    }
    await prisma.user
      .findUnique({
        where: {
          id: req.params.id,
        },
      })
      .then((result) => {
        res.status(200).json(Stringify(result));
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany();
  if (!users) {
    res.json({ msg: "No users Found" });
    return;
  } else {
    res.status(200).json(Stringify(users));
  }
};

const getUsersByRole = async (req: Request, res: Response): Promise<void> => {
  const role = req.params.role.toLowerCase() as $Enums.Role;
  if (!role) {
    res.status(400).json(`${role} is Invalid role`);
    return;
  }
  switch (role) {
    case "patient":
      await prisma.user
        .findMany({
          where: { role },
          include: { patientPrograms: true },
        })
        .then((result) => {
          if (!result) {
            res.status(404).json({ msg: "No users Found" });
            return;
          } else {
            res.status(200).json(Stringify(result));
          }
          return;
        });
      break;
    case "nurse":
      await prisma.user
        .findMany({
          where: { role },
          include: { nursePrograms: true, nurseDepartments: true },
        })
        .then((result) => {
          if (!result) {
            res.status(404).json({ msg: "No users Found" });
            return;
          } else {
            res.status(200).json(Stringify(result));
          }
          return;
        });
      break;

    case "headdept":
      await prisma.user
        .findMany({
          where: { role },
          include: { headDeptDepartment: true },
        })
        .then((result) => {
          if (!result) {
            res.status(404).json({ msg: "No users Found" });
            return;
          } else {
            res.status(200).json(Stringify(result));
          }
          return;
        });
      break;
  }
};

export {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUsersByRole,
};
