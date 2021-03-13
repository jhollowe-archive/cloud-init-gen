import { Type } from '@angular/core';
import { ISectionComponent } from '../sections';

export class EditorHelper {
  constructor(public component: Type<ISectionComponent>, public data: any) { }
}
