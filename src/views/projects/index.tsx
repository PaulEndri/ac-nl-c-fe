import React from 'react';
import { Projects } from 'ac-nl-sdk';
import { getUserLoggedInStatus, getUserProjects } from '../../store/user/selectors';
import { connect } from 'react-redux';
import { addUserProjects, removeUserProjects } from '../../store/user/actions';
import ListView from '../../components/listView';

interface Props {
	userProjects?: string[];
	isLoggedIn: boolean;
	addUserProjects: Function;
	removeUserProjects: Function;
	query: any;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	userProjects: getUserProjects(state)
});

const mapDispatchToProps = {
	addUserProjects,
	removeUserProjects
};

const COLUMNS = [
	{
		field: 'Name',
		header: 'Name',
		sortable: true,
		filter: true
	},
	{
		field: 'Size',
		header: 'Size',
		sortable: true,
		filter: true
	},
	{
		field: 'Unlock',
		header: 'Unlock',
		sortable: true,
		filter: true
	},
	{
		field: 'Details',
		header: 'Details',
		sortable: true,
		filter: true
	},
	{
		field: 'ErectionCost',
		header: 'Erection Cost',
		sortable: false,
		excludeGlobalFilter: true,
		style: { textAlign: 'end' }
	},
	{
		field: 'DemolitionCost',
		header: 'Demolition Cost',
		sortable: false,
		excludeGlobalFilter: true,
		style: { textAlign: 'end' }
	}
];

const ProjectsViewComponent = ({ isLoggedIn, userProjects, removeUserProjects, addUserProjects }: Props) => {
	let title = 'List of Public Works';

	return (
		<ListView
			data={Projects}
			userRecords={userProjects}
			addRecord={(record) => (isLoggedIn ? addUserProjects(record) : null)}
			removeRecord={(record) => (isLoggedIn ? removeUserProjects(record) : null)}
			saveTitle={isLoggedIn ? 'Built' : null}
			columns={COLUMNS}
			title={title}
			paginator={true}
		/>
	);
};

export const ProjectsView = connect(mapStateToProps, mapDispatchToProps)(ProjectsViewComponent);
export default ProjectsView;
