import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { dump, DumpOptions } from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';
import { Property, PropertyGroup } from '../datatypes';

export class Section {
  public readonly type: string;
  protected data: any;
  public readonly supported_distros: Array<string> = ["none"];
  public readonly uuid: string;

  constructor(type: string, supported_distros: any) {
    this.type = type;
    this.supported_distros = supported_distros;
    this.data = {};
    this.uuid = uuidv4();
  }

  public getData(): any {
    return this.data;
  }

  public getTitle(): string {
    return new TitleCasePipe().transform(this.type);
  }

  public getYaml(opts?: DumpOptions): string {
    return dump({ [this.type]: this.getData() }, opts);
  }
}

export class SectionData {
  // for some reason, declaring new PropertyGroup() here does not work
  protected _propertyData!: PropertyGroup;

  getPropertyData(): PropertyGroup {
    if (!this._propertyData) this._propertyData = new PropertyGroup();
    return this._propertyData;
  }

  addPropertyData(newData: Property) {
    if (!this._propertyData) this._propertyData = new PropertyGroup();
    this._propertyData.add(newData);
  }

  getProperty(name: string): Property | undefined {
    return this._propertyData.getProp(name);
  }
}

@Component({
  selector: 'app-sections-section',
  templateUrl: './section.component.html',
  styleUrls: ['./common.component.scss']
})
export class SectionComponent {
  @Input() section!: Section;
}
