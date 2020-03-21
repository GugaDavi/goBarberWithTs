import { Request, Response } from "express";

import File from "../models/File";

class FileController {
  async store(req: Request, res: Response): Promise<Response> {
    const { originalname: name, filename: path } = req.file;

    const { id } = await File.create({
      name,
      path
    });

    const file = await File.findByPk(id);

    return res.json({ createdFile: file });
  }
}

export default new FileController();
