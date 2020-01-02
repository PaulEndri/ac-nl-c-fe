import React from 'react';
import { Button } from 'primereact/button';
import IsMobile from '../helpers/isMobile';
import IsDesktop from '../helpers/isDesktop';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

interface AppTopbarProps {
	setMenuState: Function;
	push: Function;
}
const responseGoogle = (response?) => {
	console.log(response);
};
const AppTopbarComponent = ({ setMenuState, push }: AppTopbarProps) => {
	const logoClick = () => push('/');

	return (
		<div className="layout-topbar">
			<div className="topbar-menu">
				<div className="topbar">
					<IsMobile>
						<Button icon="fas fa-2x fa-bars" onClick={() => setMenuState()} />
					</IsMobile>
					<IsDesktop>
						<div className="acnl-logo" onClick={logoClick}>
							<img style={{ height: '40px' }} src="/assets/leaf2.png" />
						</div>
					</IsDesktop>
					<h1 className="topbar-title">AC:NL Companion</h1>
					<div className="topbar-icons" style={{ marginTop: '5px' }}>
						<IsDesktop>
							<GoogleLogin
								clientId="520164195929-cg68r9jpv9u7b33p3dn6rp2kju6fb9lo.apps.googleusercontent.com"
								render={(renderProps) => (
									<Button
										label="Log In"
										icon="pi pi-power-off"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									/>
								)}
								buttonText="test"
								theme="dark"
								scope="email"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={'single_host_origin'}
							/>
							<GoogleLogout
								clientId="520164195929-cg68r9jpv9u7b33p3dn6rp2kju6fb9lo.apps.googleusercontent.com"
								render={(renderProps) => (
									<Button
										label="Log Out"
										icon="pi pi-power-off"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									/>
								)}
								buttonText="Login"
								onLogoutSuccess={responseGoogle}
							/>
							<Button label="About & Support" icon="pi pi-question" />
						</IsDesktop>
					</div>
					<IsMobile>
						<div className="acnl-logo" onClick={logoClick}>
							<img style={{ height: '40px' }} src="/assets/leaf2.png" />
						</div>
					</IsMobile>
				</div>
			</div>
		</div>
	);
};

export const AppTopbar = connect(null, { push })(AppTopbarComponent);
export default AppTopbar;
