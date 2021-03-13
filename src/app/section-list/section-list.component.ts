import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../sections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss']
})
export class SectionListComponent {

  @Output() newSection = new EventEmitter<string>();
  @Output() selectSection = new EventEmitter<string>();
  @Output() deleteSection = new EventEmitter<string>();
  @Input() sections!: Array<Section>;
  @Input() types!: Array<string>;
  editingUuid!: string;

  @Input()
  set editingSection(s: Section | undefined) {
    this.editingUuid = (s) ? s.uuid : "";
  }

  selectedType!: string;

  add() {
    this.newSection.emit(this.selectedType);
  }

  select(event: MouseEvent, uuid: string) {
    // only select if this event is not from an element in the box controls
    if (event.target && !((event.target as Element).closest(".box-controls"))) {
      this.selectSection.emit(uuid)
    }
  }

  delete(uuid: string) {
    this.deleteSection.emit(uuid)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

}
