import { Component } from '@angular/core';
import { Section, UsersSection } from './datatype/datatypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  sections = [new Section("test", ["all"]), new UsersSection()];
  types = ["users", "groups", "apt"]; // TODO somehow dynamically pull types of all available sections
  editingSection: Section | undefined = this.sections[0];

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
    this.openSection(section.getUuid());
  }

  openSection(s: string) {
    this.editingSection = this.sections.find(value => value.getUuid() == s);

    // TODO check for changes and prompt to save pending editor changes
  }

  saveSection(s: Section) {
    // TODO update section in sections array (use uuid to target)
    console.log("saving...", s)
  }

  deleteSection(s: string) {
    // remove element
    this.sections = this.sections.filter(val => val.getUuid() != s);

    // readjust the currently editing section
    if (this.editingSection?.getUuid() == s) {
      // TODO instead of just going to the first section, go to max(0,deleteIndex-1)
      this.editingSection = this.sections.length > 0 ? this.sections[0] : undefined;
    }
  }
}
