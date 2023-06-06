import { NextFunction, Request, Response } from "express";
import { verify, Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


export function Middleware(req: Request, res: Response, next: NextFunction) {
  const { url } = req;
  const { authorization } = req.headers;

  if (url === '/login' || url === '/createnewuser') {
    return next();
  }
  
  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" })
  };

  const [, token] = authorization.split(" ");
  try {

    const decoded = verify(token, process.env.SECRET_KEY as Secret);
    const { id } = decoded as JwtPayload;
    req.userId = id;
    next()

  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
 

}
