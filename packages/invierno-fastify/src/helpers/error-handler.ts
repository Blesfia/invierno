import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpError } from 'invierno';

export async function errorHandler(_: FastifyRequest, reply: FastifyReply, error: Error | HttpError): Promise<void> {
  if (error?.isInviernoHttpError) {
    return reply.status(error.statusCode).send({
      data: error.data,
      code: error.code,
      message: error.message,
    });
  }
  throw error;
}
