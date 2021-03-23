import {ISection} from '../interface.section';

export interface ISectionComponent {
	/**
	 * The section this component will edit
	 *
	 * This sections should ALWAYS have Type\<this\> as the `component` property on itself
	 * (aka this section should always match this component)
	 */
	section: ISection;
}
