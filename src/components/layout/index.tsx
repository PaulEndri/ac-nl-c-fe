import React from 'react';
import AppTopbar from './appTopbar';
import AppSidebar from './appSidebar';
import AppBreadcrumb from './appBreadcrumb';
import { connect } from 'react-redux';
import { getGlobalMenu } from '../../store/global/selectors';
import classNames from 'classnames';
import { IS_MOBILE } from '../helpers/isMobile';
import { SetGlobalMenuAction } from '../../store/global/actions';
import { push } from 'connected-react-router';

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
	setMenuState: SetGlobalMenuAction
};

const Layout: React.FC<LayoutProps> = ({ children, menuState, setMenuState, push }) => (
	<div className={classNames('layout-wrapper layout-static', { 'layout-mobile-active': IS_MOBILE && menuState })}>
		<div>
			<AppTopbar setMenuState={() => setMenuState(!menuState)} />
			<AppSidebar
				changePath={(path) => {
					if (path && path.length > 0) {
						push(path);
					}
				}}
			/>
			<div className="layout-content">
				<AppBreadcrumb />
				<div className="layout-content-container">{children}</div>
			</div>
		</div>
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
