/* eslint-disable @typescript-eslint/no-empty-function */
import { IBaseLogger } from '../types';

export class EmptyLogger implements IBaseLogger {
  public info(): void {}
  public error(): void {}
  public warn(): void {}
}
