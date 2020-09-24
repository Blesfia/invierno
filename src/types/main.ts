import { IAppConfiguration } from './configuration.type';

export interface IMain {
  /** Use this to change the loaded configuration of the framework before it starts  */
  onLoad?(configuration: IAppConfiguration): IAppConfiguration | Promise<IAppConfiguration>;
  /** Use this to execute when server has been initialized */
  onLoaded?(configuration: IAppConfiguration): void;
}
