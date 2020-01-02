import React from 'react';
import AppSubMenu from './appSubmenu';
import { ScrollPanel } from 'primereact/scrollpanel';

interface Props {
	model: any[];
}

export const AppMenu = ({ model }: Props) => (
	<div className="layout-menu-container">
		<ScrollPanel style={{ height: '100%' }}>
			<div className="layout-menu-content">
				<div className="layout-menu-title">MENU</div>
				<AppSubMenu
					items={model}
					className="layout-menu layout-main-menu clearfix"
					menuActive={false}
					root={true}
					parentMenuItemActive={true}
				/>
			</div>
		</ScrollPanel>
	</div>
);
