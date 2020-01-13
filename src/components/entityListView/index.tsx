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
import { InputSwitch } from 'primereact/inputswitch';

interface EntityListProps {
	data: (IItem | IVillager)[];
	dataType: 'fish' | 'bug' | 'deepsea' | 'Villager';
	modalType: MODAL_OPTIONS;
	date: string;
	setModal: Function;
	title: string;
	children?: any; // This shouldn't be needed, but Typescript is bitching because Entity List is being wrapped in a connect
}

const mapStateToProps = (state) => ({
	date: getGlobalDate(state)
});

const mapDispatchToProps = {
	setModal
};

const EntityList: React.FC<EntityListProps> = ({ date, data, dataType, title, modalType, setModal, children }) => {
	const [ filterValue, setFilterValue ] = useState('');
	const [ showingAll, toggleAll ] = useState(true);

	const EntityListDataViewHeader = (
		<div className="p-grid p-fluid">
			{dataType === 'Villager' ? null : (
				<div className="p-col-6 p-md-3 text-align-end">
					<div className="acc-flex">
						<span className="p-col-8">{showingAll ? 'Show Current' : 'Show All'}</span>
						<InputSwitch
							checked={!showingAll}
							onChange={() => toggleAll(!showingAll)}
							style={{ marginTop: '10px' }}
						/>
					</div>
				</div>
			)}
			<div className="p-col-6">
				<InputText
					className="width-full"
					placeholder="Search by Name"
					onKeyUp={(event) => setFilterValue(event.currentTarget.value)}
				/>
			</div>
		</div>
	);

	const ItemDataViewTemplate = (data: IItem) =>
		data &&
		dataType !== 'Villager' && (
			<span
				className="p-col-4 p-md-1"
				onClick={() => setModal(modalType, data.Name)}
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
			<span className="p-col-6 p-md-2" onClick={() => setModal(modalType, data.Name)}>
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
	}

	entityData = !(filterValue && filterValue.length >= 1)
		? entityData.map((d) => ({ ...d }))
		: entityData.filter((v) => v.Name.toLowerCase().includes(filterValue.toLowerCase()));

	return (
		<div className="p-grid">
			<div className="card card-w-title p-col-12">
				<h1>{title}</h1>
				{children}
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
