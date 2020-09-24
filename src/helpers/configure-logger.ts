import { ConsoleLogger, EmptyLogger } from '../logger';
import { IAppConfiguration, IBaseLogger } from '../types';

export function configureLogger(config: IAppConfiguration, logger?: boolean | IBaseLogger): IAppConfiguration {
  if (logger) {
    if (typeof logger === 'boolean') {
      if (logger) {
        config.logger = new ConsoleLogger('Application');
      } else {
        config.logger = new EmptyLogger();
      }
    } else {
      config.logger = logger;
    }
  }
  return config;
}
