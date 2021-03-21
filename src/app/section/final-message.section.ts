import { Type } from '@angular/core';
import { dump, DumpOptions } from 'js-yaml';
import { ListingService } from '../service/listing.service';
import { shortUuid } from '../util';
import { Section } from './base.section';
import { FinalMessageComponent } from './component/final-message/final-message.component';
import { ISectionComponent } from './component/interface.component';


export class FinalMessageSection extends Section {
  component: Type<ISectionComponent> = FinalMessageComponent;

  type = 'Final Message';
  private message = '';

  constructor(private listingService: ListingService) {
    super();
    // this.listingService.register(this.type, FinalMessageSection);

    // DEBUG
    this.message = `Hello from ${shortUuid(this.uuid)}`;
  }

  getYaml(verbose?: boolean, opts?: DumpOptions): string {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return dump({ final_message: this.message }, opts);
  }

}
