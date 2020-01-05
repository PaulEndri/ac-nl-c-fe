import React from 'react';
import classNames from 'classnames';
import { NatureSource } from '../types/nature';

interface NatureIconProps {
	className?: string;
	Name: string;
	Type: NatureSource;
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
