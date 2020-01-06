import React, { useState } from 'react';
import { Fishes, IFish } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { Panel } from 'primereact/components/panel/Panel';
import { Dropdown } from 'primereact/dropdown';
import { FISH_LOCATIONS, MONTH_OPTIONS, TIME_OPTIONS, TRACKED_OPTIONS } from '../../consts';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import IsLoggedIn from '../../components/helpers/isLoggedIn';
import { Button } from 'primereact/button';
import MassNatureUpdate from '../../components/massNatureUpdate';
import NatureFilterView from '../../components/filterView/natureFilterView';

interface Props {
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const LOCATION_OPTIONS = FISH_LOCATIONS.map((v) => ({ value: v, label: v }));
const createCopy = (test: IFish[]) => test.map((v) => ({ ...v }));

const FishesView = ({ userData }: Props) => {
	const [ showMassNatureUpdate, toggleMassNatureUpdate ] = useState(false);

	let data = createCopy(Fishes);

	return (
		<NatureFilterView
			filters={[ 'Location', 'Months', 'Times', 'Caught', 'Donated' ]}
			userData={userData}
			data={data}
		>
			{(state, data, update) => (
				<EntityListView data={data} dataType="fish" title="Fishes" modalType={MODAL_OPTIONS.Fish}>
					<Panel header="Additional Filters" toggleable={true}>
						<div className="p-grid p-fluid">
							<div className="p-col-6 p-md-4">
								<h3>Filter by Location</h3>
								<Dropdown
									className="width-full"
									value={state.filterValues.Location}
									options={LOCATION_OPTIONS}
									onChange={(e) => update('Location', e.value)}
									showClear={true}
								/>
							</div>
							<div className="p-col-6 p-md-4">
								<h3>Filter by Month</h3>
								<Dropdown
									className="width-full"
									value={state.filterValues.Months}
									options={MONTH_OPTIONS}
									onChange={(e) => update('Months', e.value)}
									showClear={true}
								/>
							</div>
							<div className="p-col-6 p-md-4">
								<h3>Filter by Time</h3>
								<Dropdown
									className="width-full"
									value={state.filterValues.Times}
									options={TIME_OPTIONS}
									onChange={(e) => update('Times', e.value)}
									showClear={true}
								/>
							</div>
							<IsLoggedIn>
								<div className="p-col-6">
									<h3>Filter by Caught Status</h3>
									<Dropdown
										className="width-full"
										value={state.filterValues.Caught}
										options={TRACKED_OPTIONS}
										onChange={(e) => update('Caught', e.value)}
										showClear={true}
									/>
								</div>
								<div className="p-col-6">
									<h3>Filter by Donated Status</h3>
									<Dropdown
										className="width-full"
										value={state.filterValues.Donated}
										options={TRACKED_OPTIONS}
										onChange={(e) => update('Donated', e.value)}
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
							type="fish"
							source={createCopy(Fishes)}
							userData={userData}
							sourceTitle="Fishes"
						/>
					)}
				</EntityListView>
			)}
		</NatureFilterView>
	);
};

export default connect(mapStateToProps, null)(FishesView);
