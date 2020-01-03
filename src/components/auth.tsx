import React from 'react';
import { GoogleLogin, GoogleLogout, GoogleLoginResponse } from 'react-google-login';
import { connect } from 'react-redux';
import { setModal } from '../store/modals/actions';
import { MODAL_OPTIONS } from '../store/modals/reducer';
import { getUserLoggedInStatus } from '../store/user/selectors';
import { setUserData } from '../store/user/actions';
import ApiService from '../service/api';
import { push } from 'connected-react-router';

interface AuthProps {
	isLoggedIn: boolean;
	setModal: Function;
	push: Function;
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
	push,
	setUserData,
	setModal
};

const AUTH_COOKIE = 'ACC_LEAF_LOGIN_RECORD';

class AuthComponent extends React.Component<AuthProps, AuthState> {
	state = {
		error: null
	};

	componentDidMount() {
		const authCookie = document.cookie.split(';').find((c) => c.indexOf(AUTH_COOKIE) >= 0);

		if (authCookie) {
			const authCookieValue = authCookie.split('=')[1];

			return this.fetchData(authCookieValue)
				.then(() => console.log('Cookie Login Successfull'))
				.catch((e) => console.error('Bad Value In Cookie'));
		}
	}

	handleGoogleError({ error }: GoogleError) {
		console.log(error);
		this.setState({ error });
	}

	handleGoogleLogout() {
		document.cookie = `${AUTH_COOKIE}=;expires=${new Date(0)}`;

		this.props.setUserData({
			Email: null,
			GoogleId: null,
			Name: null,
			NewLeaf: {
				TownName: null,
				Villagers: [],
				Museum: {
					Fishes: [],
					DeepSea: [],
					Bugs: [],
					Art: [],
					Fossils: []
				},
				Catalogued: {
					Furniture: {
						Furniture: [],
						Wallpapers: [],
						Flooring: [],
						Paper: [],
						Gyroids: []
					},
					Clothing: [],
					Fishes: [],
					Bugs: [],
					Art: [],
					Fossils: [],
					DeepSea: []
				}
			},
			isLoggedIn: false
		});

		this.props.push('/');
	}

	async handleGoogleLogin({ profileObj, ...rest }: GoogleLoginResponse) {
		const { googleId, email } = profileObj;
		try {
			await this.fetchData(email);

			document.cookie = `${AUTH_COOKIE}=${email}`;
		} catch (e) {
			this.props.setUserData({ Email: email, GoogleId: googleId });
			this.props.setModal(MODAL_OPTIONS.User, email);
		}
	}

	async fetchData(email: string) {
		const data = await ApiService.getPlayer(email);

		if (!data) {
			console.error('No User Found');
			throw new Error('Go');
		}

		this.props.setUserData({
			...data,
			Email: email,
			isLoggedIn: true
		});
	}

	render() {
		const { LoginButton, LogoutButton, isLoggedIn } = this.props;
		const clientId =
			process.env.REACT_APP_GOOGLE_AUTH_SHIT ||
			'520164195929-opv419vm5n0cg5pkodvqbck998qk5e96.apps.googleusercontent.com';
		return (
			<React.Fragment>
				{this.state.error}
				{!isLoggedIn && (
					<GoogleLogin
						clientId={clientId}
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
						clientId={clientId}
						render={LogoutButton}
						buttonText="Logout"
						onLogoutSuccess={() => this.handleGoogleLogout()}
					/>
				)}
			</React.Fragment>
		);
	}
}

export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
export default Auth;
