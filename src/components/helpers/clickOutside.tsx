import React, { useRef, useEffect } from 'react';

interface Props {
	clickOutside: (e: Event) => void;
}

/**
 * Component that alerts if you click outside of it
 */
export const ClickOutside: React.FC<Props> = ({ clickOutside, children }) => {
	const wrapperRef = useRef(null);

	useEffect(() => {
		// Bind the event listener
		document.addEventListener('mousedown', clickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', clickOutside);
		};
	});

	return <div ref={wrapperRef}>{children}</div>;
};

export default ClickOutside;
