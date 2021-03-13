import { Component, ComponentFactoryResolver, EventEmitter, Input, Output, Type, ViewChild } from '@angular/core';
import { Section, ISectionComponent } from '../sections';
import { EditorDirective } from './editor.directive';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.scss']
})
export class SectionEditorComponent {
  private _section: Section | undefined;
  private _component!: Type<ISectionComponent>;
  get component(): Type<ISectionComponent> { return this._component }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  @ViewChild(EditorDirective, { static: true }) editorHost!: EditorDirective;
  @Output() saveSection = new EventEmitter<Section>()
  @Input()
  set section(s: Section | undefined) {
    this._section = s;
    if (s) {
      this._component = s.component;
      // TODO if current section has changes, ask for save/discard
      this.loadComponent()
    }
  }
  get section(): Section | undefined {
    return this._section;
  }


  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this._component);

    const viewContainerRef = this.editorHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ISectionComponent>(componentFactory);

    if (this._section) {
      componentRef.instance.section = this._section;
    }
    // componentRef.instance.data = this.editorHost.data;

  }
}
