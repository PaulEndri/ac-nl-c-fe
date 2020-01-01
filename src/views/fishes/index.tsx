import React from 'react';
import { Fishes } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';

const FishesView = () => <EntityListView data={Fishes} dataType="fish" title="Fishes" />;

export default FishesView;
