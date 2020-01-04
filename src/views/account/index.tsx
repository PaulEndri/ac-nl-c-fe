import React from 'react';
import { InputText } from 'primereact/inputtext';
import { getUserData } from '../../store/user/selectors';
import { setUserData } from '../../store/user/actions';
import { connect } from 'react-redux';
import { getGlobalSaving } from '../../store/global/selectors';
import { ProgressBar } from 'primereact/progressbar';

interface Props {
	coreData: any;
	saving: boolean;
	update: Function;
}

const mapStateToProps = (state) => ({
	coreData: getUserData(state),
	saving: getGlobalSaving(state)
});

const mapDispatchToProps = {
	update: setUserData
};

const AccountViewComponent = ({ coreData, update, saving }: Props) => (
	<div className="p-grid p-fluid">
		<div className="p-col-12 ">
			<div className="card card-w-title">
				<div className="p-grid">
					<div className="p-col-3">
						<h1>Name</h1>
						<span className="p-float-label">
							<InputText
								value={coreData.Name || ''}
								onChange={(e) => update({ Name: e.currentTarget.value })}
							/>
							<label htmlFor="mayorName">Mayor Name</label>
						</span>
					</div>
					<div className="p-col-3">
						<h1>Name</h1>
						<span className="p-float-label">
							<InputText
								value={coreData.Name || ''}
								onChange={(e) => update({ Name: e.currentTarget.value })}
							/>
							<label htmlFor="mayorName">Mayor Name</label>
						</span>
					</div>
					<div className="p-col-6">
						<h1>Name</h1>
						<span className="p-float-label">
							<InputText
								value={coreData.Name || ''}
								onChange={(e) => update({ Name: e.currentTarget.value })}
							/>
							<label htmlFor="mayorName">Mayor Name</label>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div className="p-col-12 p-md-6">
			<div className="card card-w-title">
				<h1>Town Name</h1>
				<span className="p-float-label">
					<InputText
						value={coreData.NewLeaf.TownName || ''}
						onChange={(e) => update({ NewLeaf: { ...coreData.NewLeaf, TownName: e.currentTarget.value } })}
					/>
					<label htmlFor="mayorName">Town Name</label>
				</span>
			</div>
		</div>
		{saving && (
			<div className="p-col-12">
				<div className="card card-w-title text-align-center ">
					<h1>... Saving ... </h1>
					<ProgressBar mode="indeterminate" />
				</div>
			</div>
		)}
	</div>
);

export const AccountView = connect(mapStateToProps, mapDispatchToProps)(AccountViewComponent);
export default AccountView;
