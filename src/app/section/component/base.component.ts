import { Component, Input } from "@angular/core";
import { Section } from "../base.section";
import { ISectionComponent } from "./interface.component";

@Component({template: ""}) // since this is abstract, this should/will never be instantiated
export abstract class SectionComponent implements ISectionComponent {

  constructor() { }

  @Input() section!: Section;
}
