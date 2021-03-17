import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private listingService: ListingService) { }

  private _sections: ISection[] = [];
  private _active?: ISection;

  testData = [new FinalMessageSection(this.listingService)];

  /**
   * @returns an observable of all the sections in the store
   */
  getSections(): Observable<ISection[]> {
    return new Observable(observer => { observer.next(this._sections) });
  }

  /**
   * Creates a new, empty Section of `type` to the stored Sections
   * @param type the type string used to select the Section type
   */
  createSection(type: string): void {
    // TODO get type to section mapping from the ListingService
    // TODO create new section and add to section store
    // TODO notify subscribers of change
  }

  /**
   * Adds arbetrary Sections to the section store
   *
   * @param section the section to add
   */
  addSection(section: ISection): void {
    this._sections.push(section);
    // TODO notify subscribers of change
  }

  /**
   * Remove a Section from the Section store
   *
   * @param section section to remove from Section store
   */
  removeSection(section: ISection): void {
    let i = this._sections.indexOf(section);
    this._sections.splice(i, 1);
    // TODO update active section
    // TODO notify subscribers of change
  }

  selectSection(s: ISection | undefined): void {
    // ensure section is in store or is being unset
    if (typeof s == "undefined" || this._sections.includes(s)) {
      this._active = s;
      // TODO notify subscribers of change
    }
  }


  getActiveSection(): Observable<ISection | undefined> {
    // TODO
    return new Observable(observer => { observer.next(this._active) });
  }
}
