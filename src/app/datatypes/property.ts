export class Property {
  constructor(
    public type: string,
    public name: string,
    public default_value: any,
    public description: string = "",
    public optional: boolean = true,
    // other properties this property is mutually exclusive with
    public mut_exclusive: string[] = []) {

  }
}

export class PropertyGroup {
  private _properties: Array<Property> = [];

  constructor() { }

  public add(newProp: Property) {
    this._properties.push(newProp);
  }

  public getAll(): Array<Property> {
    return this._properties;
  }

  public getAllByType(): Object {
    let returnObj: any = {};
    this._properties.forEach(val => {
      if (returnObj[val.type]) {
        returnObj[val.type].push(val)
      } else {
        returnObj[val.type] = [val]
      }
    });
    return returnObj;
  }

  public getProp(name: string): Property | undefined {
    return this._properties.find(prop => prop.name == name);
  }

  // returns true if there are properties in this group that conflict (are mutually exclusive)
  public isMutExclBroken(): boolean {
    let propnames = this._properties.map(val => val.name)
    let excludes: Array<string> = [];

    this._properties.forEach(val => { excludes.concat(val.mut_exclusive) });

    for (let e of excludes) {
      if (propnames.includes(e)) {
        return true;
      }
    }
    return false;
  }
}
