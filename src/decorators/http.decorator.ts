/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpMethod } from '../enums';

export function Http(path: string, method: HttpMethod) {
  return (prototype: any, property: string): void => {
    const routes = Reflect.get(prototype.constructor, 'routes') || {
      [path]: {},
    };
    routes[path][method] = property;
    Reflect.set(prototype.constructor, 'routes', routes);
  };
}
