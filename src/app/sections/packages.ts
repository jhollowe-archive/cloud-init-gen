import { ISectionComponent, Section, SectionData } from './section';
import { propertyData } from '../utils';
import { Property } from '../datatypes';
import { Component, Input } from '@angular/core';

// DEFINITION: https://cloudinit.readthedocs.io/en/latest/topics/modules.html#package-update-upgrade-install
export class PackagesSection extends Section {
  protected data: PackagesData = new PackagesData();

  constructor() {
    // section type, supported_distros
    super("packages", ["all"]);
    this.component = PackagesComponent;
  }

  public getTitle() {
    return "Packages" + (this.data.packages.length > 0 ? ": " : "") + this.data.packages.join(", ");
  }

  public getData(): PackagesData {
    return this.data;
  }
}

class PackagesData extends SectionData {
  @propertyData(undefined, "Packages to install.")
  packages: Array<Package> = [];
  @propertyData(false, "Update the package sources. Sources will be update if package_upgrade is true or any packages will be installed.")
  package_update?: boolean;
  @propertyData(false, "Upgrade existing packages to latest versions. If true, implies package_update = true.")
  package_upgrade?: boolean;
  @propertyData(false, "If installed/upgraded packages require a reboot, immediately reboot")
  package_reboot_if_required?: boolean;


  // Returns an object representation of the class (usable to convert to YAML).
  // if verbose is set and true, this returns all properties filled with default values.
  getObj(verbose?: boolean): object {
    let returnObj: any = {};
    this._propertyData.getAll().map(val => val.name).forEach((val) => {
      // if property has value
      if (typeof this[val as keyof PackagesData] != "undefined") {
        returnObj[val] = this[val as keyof PackagesData]
      } else {
        if (verbose) {
          returnObj[val] = this._propertyData.getProp(val)?.default_value;
        }
      }
    });
    return returnObj;
  }

  constructor() {
    super();
  }
}

class Package {
  constructor(
    public readonly package_name: string,
    public readonly version?: string,
  ) { }

  get(): string | [string, string] {
    if (this.version) {
      return [this.package_name, this.version];
    } else { return this.package_name };
  }

  toString(): string {
    if (this.version) {
      return `${this.package_name}@${this.version}`;
    } else { return this.package_name };
  }
}

@Component({
  selector: 'app-sections-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./common.component.scss']
})
export class PackagesComponent implements ISectionComponent {
  private _section!: Section;
  props!: Array<Property>;

  @Input()
  set section(s: Section) {
    this._section = s;
    if (s) {
      this.props = this.section.getData().getPropertyData().getAll();
      console.log(this.props);
    }
  }

  get section(): Section {
    return this._section;
  }

}
