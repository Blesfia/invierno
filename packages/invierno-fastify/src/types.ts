import { FastifyReply, FastifyRequest } from 'fastify';

export type errorHandler = (request: FastifyRequest, reply: FastifyReply, error: Error) => Promise<void> | void;
export interface IFastifyConfiguration {
  errorHandler?: errorHandler;
  hostname: string | undefined;
}
