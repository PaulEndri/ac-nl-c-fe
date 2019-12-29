import React, { FunctionComponent } from 'react';

interface Props {
	children: any;
}

export const IS_DESKTOP = window.innerWidth > 1024;

const IsDesktop: FunctionComponent<Props> = ({ children }) => (IS_DESKTOP ? children : null);

export default IsDesktop;
