import prisma from "../../lib/prisma";
import { Request, Response } from "express";
import {} from "../../validation/schema.validation";

const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.patient
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

const updatePatient = async (req: Request, res: Response): Promise<void> => {
  const updatedPatient = await prisma.patient.update({
    where: {
      id: req.body.id,
    },
    data: req.body,
  });
  res.json(updatedPatient);
};

const deletePatient = async (req: Request, res: Response): Promise<void> => {
  const deletedPatient = await prisma.patient.delete({
    where: {
      id: req.body.id,
    },
  });
  res.json(deletedPatient);
};

const getPatient = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    if (!id) {
      res.status(404).json({
        msg: "Error",
        data: "No id provided",
      });
    } else {
      await prisma.patient
        .findUnique({
          where: {
            id: +id,
          },
          include: {
            nurse: true,
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

const getPatients = async (req: Request, res: Response): Promise<void> => {
  const patients = await prisma.patient.findMany({ include: { nurse: true } });
  res.json(patients);
};

export { createPatient, updatePatient, deletePatient, getPatient, getPatients };
