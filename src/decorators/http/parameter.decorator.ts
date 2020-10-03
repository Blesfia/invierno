/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addParameter, validateDto } from '../../helpers';
import { MetadataCode, ParameterCode } from '../../enums';

export function Body() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    const type = Reflect.getMetadata(MetadataCode.designParamTypes, target, propertyKey)[parameterIndex];

    addParameter(target, propertyKey, parameterIndex, ParameterCode.body, {
      cb: (_1, _2, value) => validateDto(value ?? {}, type),
    });
  };
}

export function Request() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.request, {
      cb: (request) => request,
    });
  };
}

export function Response() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.response, {
      cb: (_1, response) => response,
    });
  };
}

export function Query() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.query, {
      cb: (_1, _2, value) => value,
    });
  };
}

export function PathParams() {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    addParameter(target, propertyKey, parameterIndex, ParameterCode.pathParams, {
      cb: (_1, _2, value) => value,
    });
  };
}
