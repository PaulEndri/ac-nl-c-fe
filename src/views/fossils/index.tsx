import React from 'react';
import { Fossils } from 'ac-nl-sdk';
import { getUserLoggedInStatus, getUserFossils, getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addMuseumRecord, removeMuseumRecord } from '../../store/user/actions';
import ListView from '../../components/listView';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';

interface Props {
	userFossils?: string[];
	isLoggedIn: boolean;
	addMuseumRecord: Function;
	removeMuseumRecord: Function;
	userData: IPlayer;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	userFossils: getUserFossils(state),
	userData: getUserData(state)
});

const mapDispatchToProps = {
	addMuseumRecord,
	removeMuseumRecord
};

const COLUMNS = [
	{
		field: 'Name',
		header: 'Name',
		sortable: true,
		colSpan: 1,
		filter: true,
		style: { width: '80%', textAlign: 'center' }
	},
	{
		field: 'Price',
		header: 'Price',
		sortable: true,
		colSpan: 1,
		excludeGlobalFilter: true,
		style: { textAlign: 'end' }
	}
];

const FossilsViewComponent = ({ userData, isLoggedIn, userFossils, addMuseumRecord, removeMuseumRecord }: Props) => {
	return (
		<ListView
			userData={userData}
			data={Fossils}
			userRecords={userFossils}
			addRecord={(data) => (isLoggedIn ? addMuseumRecord('Fossils', data) : null)}
			removeRecord={(data) => (isLoggedIn ? removeMuseumRecord('Fossils', data) : null)}
			saveTitle={isLoggedIn ? 'Donated' : null}
			columns={COLUMNS}
			title="List of Fossils"
			paginator={false}
		/>
	);
};

export const FossilsView = connect(mapStateToProps, mapDispatchToProps)(FossilsViewComponent);
export default FossilsView;
