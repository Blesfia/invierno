import { IAppConfiguration } from './types';
import { EmptyLogger } from './logger';

export const config = {
  logger: new EmptyLogger(),
  routes: {},
} as IAppConfiguration;
