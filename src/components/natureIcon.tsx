import React from 'react';
import classNames from 'classnames';

interface NatureIconProps {
	className?: string;
	Name: string;
	Type: 'bug' | 'fish';
	Size: 'Small' | 'Regular';
}

const SIZES = {
	Small: '36px',
	Regular: '64px'
};

export const NatureIcon = ({ Name, Type, Size = 'Regular', className }: NatureIconProps) => (
	<img
		className={classNames(`acc-nature-icon ${Type}`, { [className]: className })}
		src={`/assets/${Type}/${Name}.png`}
		style={{ height: SIZES[Size], width: SIZES[Size] }}
	/>
);

export default NatureIcon;
