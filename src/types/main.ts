import { IAppConfiguration, IConfiguration } from './configuration.type';

export interface IMain {
  configure(): IConfiguration | Promise<IConfiguration>;
  start(configuration: IAppConfiguration): void;
}
