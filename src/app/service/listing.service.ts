import { Injectable, Type } from '@angular/core';
import { sectionMapping } from '../datatype';
import { ISection } from '../section';
import { FinalMessageSection } from '../section/final-message.section';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private _map: sectionMapping = {};

  /**
   * creates a mapping of a string to a Type of a section
   *
   * @param typeString the type string of the Section
   * @param classType the actual Type of the Section
   */
  register(typeString: string, classType: Type<ISection>): void {
    this._map[typeString] = classType;
  }

  /**
   * Uses a Type to automatically get the typeString and register the combination
   *
   * @param classType a Type of a Section
   */
  registerFromType(classType: Type<ISection>): void {
    let typeString = (new classType()).type;
    this.register(typeString, classType);
  }

  /**
   * converts a typeString to an actual Type
   *
   * @param typeString the type to look up
   * @returns the true type of the Section
   */
  getType(typeString: string) {
    return this._map[typeString];
  }

  /**
   * Returns a string array of all the registered types of Sections
   *
   * @returns all typeStrings of registered Sections
   */
  getAllTypes(): string[] {
    return Object.keys(this._map);
  }

  constructor() {
    // DEBUG
    this._map["Final Message"] = FinalMessageSection;
  }
}
