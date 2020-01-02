import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';

const UserModalComponent = () => {
	const [ town, setTown ] = useState('');
	const [ name, setName ] = useState('');

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
			<Button className="p-col-12" label="Submit" />
		</div>
	);
};

export const UserModal = connect(null, null)(UserModalComponent);

export default UserModal;
