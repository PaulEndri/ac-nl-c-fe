import React from 'react';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import Town from '../../components/town';
import { RouteComponentProps } from 'react-router-dom';
import ApiService from '../../service/api';
import { ProgressSpinner } from 'primereact/progressspinner';

interface RouteProps {
	id: string;
}

interface State {
	loading: boolean;
	data: IPlayer;
}

export class TownView extends React.Component<RouteComponentProps<RouteProps>, State> {
	state = {
		loading: true,
		data: null
	};

	componentDidMount() {
		this.loadPlayerData();
	}

	async loadPlayerData() {
		try {
			const data = await ApiService.getTown(this.props.match.params.id);

			this.setState({
				loading: false,
				data
			});
		} catch (e) {
			alert('Something went terribly wrong, please contact u/paulendri');
		}
	}

	render() {
		const { data, loading } = this.state;

		if (loading) {
			return (
				<div className="p-grid">
					<div className="p-col-12 card card-w-title">
						<h1>Asking Isabelle for the Town's Data</h1>
						<ProgressSpinner />
					</div>
				</div>
			);
		}

		return <Town userData={data} disabled={true} setUserData={() => null} />;
	}
}

export default TownView;
