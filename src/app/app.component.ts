import { Component, Type } from '@angular/core';
import { MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { FinalMessageSection, ISection } from './section';
import { ListingService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
    useValue: <MatTooltipDefaultOptions>{ position: "after" }
  }]
})
export class AppComponent {
  private dynamicSections: Type<ISection>[] = [FinalMessageSection];

  constructor(private listingService: ListingService) {
    // this.dynamicSections.forEach(t => new t(this.listingService));
    this.dynamicSections.forEach(t => this.listingService.registerFromType(t));
  }
}
