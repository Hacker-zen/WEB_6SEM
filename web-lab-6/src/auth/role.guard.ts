import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './decorators/role.decorator';
import { IS_PUBLIC_KEY } from './decorators/IsPublic.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = await this.userService.findById(request.session.userId);

    if (!user) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    if (!requiredRoles && requiredRoles.length == 0) {
      return true;
    }

    return requiredRoles.some((role) => role === user.role);
  }
}
