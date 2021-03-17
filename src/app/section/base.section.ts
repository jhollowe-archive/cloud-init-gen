import { Type } from "@angular/core";
import { ISectionComponent } from "./component/interface.section-component";
import { ISection } from "./interface.section";
import { v4 as uuidv4 } from 'uuid';

export abstract class Section implements ISection {
  abstract readonly component: Type<ISectionComponent>;
  abstract readonly type: string;

  readonly uuid = uuidv4();

  abstract getYaml(verbose?: boolean): string;

  getTitle(): string {
    return `${this.type}[${this.uuid}]`;
  }
}
