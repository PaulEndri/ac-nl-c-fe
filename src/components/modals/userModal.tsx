import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import ApiService from '../../service/api';
import { getUserGoogleId, getUserEmail } from '../../store/user/selectors';
import { setUserData } from '../../store/user/actions';
import { setModal } from '../../store/modals/actions';

interface Props {
	email: string;
	googleId: string;
	setUserData: Function;
	setModal: Function;
}

const mapStateToProps = (state) => ({
	googleId: getUserGoogleId(state),
	email: getUserEmail(state)
});

const mapDispatchToProps = {
	setUserData,
	setModal
};

const UserModalComponent = ({ googleId, email, setUserData, setModal }: Props) => {
	const [ town, setTown ] = useState('');
	const [ name, setName ] = useState('');

	const submit = async () => {
		try {
			const test = await ApiService.createPlayer(googleId, email, town, name);
			setUserData(test);
		} catch (e) {
			console.error(e);
		}

		setModal(null, null);
	};

	return (
		<div className="user-registration-modal p-grid">
			<div className="p-col-12">
				<span className="p-float-label">
					<InputText id="mayorName" value={name} onChange={(e) => setName(e.currentTarget.value)} />
					<label htmlFor="mayorName">Mayor Name</label>
				</span>
			</div>
			<div className="p-col-12">
				<span className="p-float-label">
					<InputText id="townName" value={town} onChange={(e) => setTown(e.currentTarget.value)} />
					<label htmlFor="townName">Town Name</label>
				</span>
			</div>
			<Button className="p-col-12" label="Submit" disabled={!name || !town} onClick={submit} />
		</div>
	);
};

export const UserModal = connect(mapStateToProps, mapDispatchToProps)(UserModalComponent);

export default {
	Component: UserModal,
	Footer: null
};
