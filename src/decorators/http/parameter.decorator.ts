/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addParameter, validateDto } from '../../helpers';
import { MetadataCode, ParameterCode } from '../../enums';

export function Body() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    const type = Reflect.getMetadata(MetadataCode.designParamTypes, target, propertyKey)[parameterIndex];

    addParameter(target, propertyKey, parameterIndex, ParameterCode.body, {
      cb: (value) => validateDto(value ?? {}, type),
    });
  };
}

export function Request() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.request);
  };
}

export function Response() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.response);
  };
}

export function Query() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.query);
  };
}

export function PathParams() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.pathParams);
  };
}
