import { uuid } from '../datatype';

export function shortUuid(uuid: uuid): string {
  return uuid.split("-")[0];
}
