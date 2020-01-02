import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { connect } from 'react-redux';
import { getGlobalDate, getGlobalSaving } from '../../store/global/selectors';
import { setGlobalTimeAction } from '../../store/global/actions';
import { InputSwitch } from 'primereact/inputswitch';
import { IS_MOBILE } from '../helpers/isMobile';
import IsDesktop from '../helpers/isDesktop';

import { getUserLoggedInStatus, getUserCore } from '../../store/user/selectors';

interface AppBreadcrumbProps {
	date: string;
	isLoggedIn: boolean;
	saving: boolean;
	setDate: Function;
	userData?: {
		Name: string;
		Email: string;
		TownName: string;
	};
}

const mapStateToProps = (state) => ({
	date: getGlobalDate(state),
	saving: getGlobalSaving(state),
	isLoggedIn: getUserLoggedInStatus(state),
	userData: getUserCore(state)
});

const mapDispatchToProps = {
	setDate: setGlobalTimeAction
};

const AppBreadcrumb = ({ date, setDate, isLoggedIn, userData, saving }: AppBreadcrumbProps) => {
	const [ showTime, setShowTime ] = useState(false);

	const showWelcomeMessage = isLoggedIn && userData && !IS_MOBILE && !saving;
	const showSavePending = saving;
	return (
		<div className="layout-breadcrumb">
			{showWelcomeMessage && (
				<span className="margin-auto">
					Welcome back {userData.Name} to {userData.TownName}
				</span>
			)}
			{showSavePending && (
				<span className="margin-auto">
					<i className="fas fa-sync fa-spin" style={{ marginRight: IS_MOBILE ? '4px' : '8px' }} />
					Saving<IsDesktop> Updates to {userData.TownName}</IsDesktop>
				</span>
			)}
			<span style={{ textAlign: isLoggedIn ? 'start' : 'end' }}>
				<span className="layout-breadcrumb-date-label" style={{ display: IS_MOBILE ? 'none' : 'inline' }}>
					It is currently
				</span>

				<Calendar
					monthNavigator={true}
					showTime={showTime}
					className="padding-top-s"
					value={new Date(date)}
					showIcon={true}
					touchUI={IS_MOBILE}
					onChange={(e) => {
						console.log(e.value.toString());
						setDate(e.value.toString());
					}}
				/>
			</span>
			<span style={{ margin: 'auto', marginLeft: '30px' }}>
				<InputSwitch checked={showTime} onChange={(e) => setShowTime(!showTime)} />
				<span style={{ marginLeft: '8px' }}>Show Time</span>
			</span>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBreadcrumb);
