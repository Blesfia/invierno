import { PluginCode } from '../enums';
import { IBaseLogger } from './base-logger.type';
import { unknownFunction } from './common.type';
import { parameterMetadata } from './parameter-metadata.type';

export interface IConfiguration {
  logger?: boolean | IBaseLogger;
}

export interface IAppConfiguration {
  logger: IBaseLogger;
  routes: {
    [path: string]: {
      [method: string]: {
        operation: unknownFunction | Promise<unknown>;
        parameters: parameterMetadata;
        plugins: Array<{ type: PluginCode; cb: unknownFunction }>;
      };
    };
  };
}
