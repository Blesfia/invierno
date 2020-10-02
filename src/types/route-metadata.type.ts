import { unknownFunction } from './common.type';
import { parameterMetadata } from './parameter-metadata.type';

export type routeMetadata = {
  [path: string]: {
    [method: string]: { property: string; parameters: parameterMetadata; plugins: Array<unknownFunction> };
  };
};
