import { ErrorCode } from '../enums';

export class HttpError extends Error {
  public statusCode = 0;
  public isInviernoHttpError = true;
  constructor(public message: string, public code: string, public data: unknown) {
    super(message);
  }
}

export class BadRequestHttpError extends HttpError {
  public code = ErrorCode.httpBadRequestError;
  public statusCode = 400;
}

export class ServerErrorHttpError extends HttpError {
  public code = ErrorCode.httpServerError;
  public statusCode = 500;
}

export class ForbiddenHttpError extends HttpError {
  public code = ErrorCode.httpForbiddenError;
  public statusCode = 403;
}

export class UnauthorizedHttpError extends HttpError {
  public code = ErrorCode.httpUnauthorizedError;
  public statusCode = 401;
}
