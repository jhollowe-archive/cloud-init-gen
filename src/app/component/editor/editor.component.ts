import {Component, ComponentFactoryResolver, OnInit, Type, ViewChild} from '@angular/core';
import {ISection, Section} from 'src/app/section';
import {ISectionComponent} from 'src/app/section/component/interface.component';
import {SectionService} from 'src/app/service';
import {EditorDirective} from './editor.directive';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
	private _section: ISection | undefined;
	private _component!: Type<ISectionComponent>;

	@ViewChild(EditorDirective, {static: true}) editorHost!: EditorDirective;

	set section(s: ISection | undefined) {
		this._section = s;
		if (s) {
			this._component = s.component;
			// TODO if current section has changes, ask for save/discard
			this.loadComponent();
		}
	}
	get section(): ISection | undefined {
		return this._section;
	}

	constructor(private sectionService: SectionService, private componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnInit(): void {
		this.sectionService.getActiveSection().subscribe(section => (this.section = section));
	}

	// dynamically load in the section's component
	loadComponent() {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this._component);

		const viewContainerRef = this.editorHost.viewContainerRef;
		viewContainerRef.clear();

		const componentRef = viewContainerRef.createComponent<ISectionComponent>(componentFactory);

		if (this._section) {
			componentRef.instance.section = this._section;
		}
	}
}
