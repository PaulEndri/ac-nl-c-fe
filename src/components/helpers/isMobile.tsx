import React, { FunctionComponent } from 'react';

interface Props {
	children: any;
}

export const IS_MOBILE = window.innerWidth <= 1024;

const IsMobile: FunctionComponent<Props> = ({ children }) => (IS_MOBILE ? children : null);

export default IsMobile;
