import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Villagers } from 'ac-nl-sdk';
import { InputText } from 'primereact/inputtext';
import { getGlobalDate } from '../../store/global/selectors';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { IS_MOBILE } from '../../components/helpers/isMobile';
import iVillager from 'ac-nl-sdk/dist/interfaces/iVillager';

const SORT_OPTIONS = [
	{ label: 'Name', value: 'Name' },
	{ label: 'Personality', value: 'Personality' },
	{ label: 'Species', value: 'Species' }
];

interface VillagerProps {
	date: string;
}

const mapStateToProps = (state): VillagerProps => ({
	date: getGlobalDate(state)
});

const Villager = ({ date }: VillagerProps) => {
	const [ layout, setLayout ] = useState('list');
	const [ sortKey, setSortingKey ] = useState('Name');
	const [ filterValue, setFilterValue ] = useState('');

	let dataView: any = React.createRef();
	const VillagerDataViewHeader = (
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
			<div className="p-col-6 p-md-4" style={{ textAlign: 'right' }}>
				<DataViewLayoutOptions layout={layout} onChange={(event) => setLayout(event.value)} />
			</div>
		</div>
	);

	const VillagerDataViewTemplate = (villager: iVillager, layout: string) =>
		villager && <span className="p-col-12 p-md-3">{JSON.stringify(villager)}</span>;

	const villagerData = !(filterValue && filterValue.length >= 3)
		? Villagers
		: Villagers.filter((v) => v.Name.includes(filterValue));

	return (
		<div className="p-grid">
			<div className="card card-w-title p-col-12">
				<h1>Vilalgers</h1>
				<DataView
					ref={(el) => (dataView = el)}
					value={villagerData}
					itemTemplate={VillagerDataViewTemplate}
					layout={layout}
					paginatorPosition={'both'}
					paginator={true}
					rows={IS_MOBILE ? 10 : 20}
					header={VillagerDataViewHeader}
					sortOrder={1}
					sortField={sortKey}
				/>
			</div>
		</div>
	);
};

export default connect(mapStateToProps)(Villager);
