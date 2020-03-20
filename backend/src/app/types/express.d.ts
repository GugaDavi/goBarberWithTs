import * as express from 'express'

declare module 'express' {
  export interface Request {
    userId: number | string;
  }

  export interface ControllerMethod {
    (req: Request, res: express.Response): Promise<express.Response>;
  }
}
