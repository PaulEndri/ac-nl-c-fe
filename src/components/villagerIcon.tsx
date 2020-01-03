import React from 'react';
import { IVillager } from 'ac-nl-sdk';

interface VillagerIconProps {
	villager: IVillager;
	className?: string;
	size: 'small' | 'large' | 'xl';
}

const SIZES = {
	small: '128px',
	large: '230px',
	xl: '280px'
};
export const VillagerIcon = ({ villager, size = 'large', className }: VillagerIconProps) => (
	<img
		className={className}
		alt={villager.Name}
		src={`https://ac-companion.s3.us-east-2.amazonaws.com/images/villagers/${villager.Name}.png`}
		style={{ height: SIZES[size], width: 'auto' }}
	/>
);

export default VillagerIcon;
