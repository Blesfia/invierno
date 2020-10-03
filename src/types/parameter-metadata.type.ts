import { ParameterCode } from '../enums';
import { unknownFunction } from './common.type';

export type parameterMetadata = Array<{
  parameterIndex: number;
  code: ParameterCode;
  cb: unknownFunction | undefined;
}>;
