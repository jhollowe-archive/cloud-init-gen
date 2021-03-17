import { Type } from "@angular/core";
import { ISectionComponent } from "./component/interface.component";
import { ISection } from "./interface.section";
import { v4 as uuidv4 } from 'uuid';
import { shortUuid } from '../util';

export abstract class Section implements ISection {
  abstract component: Type<ISectionComponent>;
  abstract type: string;

  readonly uuid = uuidv4();

  abstract getYaml(verbose?: boolean): string;

  getTitle(): string {
    return `${this.type}[${shortUuid(this.uuid)}]`;
  }
}
