import { Component, OnInit } from '@angular/core';
import { ISection, Section } from '../../section';
import { ListingService, SectionService } from '../../service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  sections!: ISection[];
  activeSection?: ISection;
  selectedType!: string;
  types!: string[];

  constructor(private sectionService: SectionService, private listingService: ListingService) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe(sections => this.sections = sections);
    this.sectionService.getActiveSection().subscribe(section => this.activeSection = section);
    this.sectionService.getAllUnusedTypes().subscribe(types => this.types = types);
  }

  select(event: MouseEvent, s: ISection) {
    // only select if this event is not from an element in the box controls
    if (event.target && !((event.target as Element).closest('.box-controls'))) {
      this.sectionService.selectSection(s);
    }
  }

  delete(s: ISection) {
    this.sectionService.removeSection(s);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    // TODO update order in sectionService
  }

  add() {
    this.sectionService.createSection(this.selectedType);
    this.selectedType = '';
  }

}
