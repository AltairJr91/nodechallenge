import { Request, Response } from "express";
import { prisma } from "../database/Prisma";


export class FileUploader {
  async storeFile(req: Request, res: Response) {

    try {
      const { name, buffer }: any = req.file;

      const fileSize = buffer.byteLength;
      if (fileSize < 1024 || fileSize > 5 * 1024 * 1024) {
        return res.status(400).send('File size must be between 1KB and 5MB.');
      }

      const imageBuffer = Buffer.from(buffer, 'base64');

      const fileHandler = await prisma.files.create({
        data: {
          name: name,
          image: imageBuffer,
        },
      });

      return res.json({ fileHandler });
    } catch (error) {
      console.error(error);
      return res.status(500).send('An error occurred while uploading the file.');
    }
  }

}