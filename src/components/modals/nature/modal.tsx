import React from 'react';
import { Fishes, Bugs } from 'ac-nl-sdk';
import NatureIcon from '../../natureIcon';
import { Panel } from 'primereact/components/panel/Panel';

interface NatureModalProps {
	name: string;
	type: 'bug' | 'fish';
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
	'October',
	'September',
	'November',
	'December'
];

const NatureModal = ({ name, type }: NatureModalProps) => {
	const dataSource = type === 'bug' ? Bugs : Fishes;
	const entity = dataSource.find((f) => f.Name === name);

	return (
		<div className="p-grid p-justify-even">
			<div className="p-col-12 text-align-center ">
				<NatureIcon Type={type} Name={name} Size="Regular" />
			</div>
			<div className="p-col-12">
				<Panel toggleable={true} header="Location">
					{entity.Location}
				</Panel>
			</div>
			<div className="p-col-12">
				<Panel toggleable={true} header="Available Months">
					{entity.Months.map((m) => <div key={m}>{MONTHS[m]}</div>)}
				</Panel>
			</div>
		</div>
	);
};

export default NatureModal;
