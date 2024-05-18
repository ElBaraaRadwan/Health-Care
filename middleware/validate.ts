import {
  depSchema,
  userSchema,
  programValidation,
  allergiesValidation,
  signSchema,
} from "../validation/schema.validation";
import { Request, Response, NextFunction } from "express";

interface Allergies {
  [name: string]: {
    sideEffects: string[];
    severity: string;
  };
}

interface Program {
  name: string;
  potentialProblems: object;
  preventionAndTherapies: object;
  medications: object;
  diagnosticTestsAndMonitoring: object;
  duration: Date;
}

interface User {
  name: string;
  phone: string;
  email: string;
  nationalID: string;
  password: string;
  role: string;
  gender: string;
}

interface Department {
  name: string;
  headDeptID?: string;
  nurses?: string[];
}

interface Login {
  email: string;
  password: string;
}

const validateSignIn = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let body: Login = req.body;
  const { error } = signSchema.validate(body);
  if (error) {
    res.status(400).json({
      msg: error.details[0].message,
    });
    return;
  }
  return next();
};

const validateAllergy = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let body: Allergies = req.body;
  const { error } = allergiesValidation.validate(body);
  if (error) {
    res.status(400).json({
      msg: error.details[0].message,
    });
    return;
  }
  return next();
};

const validateDepartment = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let body: Department = req.body;
  const { error } = depSchema.validate(body);
  if (error) {
    res.status(400).json({
      msg: error.details[0].message,
    });
    return;
  }
  return next();
};

const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let body: User = req.body;
  const { error } = userSchema.validate(body);
  if (error) {
    res.status(400).json({
      msg: error.details[0].message,
    });
    return;
  }
  return next();
};

const validateProgram = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let body: Program = req.body;
  const { error } = programValidation.validate(body);
  if (error) {
    res.status(400).json({
      msg: error.details[0].message,
    });
    return;
  }
  return next();
};

export {
  validateAllergy,
  validateDepartment,
  validateProgram,
  validateUser,
  validateSignIn,
};
