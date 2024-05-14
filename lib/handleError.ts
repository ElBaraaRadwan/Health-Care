import { Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function handleError(error: Error, res: Response): void {
  let message: string = "Error";
  let statusCode: number = 500;

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint violation (e.g., name already exists)
        message = "already exists.";
        statusCode = 400;
        break;
      case "P2001": // Foreign key constraint violation (e.g., connecting non-existent)
        message = "Failed to connect. Please ensure they exist.";
        statusCode = 400;
        break;
      case "P2025": // Record not found (e.g., trying to update a non-existent)
        message = "Not Found.";
        statusCode = 404;
        break;
      default:
        // Handle other Prisma errors
        message = `Prisma error: ${error.message}`;
        break;
    }
  } else {
    // Handle other non-Prisma errors
    console.error("Unexpected error:", error);
  }

  res.status(statusCode).json({ msg: message, data: error });
}

export default handleError;
