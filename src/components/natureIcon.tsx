import React from 'react';
import classNames from 'classnames';

interface NatureIconProps {
	className?: string;
	Name: string;
	Type: 'bug' | 'fish' | 'deepsea';
	Size: 'Small' | 'Regular';
}

const SIZES = {
	Small: '36px',
	Regular: '64px'
};

export const NatureIcon = ({ Name, Type, Size = 'Regular', className }: NatureIconProps) => (
	<img
		alt={Name}
		className={classNames(`acc-nature-icon ${Type}`, { [className]: className })}
		src={`https://ac-companion.s3.us-east-2.amazonaws.com/images/${Type}/${Name}.png`}
		style={{ height: SIZES[Size], width: SIZES[Size] }}
	/>
);

export default NatureIcon;
