import React from 'react';
import { Songs } from 'ac-nl-sdk';
import { getUserLoggedInStatus, getUserCatalogByType } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addCatalogRecord, removeCatalogRecord } from '../../store/user/actions';
import ListView from '../../components/listView';
import { getRouterQuery } from '../../store/router/selector';

interface Props {
	userFurniture?: string[];
	isLoggedIn: boolean;
	addCatalogRecord: Function;
	removeCatalogRecord: Function;
	query: any;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	userFurniture: getUserCatalogByType('Songs')(state),
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
		field: 'Price',
		header: 'Price',
		sortable: false,
		excludeGlobalFilter: true,
		style: { textAlign: 'end' }
	}
];

const SongViewComponent = ({ isLoggedIn, userFurniture, addCatalogRecord, removeCatalogRecord }: Props) => {
	let title = 'List of Flooring';

	return (
		<ListView
			data={Songs}
			userRecords={userFurniture}
			addRecord={(record) => (isLoggedIn ? addCatalogRecord('Songs', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogRecord('Songs', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const SongView = connect(mapStateToProps, mapDispatchToProps)(SongViewComponent);
export default SongView;
