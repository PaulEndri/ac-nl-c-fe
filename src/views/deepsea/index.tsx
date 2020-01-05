import React, { useState } from 'react';
import { DeepSea, IDeepSea } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { Panel } from 'primereact/components/panel/Panel';
import { Dropdown } from 'primereact/dropdown';
import { MONTH_OPTIONS, TIME_OPTIONS, TRACKED_OPTIONS } from '../../consts';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import IsLoggedIn from '../../components/helpers/isLoggedIn';
import { TRACKED_FILTER_VALUES } from '../../utils/misc';
import MassNatureUpdate from '../../components/massNatureUpdate';
import { Button } from 'primereact/button';

interface Props {
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const createCopy = (test: IDeepSea[]) => test.map((v) => ({ ...v }));

const DeepSeaView = ({ userData }: Props) => {
	const [ monthFilter, setMonthFilter ] = useState(0);
	const [ timeFilter, setTimeFilter ] = useState(0);
	const [ caughtFilter, setCaughtFilter ] = useState();
	const [ donatedFilter, setDonatedFilter ] = useState();
	const [ showMassNatureUpdate, toggleMassNatureUpdate ] = useState(false);

	let data = createCopy(DeepSea);

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
		<EntityListView data={data} dataType="deepsea" title="Deep Sea Creatures" modalType={MODAL_OPTIONS.DeepSea}>
			<Panel header="Additional Filters" toggleable={true}>
				<div className="p-grid p-fluid">
					<div className="p-col-6">
						<h3>Filter by Month</h3>
						<Dropdown
							className="width-full"
							value={monthFilter}
							options={MONTH_OPTIONS}
							onChange={(e) => setMonthFilter(e.value)}
							showClear={true}
						/>
					</div>
					<div className="p-col-6">
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
				<MassNatureUpdate
					type="deepsea"
					source={createCopy(DeepSea)}
					userData={userData}
					sourceTitle="Deep Sea Creatures"
				/>
			)}
		</EntityListView>
	);
};

export default connect(mapStateToProps, null)(DeepSeaView);
