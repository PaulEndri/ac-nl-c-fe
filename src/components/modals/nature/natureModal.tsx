import React from 'react';
import { Fishes } from 'ac-nl-sdk';
import NatureIcon from '../../natureIcon';
import { Panel } from 'primereact/components/panel/Panel';
import VillagerIcon from '../../villagerIcon';
interface FishModalProps {
	Name: string;
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

const FishModal = ({ Name }: FishModalProps) => {
	const fish = Fishes.find((f) => f.Name === Name);

	return (
		<div className="p-grid p-justify-even">
			<div className="p-col-12 text-align-center ">
				<NatureIcon Type="fish" Name={Name} Size="Regular" />
			</div>
			<div className="p-col-12">
				<Panel header="Location">{fish.Location}</Panel>
			</div>
			<div className="p-col-12">
				<Panel header="Available Months">{fish.Months.map((m) => <div key={m}>{MONTHS[m]}</div>)}</Panel>
			</div>
		</div>
	);
};

export default FishModal;