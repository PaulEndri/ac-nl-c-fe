import React, { useState } from 'react';
import { DeepSea, IDeepSea } from 'ac-nl-sdk';
import EntityListView from '../../components/entityListView';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { Panel } from 'primereact/components/panel/Panel';
import { Dropdown } from 'primereact/dropdown';
import { MONTH_OPTIONS, TIME_OPTIONS, TRACKED_OPTIONS } from '../../consts';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import IsLoggedIn from '../../components/helpers/isLoggedIn';
import MassNatureUpdate from '../../components/massNatureUpdate';
import { Button } from 'primereact/button';
import NatureFilterView from '../../components/filterView/natureFilterView';

interface Props {
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const createCopy = (test: IDeepSea[]) => test.map((v) => ({ ...v }));

const DeepSeaView = ({ userData }: Props) => {
	const [ showMassNatureUpdate, toggleMassNatureUpdate ] = useState(false);

	let data = createCopy(DeepSea);

	return (
		<NatureFilterView filters={[ 'Months', 'Times', 'Caught', 'Donated' ]} userData={userData} data={data}>
			{(state, data, update) => (
				<EntityListView
					data={data}
					dataType="deepsea"
					title="Deep Sea Creatures"
					modalType={MODAL_OPTIONS.DeepSea}
				>
					<Panel header="Additional Filters" toggleable={true}>
						<div className="p-grid p-fluid">
							<div className="p-col-6">
								<h3>Filter by Month</h3>
								<Dropdown
									className="width-full"
									value={state.filterValues.Months}
									options={MONTH_OPTIONS}
									onChange={(e) => update('Months', e.value)}
									showClear={true}
								/>
							</div>
							<div className="p-col-6">
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
							type="deepsea"
							source={createCopy(DeepSea)}
							userData={userData}
							sourceTitle="Deep Sea Creatures"
						/>
					)}
				</EntityListView>
			)}
		</NatureFilterView>
	);
};

export default connect(mapStateToProps, null)(DeepSeaView);
