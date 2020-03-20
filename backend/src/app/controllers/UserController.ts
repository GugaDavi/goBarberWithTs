// eslint-disable-next-line no-unused-vars
import { Request, Response } from "express";
import * as Yup from "yup";

import User from "../models/User";
import File from "../models/File";

class UserController {
  async index(req: Request, res: Response): Promise<Response> {
    const users = await User.findAll();

    return res.json({ users: users });
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(404).json({ error: "Email already used" });
    }

    const { id, name, email: newEmail, provider } = await User.create(req.body);

    return res.json({ createdUser: { id, name, email: newEmail, provider } });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email && email !== user?.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(401).json({ error: "Email already used" });
      }
    }

    if (oldPassword && !(await user?.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    await user!.update(req.body);

    const {
      id,
      name,
      email: updatedEmail,
      avatar,
      provider
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["id", "path", "url"]
        }
      ]
    });

    return res.json({
      upadatedUser: { id, name, email: updatedEmail, provider, avatar }
    });
  }
}

export default new UserController();
