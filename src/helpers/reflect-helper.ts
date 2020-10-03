/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { config } from '../config';
import { HttpMethod, MetadataCode, ParameterCode, PluginCode } from '../enums';
import { instance, parameterMetadata, pluginType, routeMetadata } from '../types';
import { unknownFunction } from '../types/common.type';

export function setMetadata(target: any, key: symbol, value: unknown): void {
  Reflect.defineMetadata(key, value, target);
}

export function addRoute(target: any, path: string, method: HttpMethod, property: string): void {
  const routes: routeMetadata = Reflect.getMetadata(MetadataCode.routes, target) ?? {};
  const parameters = Reflect.getMetadata(MetadataCode.parameter, target, property) ?? [];
  routes[path] ||= {};
  routes[path][method] = { property, parameters, plugins: [] };
  setMetadata(target, MetadataCode.routes, routes);
}

export function addFunctionPlugin(
  target: any,
  property: string,
  type: PluginCode,
  cb: (...args: unknown[]) => unknown,
): void {
  const functionData = Reflect.getMetadata(MetadataCode.functionMiddleware, target) ?? {};
  functionData[property] ||= { plugins: [] };
  functionData[property].plugins.push({ type, cb } as pluginType);
  setMetadata(target, MetadataCode.functionMiddleware, functionData);
}

export function customFunctionPlugin(cb: (...args: unknown[]) => unknown) {
  return (target: any, propertyKey: string) => addFunctionPlugin(target, propertyKey, PluginCode.custom, cb);
}

export function addController(instance: instance, path: string): void {
  const routes: routeMetadata = Reflect.getMetadata(MetadataCode.routes, instance.constructor.prototype) ?? {};
  const functionData = Reflect.getMetadata(MetadataCode.functionMiddleware, instance.constructor.prototype) ?? {};

  for (const [subPath, methods] of Object.entries(routes)) {
    const computedSubPath = subPath.length ? `/${subPath}` : '';
    const fullPath = `${path}${computedSubPath}`.replace(/ /g, '');

    config.routes[fullPath] ||= {};

    for (const [method, { property, parameters }] of Object.entries(methods)) {
      const operation = instance[property].bind(instance);
      config.routes[fullPath][method] = {
        operation,
        parameters,
        plugins: functionData[property]?.plugins ?? [],
      };
    }
  }
}

export function addParameter(
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number,
  code: ParameterCode,
  options?: { cb: unknownFunction },
): void {
  const parameters: parameterMetadata = Reflect.getOwnMetadata(MetadataCode.parameter, target, propertyKey) || [];
  parameters.push({ parameterIndex, code, cb: options?.cb });
  Reflect.defineMetadata(MetadataCode.parameter, parameters, target, propertyKey);
}

export function customParameterPlugin(cb: (...args: unknown[]) => unknown) {
  return (target: any, propertyKey: string, parameterIndex: number) =>
    addParameter(target, propertyKey, parameterIndex, ParameterCode.custom, { cb });
}
