/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IParameter } from '../types';

export function File(name: string) {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    const parameters =
      Reflect.get(target.constructor, propertyKey, 'parameters') ||
      ([] as IParameter[]);
    parameters.push({ type: 'file', name, parameterIndex });
    parameters.sort(
      (a: IParameter, b: IParameter) => a.parameterIndex - b.parameterIndex,
    );
    Reflect.set(target.constructor, propertyKey, parameters);
  };
}
