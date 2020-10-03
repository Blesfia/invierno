import { constructor, IMain, IConfiguration, httpAdapter } from '../types';
import { config } from '../config';
import { configureLogger } from '../helpers';
import { MetadataCode } from '../enums';

/**
 * Welcome to invierno, the winter is coming! <br>
 *
 * To start using invierno, you will need to use the @Main decorator ({@link Main}), use it as your starting point and invierno will load automatically.
 * <br>
 * @module Getting started
 * @example
 * //index.ts
 * import { Main, IMain, IAppConfiguration } from 'invierno';
 * 
 * // @Main(configuration)
export class Application implements IMain {
  // onLoad?(configuration: IAppConfiguration): IAppConfiguration | Promise<IAppConfiguration>;
  // onLoaded?(configuration: IAppConfiguration): void;
}
 */
/**
 * Main decorator, use it only once as your starting point for your application
 * <br><br>
 * See {@link IMain} to check the life cycle hooks
 * 
 * @alias Main
 * @param {IConfiguration} configuration Global configuration
 * @example
 * //index.ts
 * import { Main, IMain, IAppConfiguration } from 'invierno';
 * 
 * // @Main(configuration)
export class Application implements IMain {
  // onLoad?(configuration: IAppConfiguration): IAppConfiguration | Promise<IAppConfiguration>;
  // onLoaded?(configuration: IAppConfiguration): void;
}
 */
export function Main(configuration: IConfiguration) {
  return (target: constructor<IMain>): void => {
    const app = new target();
    let appConfiguration = configureLogger(config, configuration.logger);
    config.logger.info('Winter is coming');
    (async () => {
      config.logger.info('Run onLoad hook');
      appConfiguration = (await app.onLoad?.(appConfiguration)) ?? appConfiguration;
      config.logger.info('Starting server');
      const httpServer: httpAdapter = Reflect.getMetadata(MetadataCode.httpServer, target);
      if (!httpServer) {
        config.logger.warn('Http server not found, use @HttpServer before @Main decorator to apply core http server');
      } else {
        await httpServer.configure(config);
        config.logger.info('Winter has arrived');
      }
      app.onLoaded?.(config);
    })();
  };
}
