import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { getGlobalDate } from '../../store/global/selectors';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Panel } from 'primereact/components/panel/Panel';
import { setModal } from '../../store/modals/actions';
import VillagerIcon from '../villagerIcon';
import { IVillager, IItem } from 'ac-nl-sdk';
import NatureIcon from '../natureIcon';

const SORT_OPTIONS = [
	{ label: 'Name', value: 'Name' },
	{ label: 'Personality', value: 'Personality' },
	{ label: 'Species', value: 'Species' }
];

interface EntityListProps {
	data: (IItem | IVillager)[];
	dataType: string;
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

const EntityList = ({ data, dataType, title, setModal }: EntityListProps) => {
	const [ sortKey, setSortingKey ] = useState('Name');
	const [ filterValue, setFilterValue ] = useState('');

	const EntityListDataViewHeader = (
		<div className="p-grid">
			<div className="p-col-12 p-md-4" style={{ textAlign: 'left' }}>
				<Dropdown
					options={SORT_OPTIONS}
					value={sortKey}
					placeholder="Sort By"
					onChange={(e) => setSortingKey(e.value)}
				/>
			</div>
			<div className="p-col-6 p-md-4">
				<InputText
					placeholder="Search by Name"
					onKeyUp={(event) => setFilterValue(event.currentTarget.value)}
				/>
			</div>
		</div>
	);

	const ItemDataViewTemplate = (data: IItem) =>
		data && (
			<span
				className="p-col-4 p-md-1"
				onClick={() => setModal(dataType, data.Name)}
				style={{
					margin: 'auto',
					display: 'block',
					textAlign: 'center',
					paddingTop: '16px'
				}}
			>
				<NatureIcon className="acc-selectable" Type={'fish'} Size="Regular" Name={data.Name} />
			</span>
		);

	const VillagerDataViewTemplate = (data: IVillager) =>
		data && (
			<span className="p-col-6 p-md-2" onClick={() => setModal(dataType, data.Name)}>
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

	const entityData = !(filterValue && filterValue.length >= 1)
		? data.map((d) => ({ ...d }))
		: data.filter((v) => v.Name.toLowerCase().includes(filterValue.toLowerCase()));

	return (
		<div className="p-grid">
			<div className="card card-w-title p-col-12">
				<h1>{title}</h1>
				<DataView
					value={entityData}
					itemTemplate={EntityListDataViewTemplate}
					header={EntityListDataViewHeader}
					sortOrder={1}
					sortField={sortKey}
				/>
			</div>
		</div>
	);
};

const EntityListView = connect(mapStateToProps, mapDispatchToProps)(EntityList);

export default EntityListView;
