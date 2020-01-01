import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { connect } from 'react-redux';
import { getGlobalDate } from '../../store/global/selectors';
import { setGlobalTimeAction } from '../../store/global/actions';
import { InputSwitch } from 'primereact/inputswitch';
import { IS_MOBILE } from '../helpers/isMobile';

interface AppBreadcrumbProps {
	date: string;
	setDate: Function;
}

const mapStateToProps = (state) => ({
	date: getGlobalDate(state)
});

const mapDispatchToProps = {
	setDate: setGlobalTimeAction
};

const AppBreadcrumb = ({ date, setDate }: AppBreadcrumbProps) => {
	const [ showTime, setShowTime ] = useState(false);

	return (
		<div className="layout-breadcrumb">
			<span style={{ textAlign: 'end' }}>
				<span className="layout-breadcrumb-date-label" style={{ display: IS_MOBILE ? 'none' : 'inline' }}>
					Select Your Date
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
