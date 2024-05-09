// import prisma from "../../../lib/prisma";
// import { Request, Response } from "express";
// import { patientSchema } from "../../../validation/schema.validation";
// import { Stringify } from "../../../lib/Helper";
// import handleError from "../../../lib/handleError";

// interface Body {
//   nurseID: number;
//   nationalID: number;
//   email?: string;
//   phone?: number;
//   name: string;
// }

// const createPatient = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const body: Body = await req.body;
//     const Check = await prisma.patient.findUnique({
//       where: { nationalID: body.nationalID },
//     });
//     if (!Check) {
//       const { error } = patientSchema.validate(req.body);
//       if (error) {
//         res.status(400).json({
//           msg: "Error",
//           data: error.details[0].message,
//         });
//         return;
//       }
//       res.status(400).json({
//         msg: `Patient with ID:${body.nationalID} already exists`,
//       });
//       return;
//     }
//     await prisma.patient
//       .create({
//         data: body,
//       })
//       .then((result) => {
//         res.status(201).json({
//           msg: "Successfully created patient",
//           data: result,
//         });
//       });
//   } catch (error) {
//     const err: Error = error as Error;
//     handleError(err, res);
//   }
// };

// const updatePatient = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const body: Body = await req.body;
//     if (
//       !(await prisma.patient.findUnique({
//         where: { nationalID: body.nationalID },
//       }))
//     ) {
//       const { error } = patientSchema.validate(req.body);
//       if (error) {
//         res.status(400).json({
//           msg: "Error",
//           data: error.details[0].message,
//         });
//         return;
//       }
//       await prisma.patient
//         .update({
//           where: {
//             id: +req.params.id,
//           },
//           data: req.body,
//         })
//         .then((data) => {
//           res.status(201).json({
//             msg: "Successfully Updated",
//             data: data,
//           });
//         });
//     } else {
//       res.status(400).json({
//         msg: "Error",
//         data: `Patient with ID:${body.nationalID} already exists`,
//       });
//     }
//   } catch (error) {
//     const err: Error = error as Error;
//     handleError(err, res);
//   }
// };

// const deletePatient = async (req: Request, res: Response): Promise<void> => {
//   try {
//     if (!(await prisma.patient.findUnique({ where: { id: +req.params.id } }))) {
//       res.status(404).json({
//         msg: `Patient with id: ${req.params.id} Does not exist`,
//       });
//       return;
//     }
//     await prisma.patient
//       .delete({
//         where: {
//           id: req.body.id,
//         },
//       })
//       .then((result) => {
//         res.status(202).json({
//           msg: "Successfully deleted patient",
//           result,
//         });
//       });
//   } catch (error) {
//     const err: Error = error as Error;
//     handleError(err, res);
//   }
// };

// const getPatient = async (req: Request, res: Response): Promise<void> => {
//   try {
//     await prisma.patient
//       .findUnique({
//         where: {
//           id: +req.params.id,
//         },
//         include: {
//           nurse: true,
//         },
//       })
//       .then((result) => {
//         if (!result) {
//           res.status(404).json({
//             msg: `Patient with id: ${req.params.id} Does not exist`,
//           });
//           return;
//         } else {
//           res.status(200).json(Stringify(result));
//         }
//       });
//   } catch (error) {
//     const err: Error = error as Error;
//     handleError(err, res);
//   }
// };

// const getPatients = async (req: Request, res: Response): Promise<void> => {
//   const patients = await prisma.patient.findMany({ include: { nurse: true } });
//   if (!patients) {
//     res.json({ msg: "No Patients Found" });
//     return;
//   } else {
//     res.status(200).json(Stringify(patients));
//   }
// };

// export { createPatient, updatePatient, deletePatient, getPatient, getPatients };
