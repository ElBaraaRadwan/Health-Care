import Joi from "joi";

const nurseSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().max(12).min(12),
  nationalID: Joi.number().max(14).min(14),
  depID: Joi.number(),
  patients: Joi.array().allow(null),
  isActive: Joi.boolean().allow(null),
});
const patientSchema = Joi.object({
  name: Joi.string().max(100),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().max(12).min(12),
  nationalID: Joi.number().max(14).min(14),
  nurse: Joi.number().allow(null),
});
const depSchema = Joi.object({
  name: Joi.string().max(52).required(),
  nurses: Joi.array().unique().allow(null),
});

export { depSchema, nurseSchema, patientSchema };
