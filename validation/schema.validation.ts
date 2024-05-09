import Joi from "joi";

const nurseSchema = Joi.object({
  depID: Joi.number().allow(null),
  patients: Joi.array().items(Joi.number()).max(5).allow(null).messages({
    "number.max": "Nurse Can't Take More than 5 Patients.",
  }),
  isActive: Joi.boolean().allow(null).default(false),
});

const patientSchema = Joi.object({
  nurseID: Joi.number().allow(null),
});

const Head_DepartmentSchema = Joi.object({
  depID: Joi.number().allow(null),
});

const userSchema = Joi.object({
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
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,12}$"))
    .required()
    .messages({
      "string.pattern.base": `Password should be between 8 to 12 characters and contain letters or numbers only`,
      "string.empty": `Password cannot be empty`,
      "any.required": `Password is required`,
    }),
  role: Joi.string()
    .valid("Patient", "Nurse", "headDept")
    .uppercase()
    .required(),
  // data: Joi.when("role", {         //TODO: see if using when method is passible
  //   is: "PATIENT",
  //   then: patientSchema.required(),
  //   otherwise: patientSchema,
  // })
  //   .when("role", {
  //     is: "NURSE",
  //     then: nurseSchema.required(),
  //     otherwise: nurseSchema,
  //   })
  //   .when("role", {
  //     is: "HEADDEPT",
  //     then: Head_DepartmentSchema.required(),
  //     otherwise: Head_DepartmentSchema,
  //   }),
});

const depSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "name is required.",
    "string.empty": "name cannot be empty.",
    "string.min": "name should be at least 3 characters long.",
    "string.max": "name should not exceed 30 characters.",
    "string.alphanum": "name should only contain alphanumeric characters.",
  }),
  headDeptID: Joi.number().allow(null),
  nurses: Joi.array().items(Joi.number()).max(10).allow(null).messages({
    "number.max": "Department Shouldn't Take More than 10 Nurses.",
  }),
});

export { depSchema, userSchema };
