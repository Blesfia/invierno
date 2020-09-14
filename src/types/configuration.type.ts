import { IBaseLogger } from './base-logger.type';
import { constructor } from './constructor.type';

export interface IConfiguration {
  logger?: boolean | constructor<IBaseLogger>;
}

export interface IAppConfiguration {
  logger: IBaseLogger;
  routes: {
    [path: string]: {
      [method: string]: {
        operation: (req: unknown, res: unknown) => unknown | Promise<unknown>;
        parameters: Record<string, unknown>;
      };
    };
  };
}
