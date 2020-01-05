import React, { useState } from 'react';
import { Bugs, IBug } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { Panel } from 'primereact/components/panel/Panel';
import { Dropdown } from 'primereact/dropdown';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import IsLoggedIn from '../../components/helpers/isLoggedIn';
import { MONTH_OPTIONS, TIME_OPTIONS, TRACKED_OPTIONS } from '../../consts';
import { InputText } from 'primereact/inputtext';
import { TRACKED_FILTER_VALUES } from '../../utils/misc';
import MassNatureUpdate from '../../components/massNatureUpdate';
import { Button } from 'primereact/button';

interface Props {
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const createCopy = (test: IBug[]) => test.map((v) => ({ ...v }));
const BugsView = ({ userData }: Props) => {
	const [ locationFilter, setLocationFilter ] = useState('');
	const [ monthFilter, setMonthFilter ] = useState(0);
	const [ timeFilter, setTimeFilter ] = useState(0);
	const [ caughtFilter, setCaughtFilter ] = useState();
	const [ donatedFilter, setDonatedFilter ] = useState();
	const [ showMassNatureUpdate, toggleMassNatureUpdate ] = useState(false);

	let data = createCopy(Bugs);

	if (locationFilter && locationFilter.length > 0) {
		data = data.filter((f) => f.Location.toLowerCase().indexOf(locationFilter.toLowerCase()) >= 0);
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
		<EntityListView data={data} dataType="bug" title="Bugs" modalType={MODAL_OPTIONS.Bug}>
			<Panel header="Additional Filters" toggleable={true}>
				<div className="p-grid p-fluid">
					<div className="p-col-6 p-md-4">
						<h3>Filter by Location</h3>
						<InputText
							className="width-full"
							value={locationFilter}
							onChange={(e) => setLocationFilter(e.currentTarget.value)}
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
						<div className="p-col-6 p-md-4">
							<h3>Toggle Mass Update View</h3>
							<Button
								label={'Toggle Mass Update Picklist'}
								className="width-full"
								onClick={() => toggleMassNatureUpdate(!showMassNatureUpdate)}
							/>
						</div>
					</IsLoggedIn>
				</div>
			</Panel>
			{showMassNatureUpdate && (
				<MassNatureUpdate type="bug" source={createCopy(Bugs)} userData={userData} sourceTitle="Bugs" />
			)}
		</EntityListView>
	);
};

export default connect(mapStateToProps, null)(BugsView);
