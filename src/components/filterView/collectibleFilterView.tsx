import FilterableView from '.';
import { IFurniture } from 'ac-nl-sdk';

interface ICollectable extends IFurniture {
	Collected?: any;
	Type?: string;
	Look?: string;
}

export abstract class CollectibleFilterView extends FilterableView<ICollectable> {
	processFilter(data, key, value) {
		switch (key) {
			case 'Name':
				return data.filter((m) => this.filterString(m.Name, value));
			case 'Theme':
				return data.filter((m) => this.filterString(m.Theme, value));
			case 'Style':
				return data.filter((m) => this.filterString(m.Style, value));
			case 'Color':
				return data.filter((m) => this.filterString(m.Color, value));
			case 'Source':
				return data.filter((m) => this.filterString(m.Source, value));
			case 'Look':
				return data.filter((m) => this.filterString(m.Look, value));
			case 'Type':
				return data.filter((m) => this.filterString(m.Type, value));
		}
	}
}

export default CollectibleFilterView;
