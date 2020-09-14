/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpMethod } from '../enums';
import { Http } from './http.decorator';

export function Patch(path = '') {
  return Http(path, HttpMethod.patch);
}
