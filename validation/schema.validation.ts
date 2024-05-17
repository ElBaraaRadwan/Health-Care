import Joi from "joi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

import {
  DiagnosticTestsAndMonitoring,
  PreventionAndTherapies,
  PotentialProblems,
  Medications,
  Allergies,
} from "../util/JSON";

const programValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "program name is required.",
    "string.empty": "program name cannot be empty.",
    "string.min": "program name should be at least 3 characters long.",
    "string.max": "program name should not exceed 30 characters.",
  }),
  potentialProblems: Joi.object().pattern(
    Joi.string()
      .uppercase()
      .valid(...PotentialProblems),
    Joi.boolean()
  ),
  preventionAndTherapies: Joi.object().pattern(
    Joi.string()
      .uppercase()
      .valid(...PreventionAndTherapies),
    Joi.boolean()
  ),
  diagnosticTestsAndMonitoring: Joi.object().pattern(
    Joi.string()
      .uppercase()
      .valid(...DiagnosticTestsAndMonitoring),
    Joi.string().uppercase().valid("NORMAL", "ABNORMAL", "INCONCLUSIVE")
  ),
  medications: Joi.object()
    .pattern(
      Joi.string()
        .uppercase()
        .valid(...Medications),
      Joi.string()
    )
    .max(10)
    .allow(null),
  duration: Joi.date(),
});

const allergiesValidation = Joi.object()
  .pattern(
    Joi.string()
      .uppercase()
      .valid(...Allergies),
    Joi.object({
      sideEffects: Joi.array().items(Joi.string().max(50)).unique(),
      severity: Joi.string().valid("MILD", "MODERATE", "SEVERE"),
    })
  )
  .allow(null);

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "user name is required.",
    "string.empty": "user name cannot be empty.",
    "string.min": "user name should be at least 3 characters long.",
    "string.max": "user name should not exceed 30 characters.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .min(10)
    .max(10)
    .required()
    .messages({
      "number.min": "Mobile number should be 10 digit.",
      "number.max": "Mobile number should be 10 digit",
    }),
  nationalID: Joi.string()
    .pattern(/^[0-9]+$/, "numbers")
    .min(14)
    .max(14)
    .required()
    .messages({
      "number.min": "National ID should be 14 digit.",
      "number.max": "National ID should be 14 digit",
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,12}$"))
    .required()
    .messages({
      "string.pattern.base": `Password should be between 8 to 12 characters and contain letters or numbers only`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
  role: Joi.string()
    .valid("PATIENT", "NURSE", "HEADDEPT")
    .uppercase()
    .required(),
  gender: Joi.string().valid("MALE", "FEMALE").uppercase().required(),
});

const depSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "department name is required.",
    "string.empty": "department name cannot be empty.",
    "string.min": "department name should be at least 3 characters long.",
    "string.max": "department name should not exceed 30 characters.",
  }),
  headDeptID: Joi.string().allow(null),
  nurses: Joi.array().items(Joi.string()).max(10).allow(null).messages({
    "number.max": "Department Shouldn't Take More than 10 Nurses.",
  }),
});

export { depSchema, userSchema, programValidation, allergiesValidation };
