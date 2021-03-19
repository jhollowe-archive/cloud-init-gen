import { templateJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { FinalMessageSection } from '../section/final-message.section';
import { ISection } from '../section/interface.section';
import { ListingService } from './listing.service';



/**
 * This service provides a central store of sections and which section is currently active.
 */
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private listingService: ListingService) {
    // default example data
    this._sections = [new FinalMessageSection(this.listingService), new FinalMessageSection(this.listingService)];
    this._active = new Emitter(this._sections[0]);
  }

  private _sections: ISection[] = [];
  private _active!: Emitter<ISection | undefined>;


  /**
   * @returns an observable of all the sections in the store
   */
  getSections(): Observable<ISection[]> {
    return of(this._sections);
  }

  /**
   * Creates a new, empty Section of `type` to the stored Sections
   * @param type the type string used to select the Section type
   */
  createSection(type: string): void {
    let serviceType = this.listingService.getType(type);
    if (serviceType) {
      let section = new serviceType();
      this._sections.push(section);
      this._active.emit(section);
    }
  }

  /**
   * Adds arbitrary Sections to the section store
   *
   * @param section the section to add
   */
  addSection(section: ISection): void {
    this._sections.push(section);
    this._active.emit(section);
  }

  /**
   * Remove a Section from the Section store
   *
   * @param section section to remove from Section store
   */
  removeSection(section: ISection): void {
    let i = this._sections.indexOf(section);
    this._sections.splice(i, 1);
    this._active.emit(this._sections[0]);
  }

  selectSection(s: ISection | undefined): void {
    // ensure section is in store or is being unset
    if (typeof s == "undefined" || this._sections.includes(s)) {
      console.log("selecting: ", s?.uuid);
      this._active.emit(s);
    }
  }


  getActiveSection(): Observable<ISection | undefined> {
    return this._active.get();
  }
}

class Emitter<T>{
  private subs: Array<Subscriber<T>> = [];
  private obs: Observable<T>;
  private lastVal: T;

  constructor(initialValue: T) {
    this.obs = new Observable(observer => {
      this.subs.push(observer);
      observer.next(initialValue);
      return () => { this.subs.splice(this.subs.indexOf(observer), 1) }
    });
    this.lastVal = initialValue;
  }

  get() {
    return this.obs;
  }

  emit(value: T) {
    for (let sub of this.subs) {
      sub.next(value);
    }
    this.lastVal = value;
  }

  getLast(): T {
    return this.lastVal;
  }
}
