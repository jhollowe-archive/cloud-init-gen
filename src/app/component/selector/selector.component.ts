import {Component, OnDestroy, OnInit} from '@angular/core';
import {ISection} from '../../section';
import {ListingService, SectionService} from '../../service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-selector',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit, OnDestroy {
	constructor(private sectionService: SectionService, private listingService: ListingService) {}

	sections!: ISection[];
	activeSection?: ISection;
	selectedType!: string;
	types!: string[];
	_cleanup: Subscription[] = [];

	ngOnInit(): void {
		// keep track of all subscriptions so they can be freed on destruction of this component
		this._cleanup = [
			this.sectionService.getSections().subscribe(sections => (this.sections = sections)),
			this.sectionService.getActiveSection().subscribe(section => (this.activeSection = section)),
			// this.sectionService.getAllUnusedPrettyTypes().subscribe(types => this.types = types)
		];
		// DEBUG
		this.types = this.listingService.getAllPrettyTypes();
	}

	ngOnDestroy(): void {
		this._cleanup.forEach(sub => sub.unsubscribe());
	}

	select(event: MouseEvent, s: ISection) {
		// only select if this event is not from an element in the box controls
		if (event.target && !(event.target as Element).closest('.box-controls')) {
			this.sectionService.selectSection(s);
		}
	}

	delete(s: ISection) {
		this.sectionService.removeSection(s);
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
		// TODO update order in sectionService
	}

	add() {
		this.sectionService.createSection(this.selectedType);
		this.selectedType = '';
	}
}
