import { Component, OnInit } from '@angular/core';
import { SectionComponent } from '../base.component';

@Component({
  selector: 'app-final-message',
  templateUrl: './final-message.component.html',
  styleUrls: ['./final-message.component.scss']
})
export class FinalMessageComponent extends SectionComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
