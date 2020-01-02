import React from 'react';
import { getUserLoggedInStatus } from '../../store/user/selectors';
import { connect } from 'react-redux';

interface Props {
	isLoggedIn: boolean;
}

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state)
});

const IsLoggedInComponent: React.FC<Props> = ({ isLoggedIn, children }) =>
	isLoggedIn ? <React.Fragment>{children}</React.Fragment> : null;

export const IsLoggedIn = connect(mapStateToProps, null)(IsLoggedInComponent);

export default IsLoggedIn;
