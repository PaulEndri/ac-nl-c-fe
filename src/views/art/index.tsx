import React from 'react';
import { Art } from 'ac-nl-sdk';
import { getUserArt, getUserLoggedInStatus, getUserData } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addMuseumRecord, removeMuseumRecord } from '../../store/user/actions';
import ListView from '../../components/listView';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';

interface Props {
	isLoggedIn: boolean;
	userArt?: string[];
	userData: IPlayer;
	addMuseumRecord: Function;
	removeMuseumRecord: Function;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	userArt: getUserArt(state),
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
		filter: true
	},
	{
		field: 'Fake',
		header: 'Fake Tell',
		sortable: true,
		excludeGlobalFilter: true
	}
];
const ArtViewComponent = ({ userArt, userData, addMuseumRecord, removeMuseumRecord, isLoggedIn }: Props) => {
	return (
		<ListView
			userData={userData}
			data={Art}
			userRecords={userArt}
			addRecord={(data) => (isLoggedIn ? addMuseumRecord('Art', data) : null)}
			removeRecord={(data) => (isLoggedIn ? removeMuseumRecord('Art', data) : null)}
			saveTitle={isLoggedIn ? 'Donated' : null}
			columns={COLUMNS}
			title="List of Art Pieces"
			paginator={false}
		/>
	);
};

export const ArtView = connect(mapStateToProps, mapDispatchToProps)(ArtViewComponent);
export default ArtView;
