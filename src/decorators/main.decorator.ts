import { constructor, IMain, IBaseLogger } from '../types';
import { config } from '../config';
import { ConsoleLogger } from '../logger';

function configureLogger(logger?: boolean | constructor<IBaseLogger>) {
  if (logger) {
    if (typeof logger === 'boolean') {
      return (config.logger = new ConsoleLogger('Application'));
    }
    return (config.logger = new logger('Application'));
  }
}

export function Main() {
  return (target: constructor<IMain>): void => {
    const app = new target();
    (async () => {
      const configuration = await app.configure();
      configureLogger(configuration.logger);
      config.logger.info('Logger configured');
      const configureHttpService = Reflect.getMetadata('http-server', target);
      if (!configureHttpService) {
        config.logger.warn(
          'Http server not found, use @HttpServer before @Main decorator to apply core http server',
        );
      } else {
        await configureHttpService(config);
      }
      app.start(config);
    })();
  };
}
