import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, Type, ViewChild } from '@angular/core';
import { Section, ISectionComponent, SectionComponent } from '../sections';
import { EditorDirective } from './editor.directive';

@Component({
  selector: 'app-section-editor',
  templateUrl: './section-editor.component.html',
  styleUrls: ['./section-editor.component.scss']
})
export class SectionEditorComponent implements OnInit {
  private _section: Section | undefined;
  private _component!: Type<ISectionComponent>;
  get component(): Type<ISectionComponent> { return this._component }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    // this._component = SectionComponent;
    // console.log(this.editorHost);
    // this.loadComponent();
  }

  @ViewChild(EditorDirective, { static: true }) editorHost!: EditorDirective;
  // @ViewChild(EditorDirective) editorHost!: EditorDirective;
  @Output() saveSection = new EventEmitter<Section>()
  @Input()
  set section(s: Section | undefined) {
    console.log("editor's section has changed to [" + s?.uuid + "]")
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

    console.log("editorHost:", this.editorHost);

    const viewContainerRef = this.editorHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ISectionComponent>(componentFactory);

    if (this._section) {
      componentRef.instance.section = this._section;
    }
    // componentRef.instance.data = this.editorHost.data;

  }
}
