import React from 'react';
import { Songs } from 'ac-nl-sdk';
import { getUserLoggedInStatus, getUserFurniture } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addCatalogFurnitureRecord, removeCatalogFurnitureRecord } from '../../store/user/actions';
import ListView from '../../components/listView';
import { getRouterQuery } from '../../store/router/selector';

interface Props {
	userFurniture?: string[];
	isLoggedIn: boolean;
	addCatalogFurnitureRecord: Function;
	removeCatalogFurnitureRecord: Function;
	query: any;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	userFurniture: getUserFurniture('Songs')(state),
	query: getRouterQuery(state)
});

const mapDispatchToProps = {
	addCatalogFurnitureRecord,
	removeCatalogFurnitureRecord
};

const COLUMNS = [
	{
		field: 'Name',
		header: 'Name',
		sortable: true,
		filter: true
	},
	{
		field: 'Price',
		header: 'Price',
		sortable: false,
		excludeGlobalFilter: true,
		style: { textAlign: 'end' }
	}
];

const SongViewComponent = ({
	isLoggedIn,
	userFurniture,
	addCatalogFurnitureRecord,
	removeCatalogFurnitureRecord
}: Props) => {
	let title = 'List of Flooring';

	return (
		<ListView
			data={Songs}
			userRecords={userFurniture}
			addRecord={(record) => (isLoggedIn ? addCatalogFurnitureRecord('Songs', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogFurnitureRecord('Songs', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const SongView = connect(mapStateToProps, mapDispatchToProps)(SongViewComponent);
export default SongView;
