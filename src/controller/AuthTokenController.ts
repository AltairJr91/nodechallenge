import { Request, Response } from "express";
import { prisma } from "../database/Prisma";
import { compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export class AuthUser {
  async authenticate(req: Request, res: Response) {
    const { login, password } = req.body;

    const user = await prisma.user.findUnique({ where: { login } });
    if (!user) { return res.json({ error: "User not found" }) };

    const matchPassword = await compare(password, user.password);
    if (!matchPassword) { return res.json({ error: "Invalid password" }) };

    const token = sign({ id: user.id }, process.env.SECRET_KEY as Secret, { expiresIn: "360d" });
    const { id } = user;
    return res.json({ user: { id, login }, token });

  }

}