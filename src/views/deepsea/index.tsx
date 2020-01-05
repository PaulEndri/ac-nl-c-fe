import React from 'react';
import { DeepSea } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';
import { MODAL_OPTIONS } from '../../store/modals/reducer';

const DeepSeaView = () => (
	<EntityListView data={DeepSea} dataType="deepsea" title="Deep Sea Creatures" modalType={MODAL_OPTIONS.DeepSea} />
);

export default DeepSeaView;
