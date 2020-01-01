import React from 'react';
import { Villagers } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';

const createCopy = (test: any[]) => test.map((v) => ({ ...v }));
const VillagerView = () => <EntityListView data={createCopy(Villagers)} dataType="Villager" title="Villagers" />;

export default VillagerView;
