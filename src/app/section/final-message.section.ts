import {Type} from '@angular/core';
import {DumpOptions} from 'js-yaml';
import {shortUuid} from '../util';
import {Section} from './base.section';
import {FinalMessageComponent} from './component';
import {ISectionComponent} from './component/interface.component';

export class FinalMessageSection extends Section {
	component: Type<ISectionComponent> = FinalMessageComponent;
	prettyType = 'Final Message';
	type = 'cc_final_message';

	private message = '';

	getYaml(verbose?: boolean, opts?: DumpOptions): string {
		return this.dumpYaml({final_message: this.message}, opts);
	}

	constructor() {
		super();
		// DEBUG
		this.message = `Hello from ${shortUuid(this.uuid)}`;
	}
}
