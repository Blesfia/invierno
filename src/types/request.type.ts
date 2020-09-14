import { IncomingMessage, ServerResponse } from 'http';

export interface IRequest {
  req: IncomingMessage;
  res: ServerResponse;
}
