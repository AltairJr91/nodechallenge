import { Request, Response } from "express";
import { prisma } from "../database/Prisma";
import { hash } from "bcrypt";



export class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password, login } = req.body;

    const encryptedPassword = await hash(password, 8);

    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) { return res.json({ error: "User already exists" }) };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        login
      }

    });

    await prisma.$disconnect();

    return res.json({ user: { name, email, login } });

  };

  async readUser(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return res.json({ users })
  };

  async deleteUser(req: Request, res: Response) {
    const { email, login } = req.body;

    try {
      const deleteUsers = await prisma.user.delete({ where: { email, login } });

      await prisma.$disconnect();

      return res.json({ message: `User ${deleteUsers.login} has been deleted` });

    } catch (error) {

      res.json({ message: "User not find" })

    };
  };

  async updateUser(req: Request, res: Response){
    const {name, email, login } = req.body;

    try {
      const updateUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          name: name,
          login:login
        },
      })

      await prisma.$disconnect();

      return res.json({ message: `User ${updateUser.name} has been updated`, changes:`name:${updateUser.name} and login: ${updateUser.login} `});

    } catch (error) {

      res.json({ message: `Can not update user` })

    };
  }




}
