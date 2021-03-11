import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TokenDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getResponse();
    return request.locals.jwt;
  },
);
