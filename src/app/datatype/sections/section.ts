import { TitleCasePipe } from '@angular/common';
import { dump, DumpOptions } from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';
import { Property, PropertyGroup } from '../property';

export class Section {
  private type: string;
  protected data: any;
  protected supported_distros: Array<string> = ["none"];
  protected readonly uuid: string;

  constructor(type: string, supported_distros: any) {
    this.type = type;
    this.supported_distros = supported_distros;
    this.data = {};
    this.uuid = uuidv4();
  }

  public getType(): string {
    return this.type;
  }

  public getUuid(): string {
    return this.uuid;
  }

  public getSupportedDistros(): Array<string> {
    return this.supported_distros;
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
