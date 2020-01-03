import React from 'react';
import { DeepSea } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';

const DeepSeaView = () => <EntityListView data={DeepSea} dataType="deepsea" title="Deep Sea Creatures" />;

export default DeepSeaView;
