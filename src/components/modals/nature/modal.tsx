import React from 'react';
import { Fishes, Bugs, INature, DeepSea, IFish } from 'ac-nl-sdk';
import NatureIcon from '../../natureIcon';
import { Panel } from 'primereact/components/panel/Panel';
import NatureTimeTable from './natureTimeTable';

interface NatureModalProps {
	name: string;
	type: 'bug' | 'fish' | 'deepsea';
}

const SOURCES = {
	bug: Bugs,
	fish: Fishes,
	deepsea: DeepSea
};

const NatureModal = ({ name, type }: NatureModalProps) => {
	const dataSource: INature[] = SOURCES[type];
	const entity = dataSource.find((f) => f.Name === name);

	return (
		<div className="p-grid p-justify-even">
			<div className="p-col-12 text-align-center ">
				<NatureIcon Type={type} Name={name} Size="Regular" />
			</div>
			{entity.Location && (
				<div className="p-col-6 p-md-4">
					<Panel className="card" header="Location">
						{entity.Location}
					</Panel>
				</div>
			)}
			<div className="p-col-6 p-md-4">
				<Panel className="card" header="Price">
					{entity.Price}
				</Panel>
			</div>
			{(entity as IFish).Size && (
				<div className="p-col-6 p-md-4">
					<Panel className="card" header="Size">
						{(entity as IFish).Size}
					</Panel>
				</div>
			)}
			<div className="p-col-12">
				<NatureTimeTable data={entity} />
			</div>

			{entity.Notes &&
			entity.Notes.length > 0 && (
				<div className="p-col-12">
					<Panel toggleable={true} header="Notes">
						{entity.Notes.map((n, i) => <div key={i}>{n}</div>)}
					</Panel>
				</div>
			)}
		</div>
	);
};

export default NatureModal;
