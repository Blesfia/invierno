/* eslint-disable @typescript-eslint/no-explicit-any */
import { fastify, FastifyReply, FastifyRequest } from 'fastify';
import { IAppConfiguration, HttpMethod, parameterMetadata, ParameterCode, pluginType, PluginCode } from 'invierno';
import { IFastifyConfiguration } from '../types';

const parameterMapping = {
  [ParameterCode.body]: (request: FastifyRequest) => request.body,
  [ParameterCode.pathParams]: (request: FastifyRequest) => request.params,
  [ParameterCode.request]: (request: FastifyRequest) => request,
  [ParameterCode.response]: (_: FastifyRequest, response: FastifyReply) => response,
  [ParameterCode.query]: (request: FastifyRequest) => request.query,
};

const pluginMapping = {
  [PluginCode.header]: (_request: FastifyRequest, response: FastifyReply, data: { key: string; value: string }) => {
    response.header(data.key, data.value);
  },
};
const handler = async (
  options: { parameters: parameterMetadata; plugins: pluginType[] },
  operation: (...args: unknown[]) => unknown,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parameters = [];
  for (const parameter of options.parameters) {
    let parameterValue = parameterMapping[parameter.code]?.(request, reply);
    if (parameter.cb) {
      parameterValue = await parameter.cb(parameterValue);
    }
    parameters[parameter.parameterIndex] = parameterValue;
  }
  for (const plugin of options.plugins) {
    await pluginMapping[plugin.type]?.(request, reply, plugin.cb() as any);
  }
  reply.send(await operation(...parameters));
};

function prepareExecution(
  configuration: IFastifyConfiguration,
  { operation, parameters, plugins }: { operation: any; parameters: parameterMetadata; plugins: pluginType[] },
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    return handler({ parameters, plugins }, operation, request, reply).catch((error) =>
      configuration.errorHandler?.(request, reply, error),
    );
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function configureServer(port: number, options: IFastifyConfiguration, app: IAppConfiguration) {
  const server = fastify({
    logger: false,
  });

  for (const [path, operation] of Object.entries(app.routes)) {
    for (const [method, execution] of Object.entries(operation)) {
      const operation = prepareExecution(options, execution as any);
      app.logger.info(`Register "${method} - ${path}".`);
      switch (method) {
        case HttpMethod.get:
          server.get(path, operation);
          break;
        case HttpMethod.post:
          server.post(path, operation);
          break;
        case HttpMethod.patch:
          server.patch(path, operation);
          break;
        case HttpMethod.delete:
          server.delete(path, operation);
          break;
        default:
          app.logger.warn(`Unknown method "${method}" detected for path "${path}"`);
          break;
      }
    }
  }
  await server.listen(port, options?.hostname);
  app.logger.info(`Listening at ${options?.hostname ?? 'http://localhost'}:${port}`);
}
