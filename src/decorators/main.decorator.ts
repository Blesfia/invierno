import { constructor, IMain, IConfiguration, httpAdapter } from '../types';
import { config } from '../config';
import { configureLogger } from '../helpers';
import { MetadataCode } from '../enums';

/**
 * Main decorator, use this decorator in your class entry point
 * @param configuration Global configuration
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
