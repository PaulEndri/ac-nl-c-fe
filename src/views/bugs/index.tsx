import React, { useState } from 'react';
import { Bugs, IBug } from 'ac-nl-sdk';
import EntityListView from '../../components/entityListView';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { Panel } from 'primereact/components/panel/Panel';
import { Dropdown } from 'primereact/dropdown';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import IsLoggedIn from '../../components/helpers/isLoggedIn';
import { MONTH_OPTIONS, TIME_OPTIONS, TRACKED_OPTIONS } from '../../consts';
import { InputText } from 'primereact/inputtext';
import MassNatureUpdate from '../../components/massNatureUpdate';
import { Button } from 'primereact/button';
import NatureFilterView from '../../components/filterView/natureFilterView';

interface Props {
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const createCopy = (test: IBug[]) => test.map((v) => ({ ...v }));
const BugsView = ({ userData }: Props) => {
	const [ showMassNatureUpdate, toggleMassNatureUpdate ] = useState(false);

	return (
		<NatureFilterView
			filters={[ 'Location', 'Months', 'Times', 'Caught', 'Donated' ]}
			userData={userData}
			data={Bugs}
		>
			{(state, data, update) => (
				<EntityListView data={data} dataType={'bug'} title={'Bugs'} modalType={MODAL_OPTIONS.Bug}>
					<Panel header="Additional Filters" toggleable={true}>
						<div className="p-grid p-fluid">
							<div className="p-col-6 p-md-4">
								<h3>Filter by Location</h3>
								<InputText
									className="width-full"
									value={state.filterValues.Location}
									onChange={(e) => update('Location', e.currentTarget.value)}
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
						<MassNatureUpdate type="bug" source={createCopy(Bugs)} userData={userData} sourceTitle="Bugs" />
					)}
				</EntityListView>
			)}
		</NatureFilterView>
	);
};

export default connect(mapStateToProps, null)(BugsView);
