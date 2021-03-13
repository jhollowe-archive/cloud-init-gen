import { Component } from '@angular/core';
import { Section, UsersSection } from './datatype/datatypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'cloud-init-gen';

  sections = [new Section("test", ["all"]), new Section("test2", ["asdf"])];
  types = ["users", "groups", "apt"]; // TODO somehow dynamically pull types of all available sections

  addNewSection(type: string) {
    // TODO create a section of the appropriate type
    let section: Section;
    if (type == "users") {
      section = new UsersSection();
    }
    else {
      section = new Section(type, ["all"]);
    }
    this.sections.push(section);
    this.openSection(section);
  }

  openSection(s: Section) {
    // TODO give the section editor this section
    console.log("opening editor for section", s);

    // TODO check for changes a nd prompt to save pending editor changes
  }
}
