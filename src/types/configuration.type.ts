import { IBaseLogger } from './base-logger.type';
import { constructor } from './constructor.type';

export interface IConfiguration {
  logger?: boolean | constructor<IBaseLogger>;
}

export interface IAppConfiguration {
  logger: IBaseLogger;
  routes: {
    [path: string]: {
      [method: string]: (
        req: unknown,
        res: unknown,
      ) => unknown | Promise<unknown>;
    };
  };
}
