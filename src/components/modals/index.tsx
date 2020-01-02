import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { setModal } from '../../store/modals/actions';
import { IS_MOBILE } from '../helpers/isMobile';
import classNames from 'classnames';
import { getModalKey, getModalActive } from '../../store/modals/selectors';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import VillagerModal from './villagerModal';
import FishModal from './fishModal';
import UserModal from './userModal';

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
			className={classNames({ mobile: IS_MOBILE, 'acc-view-width': activeModal !== MODAL_OPTIONS.User })}
			visible={!!activeModal}
			onHide={() => setModal(null, null)}
			dismissableMask={true}
		>
			{activeModal === MODAL_OPTIONS.Villager && <VillagerModal villagerName={modalKey} />}
			{activeModal === MODAL_OPTIONS.Fish && <FishModal Name={modalKey} />}
			{activeModal === MODAL_OPTIONS.User && <UserModal />}
		</Dialog>
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
