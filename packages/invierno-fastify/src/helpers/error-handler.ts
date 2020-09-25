import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpError } from 'invierno';

export async function errorHandler(_: FastifyRequest, reply: FastifyReply, error: unknown): Promise<void> {
  if ((error as HttpError)?.isInviernoHttpError) {
    return reply.status((error as HttpError).statusCode).send({
      data: (error as HttpError).data,
      code: (error as HttpError).code,
      message: (error as HttpError).message,
    });
  }
  throw error;
}
