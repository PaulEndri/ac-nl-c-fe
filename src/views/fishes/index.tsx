import React, { useState } from 'react';
import { Fishes, IFish } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { MONTHS, FISH_LOCATIONS } from '../../consts';
import { Panel } from 'primereact/components/panel/Panel';
import { Dropdown } from 'primereact/dropdown';
import { formatNumber } from '../../utils/formatNumber';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import IsLoggedIn from '../../components/helpers/isLoggedIn';

interface Props {
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

enum TRACKED_FILTER_VALUES {
	'EMPTY' = 0,
	'PRESENT' = 1,
	'MISSING' = 2
}

const MONTH_OPTIONS = MONTHS.map((m, i) => ({ value: i + 1, label: m }));
const TIME_OPTIONS = new Array(24).fill(1).map((_, i) => ({
	value: i + 1,
	label: formatNumber(i + 1)
}));
const LOCATION_OPTIONS = FISH_LOCATIONS.map((v) => ({ value: v, label: v }));
const TRACKED_OPTIONS = [
	{ label: '', value: TRACKED_FILTER_VALUES.EMPTY },
	{ label: 'Recorded', value: TRACKED_FILTER_VALUES.PRESENT },
	{ label: 'Missing', value: TRACKED_FILTER_VALUES.MISSING }
];

const createCopy = (test: IFish[]) => test.map((v) => ({ ...v }));

const FishesView = ({ userData }: Props) => {
	const [ locationFilter, setLocationFilter ] = useState('');
	const [ monthFilter, setMonthFilter ] = useState(0);
	const [ timeFilter, setTimeFilter ] = useState(0);
	const [ caughtFilter, setCaughtFilter ] = useState();
	const [ donatedFilter, setDonatedFilter ] = useState();

	let data = createCopy(Fishes);

	if (locationFilter && locationFilter.length > 0) {
		data = data.filter((f) => f.Location === locationFilter);
	}

	if (monthFilter) {
		data = data.filter((f) => f.Months.some((m) => m.includes(monthFilter)));
	}

	if (timeFilter) {
		data = data.filter((f) => f.Times.some((t) => t.includes(timeFilter)));
	}

	if (caughtFilter === TRACKED_FILTER_VALUES.MISSING) {
		data = data.filter((f) => !userData.NewLeaf.Catalogued.Fishes.includes(f.Name));
	} else if (caughtFilter === TRACKED_FILTER_VALUES.PRESENT) {
		data = data.filter((f) => userData.NewLeaf.Catalogued.Fishes.includes(f.Name));
	}

	if (donatedFilter === TRACKED_FILTER_VALUES.MISSING) {
		data = data.filter((f) => !userData.NewLeaf.Museum.Fishes.includes(f.Name));
	} else if (donatedFilter === TRACKED_FILTER_VALUES.PRESENT) {
		data = data.filter((f) => userData.NewLeaf.Museum.Fishes.includes(f.Name));
	}

	return (
		<EntityListView data={data} dataType="fish" title="Fishes" modalType={MODAL_OPTIONS.Fish}>
			<Panel header="Additional Filters" toggleable={true}>
				<div className="p-grid p-fluid">
					<div className="p-col-6 p-md-4">
						<h3>Filter by Location</h3>
						<Dropdown
							className="width-full"
							value={locationFilter}
							options={LOCATION_OPTIONS}
							onChange={(e) => setLocationFilter(e.value)}
							showClear={true}
						/>
					</div>
					<div className="p-col-6 p-md-4">
						<h3>Filter by Month</h3>
						<Dropdown
							className="width-full"
							value={monthFilter}
							options={MONTH_OPTIONS}
							onChange={(e) => setMonthFilter(e.value)}
							showClear={true}
						/>
					</div>
					<div className="p-col-6 p-md-4">
						<h3>Filter by Time</h3>
						<Dropdown
							className="width-full"
							value={timeFilter}
							options={TIME_OPTIONS}
							onChange={(e) => setTimeFilter(e.value)}
							showClear={true}
						/>
					</div>
					<IsLoggedIn>
						<div className="p-col-6">
							<h3>Filter by Caught Status</h3>
							<Dropdown
								className="width-full"
								value={caughtFilter}
								options={TRACKED_OPTIONS}
								onChange={(e) => setCaughtFilter(e.value)}
								showClear={true}
							/>
						</div>
						<div className="p-col-6">
							<h3>Filter by Donated Status</h3>
							<Dropdown
								className="width-full"
								value={donatedFilter}
								options={TRACKED_OPTIONS}
								onChange={(e) => setDonatedFilter(e.value)}
								showClear={true}
							/>
						</div>
					</IsLoggedIn>
				</div>
			</Panel>
		</EntityListView>
	);
};

export default connect(mapStateToProps, null)(FishesView);
