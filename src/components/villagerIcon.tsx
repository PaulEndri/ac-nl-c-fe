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
		src={`/assets/villagers/${villager.Name}.png`}
		style={{ height: SIZES[size], width: 'auto' }}
	/>
);

export default VillagerIcon;