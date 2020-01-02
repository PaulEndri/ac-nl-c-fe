import React from 'react';
import { Bugs } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';

const FishesView = () => <EntityListView data={Bugs} dataType="bug" title="Bugs" />;

export default FishesView;
