import React from 'react';
import { Villagers, IVillager } from 'ac-nl-sdk';
import VillagerIcon from '../villagerIcon';
import IsMobile, { IS_MOBILE } from '../helpers/isMobile';
import IsDesktop from '../helpers/isDesktop';
import { ScrollPanel } from 'primereact/scrollpanel';
import { TabView, TabPanel } from 'primereact/tabview';
import NatureIcon from '../natureIcon';

interface VillagerModalProps {
	Name: string;
}

interface VillagerChildrenProps {
	villager: IVillager;
}

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const CoreData = ({ villager }: VillagerChildrenProps) => (
	<div className="p-grid">
		<div className="p-col-6">Birthday</div>
		<div className="p-col-6">
			{MONTHS[villager.Birthday.Month - 1]} {villager.Birthday.Day}
		</div>
		<div className="p-col-6">Gender</div>
		<div className="p-col-6">{villager.Gender}</div>
		<div className="p-col-6">Species</div>
		<div className="p-col-6">{villager.Species}</div>
		<div className="p-col-6">Personality</div>
		<div className="p-col-6">{villager.Personality}</div>
		<div className="p-col-6">Style</div>
		<div className="p-col-6">{villager.Style}</div>
	</div>
);

const FavoriteData = ({ villager }: VillagerChildrenProps) => (
	<div className="p-grid">
		<div className="p-col-6">Favorite Saying</div>
		<div className="p-col-6">{villager['Favorite Saying']}</div>
		<div className="p-col-6">Favorite Clothing</div>
		<div className="p-col-6">{villager.Favorites.Clothing}</div>
		<div className="p-col-6">Favorite Color</div>
		<div className="p-col-6">{villager.Favorites.Color}</div>
		<div className="p-col-6">Favorite Song</div>
		<div className="p-col-6">{villager.Song}</div>
	</div>
);

const CoffeeData = ({ villager }: VillagerChildrenProps) => (
	<div className="p-grid">
		<div className="p-col-6">Type</div>
		<div className="p-col-6">{villager.Coffee.Type}</div>
		<div className="p-col-6">Milk</div>
		<div className="p-col-6">{villager.Coffee.Milk}</div>
		<div className="p-col-6">Sugar</div>
		<div className="p-col-6">{villager.Coffee.Sugar}</div>
	</div>
);

const BiographyData = ({ villager }: VillagerChildrenProps) => (
	<div className="p-grid">
		{Object.keys(villager.Biography).map((key) => (
			<React.Fragment>
				<div className="p-col-6">{key}</div>
				<div className="p-col-6">{villager.Biography[key]}</div>
			</React.Fragment>
		))}
		<div className="p-col-6">Initial Clothes</div>
		<div className="p-col-6">{villager['Initial Clothes']}</div>
		<div className="p-col-6">Initial Phrase</div>
		<div className="p-col-6">{villager['Initial Phrase']}</div>
	</div>
);

const ICON_STYLES = {
	margin: 'auto',
	width: IS_MOBILE ? '150px' : '250px',
	height: IS_MOBILE ? '170px' : '270px',
	paddingTop: '15px',
	marginTop: IS_MOBILE ? 'auto' : '50px'
};
const FishModal = ({ Name }: VillagerModalProps) => {
	return <span>{Name}</span>;
};

export default FishModal;