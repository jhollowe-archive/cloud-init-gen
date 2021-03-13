import { dump, DumpOptions } from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';
import { Property, PropertyGroup } from './property';

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

  public getYaml(opts?: DumpOptions): string {
    return dump({ [this.type]: this.getData() }, opts);
  }
}

// get which distros are supported by ALL sections (intersection)
export function getTotalSupportedDistros(sections: Array<Section> | Section): Array<string> {
  if (sections instanceof Section) {
    return sections.getSupportedDistros();
  } else {
    let cumulativeDistros: Array<string> = ["all"];
    for (let section of sections) {
      let distros = section.getSupportedDistros()
      // if this section supports all distros, continue
      if (distros.length === 1 && distros[0] === "all") {
        continue;
      }
      else {
        // intersection of all the supported distros ("all" matches every distro)
        cumulativeDistros = distros.filter(v => cumulativeDistros.includes(v) || cumulativeDistros.includes("all"));
      }
    }
    return cumulativeDistros;
  }
}

// get which distros are supported by ANY sections (union)
export function getAllSupportedDistros(sections: Array<Section> | Section): Array<string> {
  if (sections instanceof Section) {
    return sections.getSupportedDistros();
  } else {
    let cumulativeDistros: Set<string> = new Set();
    for (let section of sections) {
      section.getSupportedDistros().forEach((v) => { cumulativeDistros.add(v) });
    }
    return Array.from(cumulativeDistros)
  }
}

export class SectionData {
  // for some reason, declaring the new PropertyGroup() here does not work
  protected _propertyData!: PropertyGroup;

  getPropertyData(): PropertyGroup {
    if (!this._propertyData) this._propertyData = new PropertyGroup();
    return this._propertyData;
  }

  addPropertyData(newData: Property) {
    if (!this._propertyData) this._propertyData = new PropertyGroup();
    this._propertyData.add(newData);
  }
}
