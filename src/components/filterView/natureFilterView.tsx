import FilterableView from '.';
import { INature } from 'ac-nl-sdk';

interface ICatchableNature extends INature {
	Caught?: any;
	Donated?: any;
}

export class NatureFilterView extends FilterableView<ICatchableNature> {
	processFilter(data, key, value) {
		switch (key) {
			case 'Location':
				return data.filter((m) => this.filterString(m.Location, value));
			case 'Months':
				return data.filter((m) => this.filterNumberRange(m.Months, value));
			case 'Times':
				return data.filter((m) => this.filterNumberRange(m.Times, value));
			case 'Caught':
				return this.filterTracker(data, this.props.userData.NewLeaf.Catalogued.Bugs, value);
			case 'Donated':
				return this.filterTracker(data, this.props.userData.NewLeaf.Museum.Bugs, value);
		}
	}
}

export default NatureFilterView;
