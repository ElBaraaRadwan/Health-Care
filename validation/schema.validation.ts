import Joi from "joi";

const nurseSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "name is required.",
    "string.empty": "name cannot be empty.",
    "string.min": "name should be at least 3 characters long.",
    "string.max": "name should not exceed 30 characters.",
    "string.alphanum": "name should only contain alphanumeric characters.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required()
    .messages({
      "number.min": "Mobile number should be 10 digit.",
      "number.max": "Mobile number should be 10 digit",
    }),
  nationalID: Joi.number()
    .integer()
    .min(10 ** 13)
    .max(10 ** 14 - 1)
    .required()
    .messages({
      "number.min": "National ID should be 14 digit.",
      "number.max": "National ID should be 14 digit",
    }),
  depID: Joi.number().allow(null),
  patients: Joi.array().items(Joi.number()).max(5).allow(null).messages({
    "number.max": "Nurse Can't Take More than 5 Patients.",
  }),
  isActive: Joi.boolean().allow(null).default(false),
});

const patientSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "name is required.",
    "string.empty": "name cannot be empty.",
    "string.min": "name should be at least 3 characters long.",
    "string.max": "name should not exceed 30 characters.",
    "string.alphanum": "name should only contain alphanumeric characters.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required()
    .messages({
      "number.min": "Mobile number should be 10 digit.",
      "number.max": "Mobile number should be 10 digit",
    }),
  nationalID: Joi.number()
    .integer()
    .min(10 ** 13)
    .max(10 ** 14 - 1)
    .required()
    .messages({
      "number.min": "National ID should be 14 digit.",
      "number.max": "National ID should be 14 digit",
    }),
  nurse: Joi.number().allow(null),
});

const depSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "name is required.",
    "string.empty": "name cannot be empty.",
    "string.min": "name should be at least 3 characters long.",
    "string.max": "name should not exceed 30 characters.",
    "string.alphanum": "name should only contain alphanumeric characters.",
  }),
  nurses: Joi.array().items(Joi.number()).max(10).allow(null).messages({
    "number.max": "Department Shouldn't Take More than 10 Nurses.",
  }),
});

export { depSchema, nurseSchema, patientSchema };
