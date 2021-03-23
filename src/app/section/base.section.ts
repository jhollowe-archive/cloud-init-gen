import { Type } from "@angular/core";
import { ISectionComponent } from "./component/interface.component";
import { ISection } from "./interface.section";
import { v4 as uuidv4 } from 'uuid';
import { shortUuid } from '../util';
import { dump, DumpOptions } from "js-yaml";

export abstract class Section implements ISection {
  abstract type: string;
  abstract prettyType: string;
  abstract component: Type<ISectionComponent>;
  supportedDistros: string[] = ["all"]; // only needs to be overridden if the section does not support all distros

  uuid = uuidv4();

  // a default function that should be overridden in each Section
  public getYaml(verbose?: boolean, opts?: DumpOptions): string {
    return this.dumpYaml({ [this.type]: {} }, opts);
  }

  getTitle(): string {
    return `${this.prettyType}[${shortUuid(this.uuid)}]`;
  }

  /**
   * A wrapper for js-yaml.dump() so each subclass does not need to import js-yaml
   *
   * also allows a central function for any alterations or overrides to the YAML
   *
   * @param obj object to dump
   * @param opts optional options for converting to YAML
   * @returns YAML string representation of object
   */
  dumpYaml(obj: any, opts?: DumpOptions): string {
    return dump(obj, opts);
  }
}
