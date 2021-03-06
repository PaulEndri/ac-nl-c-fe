import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { setModal } from '../../store/modals/actions';
import { IS_MOBILE } from '../helpers/isMobile';
import classNames from 'classnames';
import { getModalKey, getModalActive } from '../../store/modals/selectors';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import VillagerModal from './villager';
import FishModal from './fishModal';
import UserModal from './userModal';
import BugModal from './bugModal';
import DeepSeaModal from './deepSeaModal';

interface modalComponentProps {
	activeModal: MODAL_OPTIONS;
	modalKey: string;
	setModal: Function;
}

const mapStateToProps = (state) => ({
	activeModal: getModalActive(state),
	modalKey: getModalKey(state)
});

const mapDispatchToProps = {
	setModal
};

const Modals = ({ modalKey, activeModal, setModal }: modalComponentProps) => (
	<div>
		<Dialog
			header={modalKey}
			className={classNames({
				mobile: IS_MOBILE,
				'acc-view-width': activeModal === MODAL_OPTIONS.Villager || IS_MOBILE
			})}
			visible={!!activeModal}
			onHide={() => setModal(null, null)}
			dismissableMask={true}
			footer={
				<React.Fragment>
					{activeModal === MODAL_OPTIONS.Villager && <VillagerModal.Footer name={modalKey} />}
					{activeModal === MODAL_OPTIONS.Fish && <FishModal.Footer name={modalKey} />}
					{activeModal === MODAL_OPTIONS.Bug && <BugModal.Footer name={modalKey} />}
					{activeModal === MODAL_OPTIONS.DeepSea && <DeepSeaModal.Footer name={modalKey} />}
				</React.Fragment>
			}
		>
			{activeModal === MODAL_OPTIONS.Villager && <VillagerModal.Component villagerName={modalKey} />}
			{activeModal === MODAL_OPTIONS.Fish && <FishModal.Component name={modalKey} />}
			{activeModal === MODAL_OPTIONS.Bug && <BugModal.Component name={modalKey} />}
			{activeModal === MODAL_OPTIONS.DeepSea && <DeepSeaModal.Component name={modalKey} />}
			{activeModal === MODAL_OPTIONS.User && <UserModal.Component />}
		</Dialog>
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
