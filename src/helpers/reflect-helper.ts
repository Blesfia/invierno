/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { config } from '../config';
import { HttpMethod, MetadataCode, ParameterCode } from '../enums';
import { instance, parameterMetadata, routeMetadata } from '../types';

export function setMetadata(target: any, key: MetadataCode, value: unknown): void {
  Reflect.defineMetadata(key, value, target);
}

export function addRoute(target: any, path: string, method: HttpMethod, property: string): void {
  const routes: routeMetadata = Reflect.getMetadata(MetadataCode.routes, target) ?? {};
  const parameters = Reflect.getMetadata(MetadataCode.parameter, target, property) ?? [];
  routes[path] ||= {};
  routes[path][method] = { property, parameters };
  setMetadata(target, MetadataCode.routes, routes);
}

export function addController(instance: instance, path: string): void {
  const routes: routeMetadata = Reflect.getMetadata(MetadataCode.routes, instance.constructor.prototype) ?? {};

  for (const [subPath, methods] of Object.entries(routes)) {
    const computedSubPath = subPath.length ? `/${subPath}` : '';
    const fullPath = `${path}${computedSubPath}`.replace(/ /g, '');

    config.routes[fullPath] ||= {};

    for (const [method, { property, parameters }] of Object.entries(methods)) {
      const operation = instance[property].bind(instance);
      config.routes[fullPath][method] = {
        operation,
        parameters,
      };
    }
  }
}

export function addParameter(
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number,
  code: ParameterCode,
  options?: { cb: (value: unknown) => unknown },
): void {
  const parameters: parameterMetadata = Reflect.getOwnMetadata(MetadataCode.parameter, target, propertyKey) || [];
  parameters.push({ parameterIndex, code, cb: options?.cb });
  Reflect.defineMetadata(MetadataCode.parameter, parameters, target, propertyKey);
}
