import { config } from '../config';
import { container, injectable } from 'tsyringe';
import { constructor } from '../types';

export function Controller(path = '') {
  return (constructor: constructor<unknown>): void => {
    injectable()(constructor);
    const instance = container.resolve(constructor) as {
      [properties: string]: () => void;
    };
    const routes = (Reflect.get(constructor, 'routes') ?? {}) as {
      [subPath: string]: { [method: string]: string };
    };
    for (const [subPath, methods] of Object.entries(routes)) {
      const computedSubPath = subPath.length ? `/${subPath}` : '';
      const fullPath = `${path}${computedSubPath}`.replace(/ /g, '');
      config.routes[fullPath] = config.routes[fullPath] || {};
      for (const [method, property] of Object.entries(methods)) {
        const operation = instance[property].bind(instance);
        config.routes[fullPath][method] = {
          operation,
          parameters: Reflect.get(constructor, property, 'parameters'),
        };
      }
    }
  };
}
