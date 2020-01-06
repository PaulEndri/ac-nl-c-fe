import React from 'react';
import { Gyroids } from 'ac-nl-sdk';
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
	userFurniture: getUserFurniture('Gyroids')(state),
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
	}
];

const GyroidViewComponent = ({
	isLoggedIn,
	userFurniture,
	addCatalogFurnitureRecord,
	userData,
	removeCatalogFurnitureRecord
}: Props) => {
	let title = 'List of Gyroids';

	return (
		<ListView
			userData={userData}
			data={Gyroids}
			userRecords={userFurniture}
			addRecord={(record) => (isLoggedIn ? addCatalogFurnitureRecord('Gyroids', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogFurnitureRecord('Gyroids', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const GyroidView = connect(mapStateToProps, mapDispatchToProps)(GyroidViewComponent);
export default GyroidView;
