import { IAppConfiguration } from './configuration.type';

export type httpAdapter = {
  configure(configuration: IAppConfiguration): Promise<void>;
};
