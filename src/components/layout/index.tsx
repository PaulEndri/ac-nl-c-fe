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
import { AppMenu } from './appMenu';
import ClickOutside from '../helpers/clickOutside';

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
				{ label: 'My Villagers', command: () => push('/villagers/town'), requiresLogin: true }
			]
		},
		{
			label: 'Nature',
			items: [
				{ label: 'Fishes', command: () => push('/fishes') },
				{ label: 'Bugs', command: () => push('/bugs') }
			]
		},
		{
			label: 'Museum',
			items: [
				{ label: 'Fossils', command: () => push('/fossils') },
				{ label: 'Art', command: () => push('/art') }
			]
		},
		{
			label: 'Clothing',
			items: [
				{ label: 'Tops', command: () => push('/clothing?type=Tops') },
				{ label: 'Bottoms', command: () => push('/clothing?type=Bottoms') },
				{ label: 'Headwear', command: () => push('/clothing?type=Hats') },
				{ label: 'Shoes', command: () => push('/clothing?type=Footwear') },
				{ label: 'Dresses', command: () => push('/clothing?type=Dresses') },
				{ label: 'Umbrellas', command: () => push('/clothing?type=Umbrellas') },
				{ label: 'Accessories', command: () => push('/clothing?type=Accessories') },
				{ label: 'View all', command: () => push('/clothing') }
			]
		},
		{
			label: 'Furniture & More',
			items: [
				{ label: 'Furniture', command: () => push('/furniture') },
				{ label: 'Wallpaper', command: () => push('/wallpaper') },
				{ label: 'Flooring', command: () => push('/flooring') },
				{ label: 'Gyroids', command: () => push('/gyroids') },
				{ label: 'Paper', command: () => push('/paper') }
			]
		}
	];

	return (
		<div className={classNames('layout-wrapper layout-static', { 'layout-mobile-active': IS_MOBILE && menuState })}>
			<div>
				<AppTopbar setMenuState={() => setMenuState(!menuState)} />
				<ClickOutside clickOutside={() => (IS_MOBILE && menuState ? setMenuState(false) : null)}>
					<AppMenu model={menuData} push={push} />
				</ClickOutside>
				<div className="layout-content">
					<div className="layout-overlay" />
					<AppBreadcrumb />
					<div className="layout-content-container">{children}</div>
				</div>
			</div>
			<Modals />
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
