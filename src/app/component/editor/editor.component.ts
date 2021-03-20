import { Component, OnInit } from '@angular/core';
import { ISection } from 'src/app/section';
import { SectionService } from 'src/app/service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  section!: ISection | undefined;

  constructor(private sectionService: SectionService) {
    this.sectionService.getActiveSection().subscribe(section => this.section = section);
  }

  ngOnInit(): void {
  }

}
