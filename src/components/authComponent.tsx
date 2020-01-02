import React from 'react';
import { GoogleLogin, GoogleLogout, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { connect } from 'react-redux';
import { setModal } from '../store/modals/actions';
import { MODAL_OPTIONS } from '../store/modals/reducer';
import { getUserLoggedInStatus } from '../store/user/selectors';
import { setUserData } from '../store/user/actions';
import ApiService from '../service/api';

interface AuthProps {
	isLoggedIn: boolean;
	setModal: Function;
	setUserData: Function;
	LoginButton: (any) => JSX.Element;
	LogoutButton: (any) => JSX.Element;
}

interface AuthState {
	error?: string;
}
interface GoogleError {
	error: string;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state)
});

const mapDispatchToProps = {
	setUserData,
	setModal
};

class AuthComponent extends React.Component<AuthProps, AuthState> {
	state = {
		error: null
	};

	handleGoogleError({ error }: GoogleError) {
		console.log(error);
		this.setState({ error });
	}

	handleGoogleLogout() {
		this.props.setUserData({
			Email: '',
			GoogleId: '',
			Name: '',
			NewLeaf: null,
			isLoggedIn: false
		});
	}

	async handleGoogleLogin({ profileObj }: GoogleLoginResponse) {
		const { googleId, email } = profileObj;

		try {
			await this.fetchData(googleId, email);
		} catch (e) {
			this.props.setUserData({ Email: email, GoogleId: googleId });
			this.props.setModal(MODAL_OPTIONS.User, email);
		}
	}

	async fetchData(googleId: string, email: string) {
		const data = await ApiService.getPlayer(googleId);

		this.props.setUserData({
			...data,
			isLoggedIn: true
		});
	}

	render() {
		const { LoginButton, LogoutButton, isLoggedIn } = this.props;

		return (
			<React.Fragment>
				{this.state.error}
				{!isLoggedIn && (
					<GoogleLogin
						clientId={
							process.env.GOOGLE_AUTH_SHIT ||
							'520164195929-opv419vm5n0cg5pkodvqbck998qk5e96.apps.googleusercontent.com'
						}
						render={LoginButton}
						buttonText="test"
						scope="email"
						onSuccess={(r: any) => this.handleGoogleLogin(r)}
						onFailure={(e) => this.handleGoogleError(e)}
						cookiePolicy={'single_host_origin'}
					/>
				)}
				{isLoggedIn && (
					<GoogleLogout
						clientId={
							process.env.GOOGLE_AUTH_SHIT ||
							'520164195929-opv419vm5n0cg5pkodvqbck998qk5e96.apps.googleusercontent.com'
						}
						render={LogoutButton}
						buttonText="Logout"
						onLogoutSuccess={() => this.handleGoogleLogout}
					/>
				)}
			</React.Fragment>
		);
	}
}

export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
export default Auth;
