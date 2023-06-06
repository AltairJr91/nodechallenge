import { Request, Response } from "express";
import { prisma } from "../database/Prisma";


export class FileDownloader {
  async downloadFile(req: Request, res: Response) {

    try {
      const { name }: any = req.body;
      const fileHandler = await prisma.files.findFirst({ where: { name } });

      if (!fileHandler) {
        throw new Error('File not found');
      }

      return res.download(JSON.stringify(fileHandler.image));

    } catch (error) {
      console.error(error);
      if (error === 'File not found') {
        return res.status(404).send('File not found.');
      } else {
        return res.status(500).send('An error occurred while downloading the file.');
      }
    }
  }
}