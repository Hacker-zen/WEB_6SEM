import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.redirect('/login');
    }

    next();
  }
}
