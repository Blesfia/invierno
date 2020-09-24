import { parameterMetadata } from './parameter-metadata.type';

export type routeMetadata = {
  [path: string]: { [method: string]: { property: string; parameters: parameterMetadata } };
};
