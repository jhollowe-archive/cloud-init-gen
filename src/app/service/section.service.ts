import {Injectable} from '@angular/core';
import {Observable, of, Subscriber} from 'rxjs';
import {map} from 'rxjs/operators';
import {FinalMessageSection} from '../section/final-message.section';
import {ISection} from '../section/interface.section';
import {ListingService} from './listing.service';

/**
 * This service provides a central store of sections and which section is currently active.
 */
@Injectable({
	providedIn: 'root',
})
export class SectionService {
	// default example data
	private startingSections = [new FinalMessageSection(), new FinalMessageSection()];

	constructor(private listingService: ListingService) {
		this.sectionEmitter = new Emitter(this.startingSections);
		this._sections = this.sectionEmitter.getLast();
		this.active = new Emitter(this.sections[0]);
	}

	private get sections(): ISection[] {
		return this._sections;
	}
	private set sections(value: ISection[]) {
		this._sections = value;
		this.sectionEmitter.emit(value);
	}

	private _sections: ISection[] = [];
	private sectionEmitter!: Emitter<ISection[]>;
	private active!: Emitter<ISection | undefined>;

	/**
	 * @returns an observable of all the sections in the store
	 */
	getSections(): Observable<ISection[]> {
		return this.sectionEmitter.get();
	}

	/**
	 * Creates a new, empty Section of `type` to the stored Sections
	 * @param type the type string used to select the Section type
	 */
	createSection(type: string): void {
		let serviceType = this.listingService.getType(type);
		if (serviceType) {
			let section = new serviceType();
			// can't use in-place function with accessors (push)
			this.sections = [...this.sections, section];
			this.active.emit(section);
		}
	}

	/**
	 * Adds arbitrary Sections to the section store
	 *
	 * @param section the section to add
	 */
	addSection(section: ISection): void {
		// can't use in-place function with accessors (push)
		this.sections = [...this.sections, section];
		this.active.emit(section);
	}

	/**
	 * Remove a Section from the Section store
	 *
	 * @param section section to remove from Section store
	 */
	removeSection(section: ISection): void {
		// can't use in-place function with accessors (splice)
		this.sections = this.sections.filter(val => val != section);
		this.active.emit(this.sections[0]);
	}

	/**
	 * Sets a Section as the active section
	 * @param s section to set
	 */
	selectSection(s: ISection | undefined): void {
		// ensure section is in store or is being unset
		if (typeof s == 'undefined' || this.sections.includes(s)) {
			this.active.emit(s);
		}
	}

	/**
	 * Get the active Section
	 *
	 * @returns an observable of the active section
	 */
	getActiveSection(): Observable<ISection | undefined> {
		return this.active.get();
	}

	//============= ListingService-ish functions =============
	// Due to circular dependencies, the following functions,
	//  while they would organizationally fit better in
	//  ListingService, are placed here
	//=========================================================

	/**
	 * Get only the types of sections that do not already exist
	 * @returns all types that have are not instantiated
	 */
	getAllUnusedTypes(): Observable<string[]> {
		return this.getSections().pipe(
			map(sections => {
				let usedTypes = sections.map(section => section.type);
				return this.listingService.getAllTypes().filter(val => !usedTypes.includes(val));
			})
		);
	}

	/**
	 * Get only the prettyTypes of sections that do not already exist
	 * @returns all prettyTypes that have are not instantiated
	 */
	getAllUnusedPrettyTypes(): Observable<string[]> {
		return this.getSections().pipe(
			map(sections => {
				let usedTypes = sections.map(section => section.prettyType);
				return this.listingService.getAllPrettyTypes().filter(val => !usedTypes.includes(val));
			})
		);
	}
}

// TODO convert to Subject? (https://rxjs-dev.firebaseapp.com/guide/subject)
class Emitter<T> {
	private subs: Array<Subscriber<T>> = [];
	private obs: Observable<T>;
	private lastVal: T;

	constructor(initialValue: T) {
		this.obs = new Observable(observer => {
			this.subs.push(observer);
			observer.next(initialValue);
			return () => {
				this.subs.splice(this.subs.indexOf(observer), 1);
			};
		});
		this.lastVal = initialValue;
	}

	get() {
		return this.obs;
	}

	emit(value: T) {
		this.subs.forEach(sub => sub.next(value));
		this.lastVal = value;
	}

	getLast(): T {
		return this.lastVal;
	}
}
