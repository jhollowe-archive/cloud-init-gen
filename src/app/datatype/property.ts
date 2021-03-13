export class Property {
  constructor(
    public name: string,
    public default_value: any,
    public description: string = "",
    public optional: boolean = true) {

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

  public getProp(name: string): Property | undefined {
    return this._properties.find(prop => prop.name == name);
  }
}
