import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../datatype/datatypes';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.scss']
})
export class SectionEditorComponent {

  @Input() section!: Section | undefined;
  @Output() saveSection = new EventEmitter<Section>()


}
