import React from 'react';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { TRACKED_FILTER_VALUES } from '../../utils/misc';
import { IItem } from 'ac-nl-sdk';

interface State<T> {
	filterValues: Record<keyof T, string>;
}

interface Props<T> {
	userData?: IPlayer;
	subKey?: string;
	data: T[];
	filters: string[];
	children: (state: State<T>, data: T[], update: (k: keyof (T), value: any) => void) => JSX.Element;
}

export abstract class FilterableView<T> extends React.Component<Props<T>, State<T>> {
	state = {
		filterValues: null
	};

	componentDidMount() {
		const filterValues: any = {};

		this.props.filters.forEach((t) => {
			filterValues[t] = null;
		});

		this.setState({ filterValues });
	}

	updateField(key: keyof T, value: any) {
		const filterValues = {
			...this.state.filterValues,
			[key]: value
		};

		return this.setState({ filterValues });
	}

	filterString(field: string, value: string) {
		return field && field.toLowerCase().indexOf(value.toLowerCase()) >= 0;
	}

	filterNumberRange(field: number[][], value: number) {
		console.log('[test]', field, value);
		return field.some((f) => f.includes(value));
	}

	filterTracker(data: IItem[], field: string[], value: TRACKED_FILTER_VALUES) {
		if (value === TRACKED_FILTER_VALUES.MISSING) {
			return data.filter((f) => !field.includes(f.Name));
		} else if (value === TRACKED_FILTER_VALUES.PRESENT) {
			return data.filter((f) => field.includes(f.Name));
		}
	}

	abstract processFilter(data: T[], key: keyof T, value: any): T[];

	processFilters() {
		const { data, filters } = this.props;
		let localData = data.map((d) => d);

		if (this.state.filterValues) {
			filters.forEach((filter) => {
				const filterValue = this.state.filterValues[filter];

				if (filterValue) {
					localData = this.processFilter(localData, filter as keyof T, filterValue);
				}
			});
		}

		return localData;
	}

	render() {
		const data = this.processFilters();
		const { children } = this.props;
		const state = { ...this.state };

		if (!state.filterValues) {
			state.filterValues = {};
		}

		return children(state, data, (k, v) => this.updateField(k, v));
	}
}

export default FilterableView;
