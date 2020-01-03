import React from 'react';
import AppSubMenu from './appSubmenu';
import { ScrollPanel } from 'primereact/scrollpanel';
import IsMobile from '../helpers/isMobile';
import Auth from '../auth';
import IsLoggedIn from '../helpers/isLoggedIn';
import { LightingSwitch } from '../lightingSwitch';

interface Props {
	model: any[];
	push: Function;
}

export const AppMenu = ({ model, push }: Props) => (
	<div className="layout-menu-container">
		<ScrollPanel style={{ height: '100%' }}>
			<div className="layout-menu-content">
				<IsMobile>
					<div className="layout-menu-title">Account</div>
					<ul className="layout-menu layout-mainmenu clearfix">
						<IsLoggedIn>
							<li>
								<a
									href="#/"
									style={{ width: '100%' }}
									className="logout-button"
									onClick={() => push('/account')}
								>
									<i className="fas fa-user" />
									<span>My Account</span>
								</a>
							</li>
						</IsLoggedIn>
						<Auth
							LoginButton={(renderProps) => (
								<li>
									<a
										href="#/"
										style={{ width: '100%' }}
										className="logout-button"
										onClick={renderProps.disabled ? null : renderProps.onClick}
									>
										<i className="fas fa-power-off" />
										<span>Log In</span>
									</a>
								</li>
							)}
							LogoutButton={(renderProps) => (
								<li>
									<a
										href="#/"
										style={{ width: '100%' }}
										className="logout-button"
										onClick={renderProps.onClick}
									>
										<i className="fas fa-power-off" />
										<span>Logout</span>
									</a>
								</li>
							)}
						/>
					</ul>
				</IsMobile>

				<div className="layout-menu-title">Companion Data</div>
				<AppSubMenu
					items={model}
					className="layout-menu layout-main-menu clearfix"
					menuActive={false}
					root={true}
					parentMenuItemActive={true}
				/>

				<IsMobile>
					<div className="layout-menu-footer">
						<div className="layout-menu-footer-title">Lighting</div>
						<div className="layout-menu-footer-content">
							<LightingSwitch />
						</div>
					</div>
				</IsMobile>
			</div>
		</ScrollPanel>
	</div>
);
