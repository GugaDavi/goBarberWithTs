// eslint-disable-next-line no-unused-vars
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import jwtConfig from "../../config/auth";

import User from "../models/User";
import File from "../models/File";

class SessionController {
  async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const _user = await User.findOne({
      where: {
        email
      },
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["id", "path", "url"]
        }
      ]
    });

    if (!_user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!(await _user.checkPassword(password))) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const { id, name, avatar, provider } = _user;

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        provider
      },
      token: jwt.sign({ id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
      })
    });
  }
}

export default new SessionController();
