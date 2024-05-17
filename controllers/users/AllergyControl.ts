import { Request, Response } from "express";
import { allergiesValidation } from "../../validation/schema.validation";
import { Stringify, delValue } from "../../lib/Helper";
import handleError from "../../lib/handleError";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

interface Allergies {
  [name: string]: {
    sideEffects: string[];
    severity: string;
  };
}

const setAllergy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const body: Allergies = await req.body;
    const patient = await prisma.user.findUnique({ where: { id } });
    if (patient?.role !== "patient") {
      res.status(400).json({
        msg: `User with id: ${id} Is not patient`,
      });
      return;
    }
    if (!patient) {
      res.status(400).json({
        msg: `Patient with id: ${id} Does not exist`,
      });
      return;
    }
    const { error } = allergiesValidation.validate(body);
    if (error) {
      res.status(400).json({
        msg: "Error",
        data: error.details[0].message,
      });
      return;
    }

    for (let key in body) {
      if (patient.allergies && patient.allergies.hasOwnProperty(key)) {
        res.status(400).json({
          msg: `User:${id} Already has This Allergy`,
        });
        return;
      }
    }
    let updatedAllergies = Object.assign({}, patient.allergies, body);

    await prisma.user
      .update({
        where: { id },
        data: {
          allergies: updatedAllergies,
        },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully set allergies",
          data: Stringify(result),
        });
      });
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

const delAllergy = async (req: Request, res: Response): Promise<void> => {
  // const ids = req.params.ids.split("&");
  // const id: string = ids[0];
  // const allergy: string = ids[1];
  const { allergy, userID } = req.query;
  if (!allergy || !userID) {
    res.status(400).json({
      msg: "Missing allergy or userID",
    });
    return;
  }
  const Allergy: string = allergy.toString();
  const userId: string = userID.toString();
  try {
    const patient = await prisma.user.findUnique({ where: { id: userId } });
    if (patient?.role !== "patient") {
      res.status(400).json({
        msg: `User with id: ${userId} Is not patient`,
      });
      return;
    }
    if (!patient) {
      res.status(400).json({
        msg: `Patient with id: ${userId} Does not exist`,
      });
      return;
    }

    let updatedAllergies = patient.allergies;
    delValue(updatedAllergies, Allergy);

    await prisma.user
      .update({
        where: { id: userId },
        data: {
          allergies: updatedAllergies || Prisma.JsonNull,
        },
      })
      .then((result) => {
        res.status(201).json({
          msg: "Successfully deleted allergy",
          data: Stringify(result),
        });
      });

    return;
  } catch (error) {
    const err: Error = error as Error;
    handleError(err, res);
  }
};

export { setAllergy, delAllergy };
