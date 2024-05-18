import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

dotenv.config();

export function authMiddleware(endPoint: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.SECRET_TOKEN || "bebon32"
          ) as { role: string };
          req.user = decoded;
          const isAllowed = await rbac.can(req.user.role, endPoint);
          if (isAllowed) {
            next();
          } else {
            res.status(401).json({ message: "unauthorized" });
          }
        } catch (error) {
          res.json({ message: error });
        }
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  };
}

async function generateJWT(req: Request, res: Response) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (token) {
      return res.status(400).json({ error: "A token already exists" });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not exists" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

    if (!passwordIsValid) {
      return res
        .status(400)
        .json({ error: "Failed to login, invalid password" });
    }

    const { id } = user;

    if (!process.env.SECRET_TOKEN) {
      return res.status(500).json({ error: "Missing SECRET_TOKEN" });
    }

    const newToken = jwt.sign({ id }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });

    return res.status(200).json(newToken);
  }
  return res.status(400).json({ error: "No headers provided" });
}

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  if (req.headers) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ error: "No token provided" });
    }

    if (!process.env.SECRET_TOKEN) {
      return res.status(500).json({ error: "Missing SECRET_TOKEN" });
    }

    return jwt.verify(
      token,
      process.env.SECRET_TOKEN,
      async (err: any, decoded: any) => {
        if (err) {
          return res.status(400).json({ error: err });
        }

        req.body.id = decoded.id;

        const user = await prisma.user.findUnique({
          where: {
            id: req.body.id,
          },
        });

        if (!user) {
          return res.status(400).json({ error: "User not exists" });
        }

        next();
      }
    );
  }
  return res.status(400).json({ error: "No headers provided" });
}
