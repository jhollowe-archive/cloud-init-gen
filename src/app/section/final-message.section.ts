import { Type } from "@angular/core";
import { ListingService } from "../service/listing.service";
import { Section } from "./base.section";
import { FinalMessageComponent } from "./component/final-message/final-message.component";
import { ISectionComponent } from "./component/interface.component";

export const type: string = "final-message";

export class FinalMessageSection extends Section {
  component: Type<ISectionComponent> = FinalMessageComponent;

  type = type;
  private message = "";


  getYaml(verbose?: boolean): string {
    throw new Error("Method not implemented.");
  }

  constructor(private listingService: ListingService) {
    super();
    // this.listingService.register(this.type, FinalMessageSection);

    // DEBUG
    this.message = `Hello from ${this.uuid}`
  }
}
