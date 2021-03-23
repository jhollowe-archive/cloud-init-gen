import { Type } from "@angular/core";
import { dump, DumpOptions } from "js-yaml";
import { ListingService } from "../service/listing.service";
import { shortUuid } from "../util";
import { Section } from "./base.section";
import { FinalMessageComponent } from "./component";
import { ISectionComponent } from "./component/interface.component";


export class FinalMessageSection extends Section {
  component: Type<ISectionComponent> = FinalMessageComponent;

  type = "Final Message";
  private message = "";


  getYaml(verbose?: boolean, opts?: DumpOptions): string {
    return dump({ final_message: this.message }, opts);
  }

  constructor(private listingService: ListingService) {
    super();
    // this.listingService.register(this.type, FinalMessageSection);

    // DEBUG
    this.message = `Hello from ${shortUuid(this.uuid)}`
  }
}
