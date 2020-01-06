import React from 'react';
import { Clothing } from 'ac-nl-sdk';
import { getUserLoggedInStatus, getUserClothing, getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addCatalogRecord, removeCatalogRecord } from '../../store/user/actions';
import ListView from '../../components/listView';
import { getRouterQuery } from '../../store/router/selector';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';

interface Props {
	userClothing?: string[];
	isLoggedIn: boolean;
	addCatalogRecord: Function;
	removeCatalogRecord: Function;
	query: any;
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state),
	isLoggedIn: getUserLoggedInStatus(state),
	userClothing: getUserClothing(state),
	query: getRouterQuery(state)
});

const mapDispatchToProps = {
	addCatalogRecord,
	removeCatalogRecord
};

const COLUMNS = [
	{
		field: 'Name',
		header: 'Name',
		sortable: true,
		filter: true
	},
	{
		field: 'Look',
		header: 'Look',
		sortable: true,
		filter: true
	},
	{
		field: 'Type',
		header: 'Type',
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

const ClothingViewComponent = ({
	userData,
	isLoggedIn,
	userClothing,
	addCatalogRecord,
	removeCatalogRecord,
	query
}: Props) => {
	let title = 'List of Clothing';
	let data = Clothing;
	let columns = COLUMNS.map((c) => c);

	if (query && query.type) {
		title = `List of ${query.type}`;

		data = Clothing.filter((c) => c.Type === query.type);

		columns = columns.filter((c) => c.field !== 'Type');
	}

	return (
		<ListView
			userData={userData}
			data={data}
			userRecords={userClothing}
			addRecord={(record) => (isLoggedIn ? addCatalogRecord('Clothing', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogRecord('Clothing', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={columns}
			title={title}
			paginator={true}
		/>
	);
};

export const ClothingView = connect(mapStateToProps, mapDispatchToProps)(ClothingViewComponent);
export default ClothingView;
