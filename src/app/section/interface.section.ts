import { Type } from "@angular/core";
import { uuid } from "../datatype";
import { ISectionComponent } from "./component/interface.component";

export interface ISection {
  // The component to dynamically load for editing this section
  readonly component: Type<ISectionComponent>;

  // The type of section that this is.
  readonly type: string;

  // A unique identifier of this section
  readonly uuid: uuid;

  /**
   * Used to get a YAML representation of this section.
   * If verbose is true, all properties of the section are included with their default values
   *
   * @param {boolean} verbose If true, include all properties with default values. Else, only include set values
   * @returns a YAML representation of this section*/
  getYaml(verbose?: boolean): string;

  /**
   *
   * @returns {string} the tile to display for this
   */
  getTitle(): string;

}
