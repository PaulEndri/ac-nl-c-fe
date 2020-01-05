import React, { useState } from 'react';
import { Villagers, IVillager } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';
import { Panel } from 'primereact/components/panel/Panel';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { Dropdown } from 'primereact/dropdown';

const PERSONALITIES = [ 'Cranky', 'Peppy', 'Uchi', 'Lazy', 'Normal', 'Snooty', 'Jock', 'Smug' ];
const SPECIES = [
	'Bird',
	'Squirrel',
	'Pig',
	'Gorilla',
	'Alligator',
	'Koala',
	'Eagle',
	'Anteater',
	'Bull',
	'Mouse',
	'Cat',
	'Horse',
	'Hamster',
	'Kangaroo',
	'Penguin',
	'Chicken',
	'Elephant',
	'Sheep',
	'Deer',
	'Tiger',
	'Cub',
	'Dog',
	'Bear',
	'Hippo',
	'Duck',
	'Goat',
	'Ostrich',
	'Rabbit',
	'Lion',
	'Frog',
	'elephant',
	'Wolf',
	'Monkey',
	'Rhino',
	'Octopus',
	'Cow'
];
const createCopy = (test: IVillager[]) => test.map((v) => ({ ...v }));
const VillagerView = () => {
	const [ speciesFilter, setSpeciesFilter ] = useState('');
	const [ personalityFilter, setPersonalityFilter ] = useState('');

	let data = createCopy(Villagers);

	if (speciesFilter && speciesFilter.length > 0) {
		data = data.filter((villager) => villager.Species === speciesFilter);
	}

	if (personalityFilter && personalityFilter.length > 0) {
		data = data.filter((villager) => villager.Personality === personalityFilter);
	}
	return (
		<EntityListView data={data} dataType="Villager" title="Villagers" modalType={MODAL_OPTIONS.Villager}>
			<Panel header="Additional Filters" toggleable={true}>
				<div className="p-grid">
					<div className="p-col-6">
						<h3>Species Filter</h3>
						<Dropdown
							className="width-full"
							showClear={true}
							value={speciesFilter}
							options={SPECIES.map((v) => ({ label: v, value: v }))}
							onChange={(e) => setSpeciesFilter(e.value)}
						/>
					</div>
					<div className="p-col-6">
						<h3>Personality Filter</h3>
						<Dropdown
							className="width-full"
							showClear={true}
							value={personalityFilter}
							options={PERSONALITIES.map((v) => ({ label: v, value: v }))}
							onChange={(e) => setPersonalityFilter(e.value)}
						/>
					</div>
				</div>
			</Panel>
		</EntityListView>
	);
};

export default VillagerView;
