import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { getGlobalDate } from '../../store/global/selectors';
import { DataView } from 'primereact/dataview';
import { Panel } from 'primereact/components/panel/Panel';
import { setModal } from '../../store/modals/actions';
import VillagerIcon from '../villagerIcon';
import { IVillager, IItem, CalenderService, IFish, IBug, IDeepSea } from 'ac-nl-sdk';
import NatureIcon from '../natureIcon';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import classNames from 'classnames';
import { InputSwitch } from 'primereact/inputswitch';

interface EntityListProps {
	data: (IItem | IVillager)[];
	dataType: 'fish' | 'bug' | 'deepsea' | 'Villager';
	date: string;
	setModal: Function;
	title: string;
}

const mapStateToProps = (state) => ({
	date: getGlobalDate(state)
});

const mapDispatchToProps = {
	setModal
};

const EntityList = ({ date, data, dataType, title, setModal }: EntityListProps) => {
	const [ filterValue, setFilterValue ] = useState('');
	const [ locationValue, setLocationValue ] = useState('');
	const [ showingAll, toggleAll ] = useState(true);

	let modalOption: MODAL_OPTIONS;

	switch (dataType) {
		case 'bug':
			modalOption = MODAL_OPTIONS.Bug;
			break;
		case 'fish':
			modalOption = MODAL_OPTIONS.Fish;
			break;
		case 'deepsea':
			modalOption = MODAL_OPTIONS.DeepSea;
			break;
		default:
			modalOption = MODAL_OPTIONS.Villager;
			break;
	}

	const EntityListDataViewHeader = (
		<div className="p-grid">
			{dataType === 'Villager' ? null : (
				<div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
					<InputText
						placeholder="Filter by Location"
						onKeyUp={(event) => setLocationValue(event.currentTarget.value)}
					/>
				</div>
			)}
			<div className={classNames('p-col-12', { 'p-md-4': dataType !== 'Villager' })}>
				<InputText
					placeholder="Search by Name"
					onKeyUp={(event) => setFilterValue(event.currentTarget.value)}
				/>
			</div>
			{dataType === 'Villager' ? null : (
				<div className="p-col-12 p-md-4" style={{ textAlign: 'right' }}>
					<div style={{ display: 'flex' }}>
						<span className="p-col-10">{showingAll ? 'Show Current' : 'Show All'}</span>
						<InputSwitch
							checked={!showingAll}
							onChange={() => toggleAll(!showingAll)}
							style={{ marginTop: '10px' }}
						/>
					</div>
				</div>
			)}
		</div>
	);

	const ItemDataViewTemplate = (data: IItem) =>
		data &&
		dataType !== 'Villager' && (
			<span
				className="p-col-4 p-md-1"
				onClick={() => setModal(modalOption, data.Name)}
				style={{
					margin: 'auto',
					display: 'block',
					textAlign: 'center',
					paddingTop: '16px'
				}}
			>
				<NatureIcon className="acc-selectable entity-card" Type={dataType} Size="Regular" Name={data.Name} />
			</span>
		);

	const VillagerDataViewTemplate = (data: IVillager) =>
		data && (
			<span className="p-col-6 p-md-2" onClick={() => setModal(modalOption, data.Name)}>
				<Panel
					className="p-grid acc-selectable"
					header={data.Name}
					style={{
						margin: 'auto',
						display: 'block',
						marginLeft: '10px',
						textAlign: 'center',
						backgroundColor: 'darkslategray'
					}}
				>
					<VillagerIcon className="p-col-12" villager={data} size="small" />
				</Panel>
			</span>
		);

	const EntityListDataViewTemplate = dataType === 'Villager' ? VillagerDataViewTemplate : ItemDataViewTemplate;

	let entityData = data;

	if (!showingAll && dataType !== 'Villager') {
		const service = new CalenderService(date);

		switch (dataType) {
			case 'fish':
				entityData = service.getFishes(entityData as IFish[]);
				break;
			case 'bug':
				entityData = service.getBugs(entityData as IBug[]);
				break;
			case 'deepsea':
				entityData = service.getDeepSea(entityData as IDeepSea[]);
				break;
		}
		// do some shit to turn entityData into limited by Time and Month;
	}

	entityData = !(filterValue && filterValue.length >= 1)
		? entityData.map((d) => ({ ...d }))
		: entityData.filter((v) => v.Name.toLowerCase().includes(filterValue.toLowerCase()));

	entityData = !(locationValue && locationValue.length >= 1)
		? entityData
		: entityData.filter((v: any) => v.Location.toLowerCase().includes(locationValue.toLowerCase()));
	return (
		<div className="p-grid">
			<div className="card card-w-title p-col-12">
				<h1>{title}</h1>
				<DataView
					value={entityData}
					itemTemplate={EntityListDataViewTemplate}
					header={EntityListDataViewHeader}
					sortOrder={1}
					sortField="Name"
				/>
			</div>
		</div>
	);
};

const EntityListView = connect(mapStateToProps, mapDispatchToProps)(EntityList);

export default EntityListView;
