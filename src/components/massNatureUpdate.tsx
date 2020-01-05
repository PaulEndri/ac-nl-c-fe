import React from 'react';
import { PickList } from 'primereact/picklist';
import { NatureSource } from '../types/nature';
import NatureIcon from './natureIcon';
import { IS_MOBILE } from './helpers/isMobile';
import { Panel } from 'primereact/components/panel/Panel';
import { IItem } from 'ac-nl-sdk';
import { useDispatch } from 'react-redux';
import { addCatalogRecord, removeCatalogRecord, addMuseumRecord, removeMuseumRecord } from '../store/user/actions';
import { IPlayer } from '../lambdas/app/interfaces/IPlayer';

interface Props {
	source: IItem[];
	userData: IPlayer;
	sourceTitle: string;
	type: NatureSource;
}

const template = (type: NatureSource) => (item) => (
	<div className="acc-flex">
		<NatureIcon Type={type} Name={item} Size="Small" />
		<div className="margin-auto margin-left-L">{item}</div>
	</div>
);

const KEYS = {
	fish: 'Fishes',
	bug: 'Bugs',
	deepsea: 'DeepSea'
};

export const MassNatureUpdate = ({ source, userData, type, sourceTitle }: Props) => {
	const dispatch = useDispatch();
	const activeKey = KEYS[type];
	const addCatalog = (e) => dispatch(addCatalogRecord(activeKey, e.value[0]));
	const addMuseum = (e) => dispatch(addMuseumRecord(activeKey, e.value[0]));
	const removeCatalog = (e) => dispatch(removeCatalogRecord(activeKey, e.value[0]));
	const removeMuseum = (e) => dispatch(removeMuseumRecord(activeKey, e.value[0]));

	const styles = {
		height: IS_MOBILE ? '40vh' : '300px'
	};

	const caughtTarget = userData.NewLeaf.Catalogued[activeKey];
	const donatedTarget = userData.NewLeaf.Museum[activeKey];

	return (
		<React.Fragment>
			<Panel className="p-col-12" header={`Quick update all caught ${sourceTitle}`} toggleable={true}>
				<PickList
					source={source.filter((s) => caughtTarget.indexOf(s.Name) < 0).map((s) => s.Name)}
					target={caughtTarget}
					sourceHeader={sourceTitle}
					targetHeader={'Caught'}
					responsive={true}
					targetStyle={styles}
					showSourceControls={false}
					showTargetControls={false}
					sourceStyle={styles}
					onMoveToSource={removeCatalog}
					onMoveToTarget={addCatalog}
					itemTemplate={template(type)}
				/>
			</Panel>
			<Panel className="p-col-12" header={`Quick update all donated ${sourceTitle}`} toggleable={true}>
				<PickList
					source={source.filter((s) => donatedTarget.indexOf(s.Name) < 0).map((s) => s.Name)}
					target={donatedTarget}
					sourceHeader={sourceTitle}
					targetHeader={'Donated'}
					responsive={true}
					targetStyle={styles}
					showSourceControls={false}
					showTargetControls={false}
					sourceStyle={styles}
					onMoveToSource={removeMuseum}
					onMoveToTarget={addMuseum}
					itemTemplate={template(type)}
				/>
			</Panel>
		</React.Fragment>
	);
};

export default MassNatureUpdate;
