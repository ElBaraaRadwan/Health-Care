import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import {} from "../../validation/schema.validation";

const createNurse = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.nurse
      .create({
        data: req.body,
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
  } catch (error) {
    res.status(500).json({
      msg: "Error",
      data: error,
    });
  }
};

const updateNurse = async (req: Request, res: Response): Promise<void> => {
  const updatedNurse = await prisma.nurse.update({
    where: {
      id: req.body.id,
    },
    data: req.body,
  });
  res.json(updatedNurse);
};

const deleteNurse = async (req: Request, res: Response): Promise<void> => {
  const deletedNurse = await prisma.nurse.delete({
    where: {
      id: req.body.id,
    },
  });
  res.json(deletedNurse);
};

const getNurse = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(404).json({
        msg: "Error",
        data: "No id provided",
      });
    } else {
      await prisma.nurse
        .findUnique({
          where: {
            id: +id,
          },
          include: {
            paitents: true,
            department: true,
          },
        })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(400).json({
            msg: "Error",
            data: err,
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

const getNurses = async (req: Request, res: Response): Promise<void> => {
  const nurses = await prisma.nurse.findMany({
    include: { paitents: true, department: true },
  });
  res.json(nurses);
};

export { createNurse, updateNurse, deleteNurse, getNurse, getNurses };
