import {Injectable, Type} from '@angular/core';
import {sectionMapping} from '../datatype';
import {ISection} from '../section';

@Injectable({
	providedIn: 'root',
})
export class ListingService {
	private _map: sectionMapping = {};

	/**
	 * creates a mapping of a string to a Type of a section
	 *
	 * @param typeString the type string of the Section
	 * @param classType the actual Type of the Section
	 * @param prettyType the human-readable name of the type of section
	 */
	register(typeString: string, prettyType: string, classType: Type<ISection>): void {
		this._map[typeString] = [prettyType, classType];
	}

	/**
	 * Uses a Type to automatically register the Type
	 *
	 * Automatically gets the typeString and prettyType from the Type (by instantiating it)
	 *
	 * @param classType a Type of a Section
	 */
	registerFromType(classType: Type<ISection>): void {
		let obj = new classType();
		this.register(obj.type, obj.prettyType, classType);
	}

	/**
	 * converts a typeString to an actual Type
	 *
	 * @param typeString the type to look up
	 * @returns the true type of the Section
	 */
	getType(typeString: string): Type<ISection> {
		return this._map[typeString][1];
	}

	/**
	 * converts a typeString to an prettyType string
	 *
	 * @param typeString the type to look up
	 * @returns the human-readable name of the type of section
	 */
	getPrettyType(typeString: string): string {
		return this._map[typeString][0];
	}

	/**
	 * Returns a string array of all the registered types of Sections
	 *
	 * @returns all typeStrings of registered Sections
	 */
	getAllTypes(): string[] {
		return Object.keys(this._map);
	}

	/**
	 * Returns a string array of the prettyTypes of all the registered types of Sections
	 *
	 * @returns all prettyTypes of registered Sections
	 */
	getAllPrettyTypes(): string[] {
		return this.getAllTypes().map(type => this._map[type][0]);
	}
}
