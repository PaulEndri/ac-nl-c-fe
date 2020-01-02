import React from 'react';
import { Art } from 'ac-nl-sdk';
import { getUserArt, getUserLoggedInStatus } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addMuseumRecord, removeMuseumRecord } from '../../store/user/actions';
import ListView from '../../components/listView';

interface Props {
	isLoggedIn: boolean;
	userArt?: string[];
	addMuseumRecord: Function;
	removeMuseumRecord: Function;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	userArt: getUserArt(state)
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
const ArtViewComponent = ({ userArt, addMuseumRecord, removeMuseumRecord, isLoggedIn }: Props) => {
	return (
		<ListView
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
