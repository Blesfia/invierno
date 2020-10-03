import { FastifyReply, FastifyRequest } from 'fastify';

export type errorHandler = (request: FastifyRequest, reply: FastifyReply, error: Error) => Promise<void> | void;
export interface IFastifyConfiguration {
  errorHandler?: errorHandler;
  hostname: string | undefined;
  /** Fastify server to use */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  server?: any;
}
