import { ErrorCode } from '../enums';

export class HttpError extends Error {
  public statusCode = 0;
  public isInviernoHttpError = true;
  constructor(public message: string, public code: string, public data: unknown) {
    super(message);
  }
}

export class BadRequestHttpError extends HttpError {
  constructor(public message: string, public code: string = ErrorCode.httpBadRequestError, public data: unknown = {}) {
    super(message, code, data);
  }
  public statusCode = 400;
}

export class ServerErrorHttpError extends HttpError {
  public statusCode = 500;
  constructor(public message: string, public code: string = ErrorCode.httpServerError, public data: unknown = {}) {
    super(message, code, data);
  }
}

export class ForbiddenHttpError extends HttpError {
  public statusCode = 403;
  constructor(public message: string, public code: string = ErrorCode.httpForbiddenError, public data: unknown = {}) {
    super(message, code, data);
  }
}

export class UnauthorizedHttpError extends HttpError {
  public statusCode = 401;
  constructor(
    public message: string,
    public code: string = ErrorCode.httpUnauthorizedError,
    public data: unknown = {},
  ) {
    super(message, code, data);
  }
}
