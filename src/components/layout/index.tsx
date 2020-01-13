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
import { getUserLoggedInStatus } from '../../store/user/selectors';
import AppFooter from './appFooter';
import { createMenu } from '../../utils/menu';

interface LayoutProps {
	menuState: boolean;
	pushCommand: Function;
	setMenuState: Function;
	isLoggedIn: Function;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	menuState: getGlobalMenu(state)
});

const mapDispatchToProps = {
	pushCommand: push,
	setMenuState: setGlobalMenuAction
};

const Layout: React.FC<LayoutProps> = ({ children, menuState, isLoggedIn, setMenuState, pushCommand }) => {
	const push = (path) => {
		pushCommand(path);

		if (IS_MOBILE) {
			setMenuState(false);
		}
	};
	let menuData = createMenu(push);

	if (isLoggedIn) {
		menuData[0].command = null;
		menuData[0].items = [
			{ label: 'Home', command: () => push('/') },
			{
				label: 'My Town',
				command: () => push('/town')
			}
		];
	}

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
					<AppFooter />
				</div>
			</div>
			<Modals />
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
