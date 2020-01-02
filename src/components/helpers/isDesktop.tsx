import React from 'react';

interface Props {
	children: any;
}

export const IS_DESKTOP = window.innerWidth > 1024;

const IsDesktop: React.FC<Props> = ({ children }) => (IS_DESKTOP ? children : null);

export default IsDesktop;
