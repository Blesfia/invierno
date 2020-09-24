/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpMethod } from '../../enums';
import { addRoute } from '../../helpers';

/** Define a route into a controller */
export function Http(path: string, method: HttpMethod) {
  return (prototype: any, property: string): void => {
    addRoute(prototype, path, method, property);
  };
}

export function Post(path = '') {
  return Http(path, HttpMethod.post);
}

export function Get(path = '') {
  return Http(path, HttpMethod.get);
}

export function Put(path = '') {
  return Http(path, HttpMethod.put);
}

export function Patch(path = '') {
  return Http(path, HttpMethod.patch);
}

export function Delete(path = '') {
  return Http(path, HttpMethod.delete);
}
