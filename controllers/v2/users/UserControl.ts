import prisma from "../../../lib/prisma";
import { Request, Response } from "express";
import { userSchema } from "../../../validation/schema.validation";
import { Stringify, addId } from "../../../lib/Helper";
import handleError from "../../../lib/handleError";
import { hashPassword } from "../../../lib/passwordHash";

type Body = {
  // every user must have
  name: string;
  phone: number;
  email: string;
  nationalID: number;
  password: string;
  role: "Patient" | "Nurse" | "headDept";
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: Body = await req.body;
    if (
      !(await prisma.user.findUnique({
        where: { nationalID: body.nationalID },
      }))
    ) {
      const { error } = userSchema.validate(body);
      if (error) {
        res.status(400).json({
          msg: "Error",
          data: error.details[0].message,
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
            role: body.role,
          },
        })
        .then((result) => {
          res.status(201).json({
            msg: "Successfully created user",
            result,
          });
        });
    } else {
      res.status(400).json({
        msg: `user with ID:${req.body.nationalID} already exists`,
      });
      return;
    }
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body: Body = await req.body;
    if (
      !(await prisma.user.findUnique({
        where: { nationalID: body.nationalID },
      }))
    ) {
      res.status(404).json({
        msg: `user with nationalID: ${body.nationalID} Does not exist`,
      });
      return;
    }
    const { error } = userSchema.validate(body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
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
          role: body.role,
        },
      })
      .then((data) => {
        res.status(201).json({
          msg: "Successfully Updated",
          data,
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
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
      .delete({
        where: {
          id: +req.params.id,
        },
      })
      .then((result) => {
        res.status(202).json({
          msg: "Successfully deleted user",
          result,
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
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
        include: {
          nurse: true,
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
  const users = await prisma.user.findMany({ include: { nurse: true } });
  if (!users) {
    res.json({ msg: "No users Found" });
    return;
  } else {
    res.status(200).json(Stringify(users));
  }
};

export { createUser, updateUser, deleteUser, getUser, getUsers };
