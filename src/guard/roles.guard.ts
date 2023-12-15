import { Roles } from '../decorator/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    // const request = context.switchToHttp().getRequest();
    // const user = request.user;
    return this.matchRoles(roles, 'admin');
  }

  private matchRoles(roles: string[], role: string): boolean {
    return roles.includes(role);
  }
}
