import { Injectable, NestMiddleware } from '@nestjs/common';
import { middleware } from 'supertokens-node/framework/express';
import { Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  supertokensMiddleware: any;

  constructor() {
    this.supertokensMiddleware = middleware();
  }

  async use(req: any, res: Response, next: () => void) {
    return this.supertokensMiddleware(req, res, next);
  }
}
