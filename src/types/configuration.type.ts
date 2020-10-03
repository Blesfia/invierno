import { PluginCode } from '../enums';
import { IBaseLogger } from './base-logger.type';
import { unknownFunction } from './common.type';
import { parameterMetadata } from './parameter-metadata.type';

/**
 * @alias IConfiguration
 */
export interface IConfiguration {
  /**
   * If boolean: true to use a {@link ConsoleLogger} logger, false to no print any log from invierno<br>
   * If object: object with {@link IBaseLogger} properties to be use by invierno
   * @example
   * {
   *  logger: winstonInstance | pinoInstance | console,
   * }
   */
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
