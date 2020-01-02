import React from 'react';
import { Button } from 'primereact/button';
import IsMobile from '../helpers/isMobile';
import IsDesktop from '../helpers/isDesktop';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Auth from '../authComponent';
import { LightingSwitch } from '../lightingSwitch';

interface AppTopbarProps {
	setMenuState: Function;
	push: Function;
}

const mapDispatchToProps = {
	push
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
							<img alt="logo" style={{ height: '40px' }} src="/assets/leaf2.png" />
						</div>
					</IsDesktop>
					<h1 className="topbar-title">AC:NL Companion</h1>
					<div className="topbar-icons" style={{ marginTop: '5px' }}>
						<IsDesktop>
							<Auth
								LoginButton={(renderProps) => (
									<Button
										label="Log In"
										icon="pi pi-power-off"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									/>
								)}
								LogoutButton={(renderProps) => (
									<Button
										label="Log Out"
										icon="pi pi-power-off"
										className="logout-button"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									/>
								)}
							/>
							<LightingSwitch />
							<Button label="About & Support" icon="pi pi-question" />
						</IsDesktop>
					</div>
					<IsMobile>
						<div className="acnl-logo" onClick={logoClick}>
							<img alt="logo" style={{ height: '40px' }} src="/assets/leaf2.png" />
						</div>
					</IsMobile>
				</div>
			</div>
		</div>
	);
};

export const AppTopbar = connect(null, mapDispatchToProps)(AppTopbarComponent);
export default AppTopbar;
