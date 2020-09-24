import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { ErrorCode } from '../enums';
import { BadRequestHttpError } from '../errors';

const convertError = (error: ValidationError, errors: Array<{ property: string; error: string }>, prefix = '') => {
  if (error.constraints) {
    errors.push(...Object.values(error.constraints).map((c) => ({ property: `${prefix}${error.property}`, error: c })));
  }
  if (error.children?.length) {
    error.children.forEach((e) => convertError(e, errors, `${prefix}${error.property}.`));
  }
  return errors;
};

export function validateDto<T>(data: unknown, dto: unknown): Promise<T> {
  console.log('dto: ', dto);
  console.log('data: ', data);
  const validator = plainToClass(dto as ClassType<T>, data as T);
  console.log('validator: ', validator);
  return validateOrReject(validator)
    .then(() => validator)
    .catch((errors: ValidationError[]) => {
      throw new BadRequestHttpError(
        '',
        ErrorCode.invalidBody,
        errors.map((error) => convertError(error, [])),
      );
    });
}
