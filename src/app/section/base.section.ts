import { Type } from '@angular/core';
import { ISectionComponent } from './component/interface.component';
import { ISection } from './interface.section';
import { v4 as uuidv4 } from 'uuid';
import { shortUuid } from '../util';
import { dump, DumpOptions } from 'js-yaml';

export abstract class Section implements ISection {
  readonly uuid = uuidv4();

  abstract component: Type<ISectionComponent>;
  abstract type: string;

  // a default function that should be overridden in each Section
  public getYaml(verbose?: boolean, opts?: DumpOptions): string {
    return dump({ [this.type]: {} }, opts);
  }

  getTitle(): string {
    return `${this.type}[${shortUuid(this.uuid)}]`;
  }

  yamlHelper(obj: any, opts?: DumpOptions): string {
    return dump(obj, opts);
  }
}
