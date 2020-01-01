import React, { FunctionComponent } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';

interface IMenu_Data {
	label: string;
	disableCheck?: boolean;
	icon?: string;
	path?: string;
	items?: IMenu_Data[];
}

const MENU_DATA: IMenu_Data[] = [
	{
		label: 'Dashboard',
		icon: 'pi pi-fw pi-plus',
		items: [ { label: 'Home', path: '/' }, { label: 'My Town', path: '/town' } ]
	},
	{
		label: 'Villagers',
		icon: 'pi pi-fw pi-plus',
		items: [
			{ label: 'All Villagers', path: '/villagers' },
			{ label: 'My Villagers', path: '/villagers/town', disableCheck: true }
		]
	},
	{
		label: 'Fishes',
		icon: 'pi pi-fw pi-plus',
		items: [
			{ label: 'All Villagers', path: '/fishes' },
			{ label: 'My Villagers', path: '/villagers/town', disableCheck: true }
		]
	},
	{
		label: 'Bugs',
		icon: 'pi pi-fw pi-plus',
		items: [
			{ label: 'All Villagers', path: '/villagers' },
			{ label: 'My Villagers', path: '/villagers/town', disableCheck: true }
		]
	},
	{
		label: 'Fossils',
		icon: 'pi pi-fw pi-plus',
		items: [
			{ label: 'All Villagers', path: '/villagers' },
			{ label: 'My Villagers', path: '/villagers/town', disableCheck: true }
		]
	},
	{
		label: 'Clothing',
		icon: 'pi pi-fw pi-plus',
		items: [
			{ label: 'All Villagers', path: '/villagers' },
			{ label: 'My Villagers', path: '/villagers/town', disableCheck: true }
		]
	}
];

interface AppSidebarProps {
	changePath: Function;
}

const AppSidebar = ({ changePath }: AppSidebarProps) => {
	const transformMenuData = ({ label, icon, items, disableCheck, path }: IMenu_Data) => {
		return {
			label,
			icon: icon || 'fa fas fa-fish',
			disabled: disableCheck,
			items: items && items.map(transformMenuData),
			command: () => changePath(path)
		};
	};
	return (
		<Sidebar visible={true} modal={false} onHide={() => {}} className="layout-menu-container" showCloseIcon={false}>
			<div className="layout-menu-content">
				<div className="layout-menu-title" style={{ borderBottom: '#243447' }}>
					MENU
				</div>
				<PanelMenu model={MENU_DATA.map(transformMenuData)} />
			</div>
		</Sidebar>
	);
};

export default AppSidebar;
