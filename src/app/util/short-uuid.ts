import { uuid } from '../datatype';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function shortUuid(u: uuid): string {
  return u.split('-')[0];
}
