import React from 'react';
import { Flooring } from 'ac-nl-sdk';
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
	userFurniture: getUserFurniture('Flooring')(state),
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
		field: 'HHA Themes',
		header: 'HHA Themes',
		sortable: true,
		filter: true
	},
	{
		field: 'Source',
		header: 'Source',
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

const FlooringViewComponent = ({
	isLoggedIn,
	userFurniture,
	addCatalogFurnitureRecord,
	removeCatalogFurnitureRecord
}: Props) => {
	let title = 'List of Flooring';

	return (
		<ListView
			data={Flooring}
			userRecords={userFurniture}
			addRecord={(record) => (isLoggedIn ? addCatalogFurnitureRecord('Flooring', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogFurnitureRecord('Flooring', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const FlooringView = connect(mapStateToProps, mapDispatchToProps)(FlooringViewComponent);
export default FlooringView;
