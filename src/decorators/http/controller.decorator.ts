import { container, injectable } from 'tsyringe';
import { constructor } from '../../types';
import { addController } from '../../helpers';

export function Controller(path = '') {
  return (constructor: constructor<unknown>): void => {
    injectable()(constructor);
    const instance = container.resolve(constructor) as {
      [properties: string]: () => void;
    };
    addController(instance, path);
  };
}
