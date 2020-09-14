import { injectable } from 'tsyringe';
import { constructor } from '../types';

export function Injectable(): (target: constructor<unknown>) => void {
  return (target) => {
    injectable()(target);
  };
}
