import {
  CallHandler,
  ExecutionContext,
  NestInterceptor
  //UnauthorizedException
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //const req = context.switchToHttp().getRequest();
    //const authHeader = req.headers.authorization;
    //const token = authHeader && authHeader.split(' ')[1];
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const headers = request.headers;

    console.log('token', headers['x-token']);
    //console.log('auth', authHeader);
    // if (!token) {
    //   throw new UnauthorizedException('No token provided');
    // }
    return handler.handle();
  }
}
