import { Component } from '@angular/core';
import './datatype/section';
import { Section } from './datatype/datatypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cloud-init-gen';

  sections = [new Section("test")];
}
