import React from 'react';
import { getUserData } from '../../store/user/selectors';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { connect } from 'react-redux';

import IsLoggedIn from '../../components/helpers/isLoggedIn';
import { setUserData } from '../../store/user/actions';
import Town from '../../components/town';

interface Props {
	userData: IPlayer;
	setUserData: Function;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const mapDispatchToProps = {
	setUserData
};

const DashboardViewComponent = ({ userData, setUserData }: Props) => {
	return (
		<IsLoggedIn>
			<Town userData={userData} setUserData={setUserData} disabled={false} />
		</IsLoggedIn>
	);
};

const DashboardView = connect(mapStateToProps, mapDispatchToProps)(DashboardViewComponent);
export default DashboardView;
