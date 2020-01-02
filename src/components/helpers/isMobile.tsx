import React from 'react';

interface Props {
	children: any;
}

export const IS_MOBILE = window.innerWidth <= 1024;

const IsMobile: React.FC<Props> = ({ children }) => (IS_MOBILE ? children : null);

export default IsMobile;
