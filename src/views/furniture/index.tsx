import React from 'react';
import { Furnitures } from 'ac-nl-sdk';
import { getUserLoggedInStatus, getUserFurniture, getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addCatalogFurnitureRecord, removeCatalogFurnitureRecord } from '../../store/user/actions';
import ListView from '../../components/listView';
import { getRouterQuery } from '../../store/router/selector';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';

interface Props {
	userFurniture?: string[];
	isLoggedIn: boolean;
	addCatalogFurnitureRecord: Function;
	removeCatalogFurnitureRecord: Function;
	query: any;
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	userFurniture: getUserFurniture('Furniture')(state),
	query: getRouterQuery(state),
	userData: getUserData(state)
});

const mapDispatchToProps = {
	addCatalogFurnitureRecord,
	removeCatalogFurnitureRecord
};

const COLUMNS = [
	{
		field: 'Name',
		header: 'Name',
		sortable: true
	},
	{
		field: 'Theme',
		header: 'Theme',
		sortable: true
	},
	{
		field: 'Style',
		header: 'Style',
		sortable: true
	},
	{
		field: 'Color',
		header: 'Color',
		sortable: true
	},
	{
		field: 'Source',
		header: 'Source',
		sortable: true
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
	removeCatalogFurnitureRecord,
	userData
}: Props) => {
	let title = 'List of Furniture';

	return (
		<ListView
			userData={userData}
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
