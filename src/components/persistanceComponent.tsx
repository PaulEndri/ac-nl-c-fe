import React from 'react';
import { getUserData } from '../store/user/selectors';
import { connect } from 'react-redux';
import { IUserState } from '../store/user/reducer';
import { setGlobalSavePending } from '../store/global/actions';
import ApiService from '../service/api';

interface Props {
	userData: IUserState;
	setGlobalSavePending: Function;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const mapDispatchToProps = {
	setGlobalSavePending
};

const INTERVAL = 5 * 1000;
class PersistanceComponent extends React.Component<Props> {
	queueTimeout = null;

	componentDidUpdate(previous) {
		if (!previous.userData || !previous.userData.Email) {
			return null;
		}

		if (this.queueTimeout) {
			console.log('[Clearing Old Save Queue]');
			clearTimeout(this.queueTimeout);
		}

		this.queueTimeout = setTimeout(() => this.updateUserData(this.props), INTERVAL);
		this.props.setGlobalSavePending(true);
	}

	async updateUserData(props: Props) {
		const { userData: { Email, GoogleId, Name, NewLeaf } } = props;

		console.log('[Starting Queued Save]');
		try {
			clearTimeout(this.queueTimeout);
			this.queueTimeout = null;

			await ApiService.updatePlayer(Email, {
				Email,
				GoogleId,
				Name,
				NewLeaf
			});

			console.log('[Saved Successfully]');
			this.props.setGlobalSavePending(false);
		} catch (e) {
			this.props.setGlobalSavePending(false);

			console.log(e);
		}
	}
	render() {
		return null;
	}
}

export const Persistance = connect(mapStateToProps, mapDispatchToProps)(PersistanceComponent);

export default Persistance;
