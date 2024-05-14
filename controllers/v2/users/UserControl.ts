import prisma from "../../../lib/prisma";
import { Request, Response } from "express";
import { userSchema } from "../../../validation/schema.validation";
import { Stringify } from "../../../lib/Helper";
import handleError from "../../../lib/handleError";
import { hashPassword } from "../../../lib/passwordHash";
import { $Enums } from "@prisma/client";

interface Body {
  name: string;
  phone: number;
  email: string;
  nationalID: number;
  password: string;
  type: string;
}

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: Body = await req.body;
    const checkIfExists = await prisma.user.findUnique({
      where: { nationalID: body.nationalID },
    });
    if (checkIfExists) {
      res.status(400).json({
        msg: `user with ID:${body.nationalID} already exists`,
      });
      return;
    }
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
    const hashedPassword = await hashPassword(body.password);
    const type = body.type.toUpperCase() as $Enums.UserRole;
    await prisma.user
      .create({
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          nationalID: body.nationalID,
          passwordHash: hashedPassword,
          type,
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
    const body: Body = await req.body;
    const { error } = userSchema.validate(body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }
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
          id: +req.params.id,
        },
        data: {
          name: body.name,
          phone: body.phone,
          email: body.email,
          nationalID: body.nationalID,
          type: body.type.toUpperCase() as $Enums.UserRole,
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
    if (!(await prisma.user.findUnique({ where: { id: +req.params.id } }))) {
      res.status(404).json({
        msg: `user with id: ${+req.params.id} Does not exist`,
      });
      return;
    }
    await prisma.user
      .delete({
        where: {
          id: +req.params.id,
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
    const id: number = +req.params.id;
    const test = await prisma.user.findUnique({ where: { id } });
    if (!test) {
      res.status(404).json({
        msg: `user with id: ${id} Does not exist`,
      });
      return;
    }
    await prisma.user
      .findUnique({
        where: {
          id: +req.params.id,
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
  const type = req.params.type.toUpperCase() as $Enums.UserRole;
  if (!type) {
    res.status(400).json(`${type} is Invalid role`);
    return;
  }
  switch (type) {
    case "PATIENT":
      await prisma.user
        .findMany({
          where: { type },
          include: { patientRelations: true },
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
    case "NURSE":
      await prisma.user
        .findMany({
          where: { type },
          include: { nurseRelations: true },
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

    case "HEADDEPT":
      await prisma.user
        .findMany({
          where: { type },
          include: { headDeptRelations: true },
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
