import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Menu } from 'primereact/menu';

const MENU_DATA = [
	{
		label: 'Home',
		icon: 'fa fa-fw fa-dashboard',
		to: '/'
	},
	{
		label: 'Villagers',
		icon: 'fa fas fa-fish',
		items: [
			{
				label: 'All Villagers'
			}
		]
	},
	{
		label: 'Fishes',
		icon: 'pi pi-fw pi-plus',
		Href: '/fish'
	},
	{
		label: 'Bugs',
		icon: 'pi pi-fw pi-plus',
		Href: '/bug'
	},
	{
		label: 'Fossils',
		icon: 'pi pi-fw pi-plus',
		Href: '/fossil'
	},
	{
		label: 'Clothing',
		icon: 'pi pi-fw pi-plus',
		Href: '/clothing'
	}
];

const AppSidebar = () => {
	return (
		<Sidebar
			visible={true}
			modal={false}
			onHide={() => {}}
			className="ui-sidebar-lg layout-menu-container"
			showCloseIcon={false}
		>
			<div className="layout-menu-content">
				<Menu model={MENU_DATA} className="layout-menu layout-main-menu" />
			</div>
		</Sidebar>
	);
};

export default AppSidebar;
