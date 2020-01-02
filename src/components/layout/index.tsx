import React from 'react';
import AppTopbar from './appTopbar';
import AppBreadcrumb from './appBreadcrumb';
import { connect } from 'react-redux';
import { getGlobalMenu } from '../../store/global/selectors';
import classNames from 'classnames';
import { IS_MOBILE } from '../helpers/isMobile';
import { setGlobalMenuAction } from '../../store/global/actions';
import { push } from 'connected-react-router';
import Modals from '../modals/';
import { AppMenu } from './deprecated/appMenu';
import ClickOutside from '../helpers/clickOutside';

interface IMenu_Data {
	label: string;
	disableCheck?: boolean;
	icon?: string;
	path?: string;
	items?: IMenu_Data[];
}

interface LayoutProps {
	menuState: boolean;
	push: Function;
	setMenuState: Function;
}

const mapStateToProps = (state) => ({
	menuState: getGlobalMenu(state)
});

const mapDispatchToProps = {
	push,
	setMenuState: setGlobalMenuAction
};

const Layout: React.FC<LayoutProps> = ({ children, menuState, setMenuState, push }) => {
	const menuData: any[] = [
		{
			label: 'Dashboard',
			items: [ { label: 'Home', command: () => push('/') }, { label: 'My Town', command: () => push('/town') } ]
		},
		{
			label: 'Villagers',
			items: [
				{ label: 'All Villagers', command: () => push('/villagers') },
				{ label: 'My Villagers', command: () => push('/villagers'), requiresLogin: true }
			]
		},
		{
			label: 'Fishes',
			items: [
				{ label: 'All Fishes', command: () => push('/fishes') },
				{ label: 'My Fishes', path: '/villagers/town', requiresLogin: true }
			]
		},
		{
			label: 'Bugs',
			items: [
				{ label: 'All Villagers', path: '/villagers' },
				{ label: 'My Villagers', path: '/villagers/town', requiresLogin: true }
			]
		},
		{
			label: 'Fossils',
			items: [
				{ label: 'All Villagers', path: '/villagers' },
				{ label: 'My Villagers', path: '/villagers/town', disableCheck: true }
			]
		},
		{
			label: 'Clothing',
			items: [
				{ label: 'Tops', path: '/villagers' },
				{ label: 'My Villagers', path: '/villagers/town', disableCheck: true }
			]
		}
	];

	return (
		<div className={classNames('layout-wrapper layout-static', { 'layout-mobile-active': IS_MOBILE && menuState })}>
			<div>
				<AppTopbar setMenuState={() => setMenuState(!menuState)} />
				<ClickOutside clickOutside={() => (IS_MOBILE && menuState ? setMenuState(false) : null)}>
					<AppMenu model={menuData} />
				</ClickOutside>
				<div className="layout-content">
					<AppBreadcrumb />
					<div className="layout-content-container">{children}</div>
				</div>
			</div>
			<Modals />
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
