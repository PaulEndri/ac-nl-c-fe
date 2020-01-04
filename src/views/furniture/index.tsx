import React from 'react';
import { Furnitures } from 'ac-nl-sdk';
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
	userFurniture: getUserFurniture('Furniture')(state),
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
		field: 'Theme',
		header: 'Theme',
		sortable: true,
		filter: true
	},
	{
		field: 'Style',
		header: 'Style',
		sortable: true,
		filter: true
	},
	{
		field: 'Color',
		header: 'Color',
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

const FurnitureViewComponent = ({
	isLoggedIn,
	userFurniture,
	addCatalogFurnitureRecord,
	removeCatalogFurnitureRecord
}: Props) => {
	let title = 'List of Furniture';

	return (
		<ListView
			data={Furnitures}
			userRecords={userFurniture}
			addRecord={(record) => (isLoggedIn ? addCatalogFurnitureRecord('Furniture', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogFurnitureRecord('Furniture', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const FurnitureView = connect(mapStateToProps, mapDispatchToProps)(FurnitureViewComponent);
export default FurnitureView;
