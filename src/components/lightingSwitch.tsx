import React, { useState } from 'react';
import { Button } from 'primereact/button';

export const LightingSwitch = () => {
	const [ mode, setMode ] = useState('dark');

	const changeMode = (mode: 'dark' | 'light') => {
		const subsets = [ 'theme', 'layout' ];

		subsets.forEach((subset) => {
			const style = document.getElementById(`${subset}-css`);

			style.setAttribute(
				'href',
				`/assets/${subset}/${subset === 'layout' ? 'css/' : ''}${subset}-green-${mode}.css`
			);
			setMode(mode);
		});
	};

	return (
		<Button
			label={mode === 'dark' ? 'Lighten' : 'Darken'}
			icon={`fa${mode === 'dark' ? 's' : 'r'} fa-lightbulb`}
			onClick={() => changeMode(mode === 'dark' ? 'light' : 'dark')}
		/>
	);
};
