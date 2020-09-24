import { ParameterCode } from '../enums';

export type parameterMetadata = Array<{
  parameterIndex: number;
  code: ParameterCode;
  cb: ((value: unknown) => unknown) | undefined;
}>;
