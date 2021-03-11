import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../datatype/datatypes';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent {

  @Input() sections!: Array<Section>;
  @Input() types!: Array<string>;
  @Output() newSection = new EventEmitter<string>();

  selectedType!: string;

  addSection() {
    console.debug("adding new section of type", this.selectedType);
    this.newSection.emit(this.selectedType);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

}
