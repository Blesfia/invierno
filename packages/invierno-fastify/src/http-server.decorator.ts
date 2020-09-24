/* eslint-disable @typescript-eslint/no-explicit-any */
import { constructor, httpAdapter, MetadataCode, IAppConfiguration } from 'invierno';
import 'reflect-metadata';
import { configureServer, errorHandler } from './helpers';
import { IFastifyConfiguration } from './types';

/**
 * @param {Number} port Port to use with fastify server
 */
export function HttpServer(port: number, options?: IFastifyConfiguration): (target: constructor<any>) => void {
  const newOptions: IFastifyConfiguration = {
    errorHandler: errorHandler,
    hostname: undefined,
    ...(options ?? {}),
  };
  return (target: constructor<any>): void => {
    Reflect.defineMetadata(
      MetadataCode.httpServer,
      {
        configure: (configuration: IAppConfiguration) => configureServer(port, newOptions, configuration),
      } as httpAdapter,
      target,
    );
  };
}
