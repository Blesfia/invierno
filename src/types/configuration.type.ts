import { IBaseLogger } from './base-logger.type';
import { parameterMetadata } from './parameter-metadata.type';

export interface IConfiguration {
  logger?: boolean | IBaseLogger;
}

export interface IAppConfiguration {
  logger: IBaseLogger;
  routes: {
    [path: string]: {
      [method: string]: {
        operation: (req: unknown, res: unknown) => unknown | Promise<unknown>;
        parameters: parameterMetadata;
      };
    };
  };
}
