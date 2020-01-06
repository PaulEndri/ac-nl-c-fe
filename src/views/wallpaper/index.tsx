import React from 'react';
import { Wallpapers } from 'ac-nl-sdk';
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
	userFurniture: getUserFurniture('Wallpapers')(state),
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

const WallpaperViewComponent = ({
	isLoggedIn,
	userFurniture,
	userData,
	addCatalogFurnitureRecord,
	removeCatalogFurnitureRecord
}: Props) => {
	let title = 'List of Wallpaper';

	return (
		<ListView
			userData={userData}
			data={Wallpapers}
			userRecords={userFurniture}
			addRecord={(record) => (isLoggedIn ? addCatalogFurnitureRecord('Wallpapers', record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeCatalogFurnitureRecord('Wallpapers', record) : null)}
			saveTitle={isLoggedIn ? 'Collected' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const WallpaperView = connect(mapStateToProps, mapDispatchToProps)(WallpaperViewComponent);
export default WallpaperView;
