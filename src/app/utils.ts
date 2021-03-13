
import { Property } from './datatype/property';
import { SectionData } from './datatype/section';

// Decorator for section properties
export function propertyData(default_value: any, description: string, optional: boolean = true) {
  console.log("here")
  return function (target: SectionData, propertyKey: string) {
    console.log(target.constructor.name + "'s " + propertyKey + " has a default value of " + default_value);
    let newProp = new Property(propertyKey, default_value, description, optional);
    target.addPropertyData(newProp);
  }
}
