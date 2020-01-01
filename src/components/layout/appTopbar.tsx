import React from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import IsMobile from '../helpers/isMobile';
import IsDesktop from '../helpers/isDesktop';

import GoogleLogin from 'react-google-login';
const MENU_ITEMS = [
	{ label: 'Log In', icon: 'pi pi-power-off' },
	{ label: 'Register', icon: 'pi pi-user-plus' },
	{ label: 'About & Support', icon: 'pi pi-question' }
];

interface AppTopbarProps {
	setMenuState: Function;
}
const responseGoogle = (response) => {
	console.log(response);
};
const AppTopbar = ({ setMenuState }: AppTopbarProps) => {
	let menuRef: any = React.createRef();

	return (
		<div className="layout-topbar">
			<div className="topbar-menu">
				<div className="topbar">
					<IsMobile>
						<Button icon="fas fa-2x fa-bars" onClick={() => setMenuState()} />
					</IsMobile>
					<div className="acnl-logo">
						<img style={{ height: '40px' }} src="/assets/leaf2.png" />
					</div>
					<h1 className="topbar-title">AC:NL Companion</h1>
					<div className="topbar-icons" style={{ marginTop: '5px' }}>
						<IsMobile>
							<Menu model={MENU_ITEMS} popup={true} ref={(el) => (menuRef = el)} />
							<Button icon="fas fa-2x fa-ellipsis-v" onClick={(e) => menuRef.toggle(e)} />
						</IsMobile>
						<IsDesktop>
							<GoogleLogin
								clientId="520164195929-3k4ime2o05tt9r003f01tiscl2ovger1.apps.googleusercontent.com"
								render={(renderProps) => (
									<Button
										label="Log In"
										icon="pi pi-power-off"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									/>
								)}
								buttonText="Login"
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={'single_host_origin'}
							/>
							<Button label="About & Support" icon="pi pi-question" />
						</IsDesktop>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppTopbar;
