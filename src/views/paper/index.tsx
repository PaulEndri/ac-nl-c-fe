import React from 'react';
import { Papers } from 'ac-nl-sdk';
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
	userFurniture: getUserFurniture('Paper')(state),
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

const PaperViewComponent = ({
	isLoggedIn,
	userFurniture,
	addCatalogFurnitureRecord,
	userData,
	removeCatalogFurnitureRecord
}: Props) => {
	let title = 'List of Papers';

	return (
		<ListView
			userData={userData}
			data={Papers}
			userRecords={userFurniture}
			addRecord={(record) => (isLoggedIn ? addCatalogFurnitureRecord('Paper', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogFurnitureRecord('Paper', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const PaperView = connect(mapStateToProps, mapDispatchToProps)(PaperViewComponent);
export default PaperView;
