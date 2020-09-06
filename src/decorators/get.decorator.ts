import { HttpMethod } from '../enums';
import { constructor } from '../types';

export function Get(path = '') {
  return (
    prototype: { constructor: constructor<unknown> },
    property: string,
  ): void => {
    const routes = Reflect.get(prototype.constructor, 'routes') || {
      [path]: {},
    };
    routes[path][HttpMethod.get] = property;
    Reflect.set(prototype.constructor, 'routes', routes);
  };
}
