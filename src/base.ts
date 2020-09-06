import { ConsoleLogger } from './logger';
import { config } from './config';
import { IBaseLogger } from './types';

export abstract class Base {
  protected logger: IBaseLogger;

  constructor() {
    this.logger = new (Reflect.get(config, 'logger') || ConsoleLogger)(
      this.constructor.name,
    );
  }
}
