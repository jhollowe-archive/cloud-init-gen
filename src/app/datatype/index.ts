import { Type } from '@angular/core';
import { ISection } from '../section';

export interface sectionMapping { [key: string]: [string, Type<ISection>] };
export type uuid = string;
