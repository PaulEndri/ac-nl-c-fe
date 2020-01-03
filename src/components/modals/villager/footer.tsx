import React from 'react';
import { addUserVillager, removeUserVillager } from '../../../store/user/actions';
import { getUserVillagers } from '../../../store/user/selectors';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import IsLoggedIn from '../../helpers/isLoggedIn';
import classNames from 'classnames';

interface VillagerFooterProps {
	name: string;
	villagers: string[];
	addUserVillager: Function;
	removeUserVillager: Function;
}

const mapStateToProps = (state) => ({
	villagers: getUserVillagers(state)
});

const mapDispatchToProps = {
	addUserVillager,
	removeUserVillager
};

export const VillagerFooterComponent = ({
	name,
	villagers,
	addUserVillager,
	removeUserVillager
}: VillagerFooterProps) => {
	const hasVillager = (villagers || []).indexOf(name) >= 0;

	const onClick = () => {
		if (hasVillager) {
			removeUserVillager(name);
		} else {
			addUserVillager(name);
		}
	};

	return (
		<IsLoggedIn>
			<Button
				className={classNames({
					'p-button-danger': hasVillager
				})}
				label={`${hasVillager ? 'Remove from' : 'Add to'} my town`}
				icon={`pi pi-${hasVillager ? 'minus' : 'plus'}`}
				onClick={onClick}
			/>
		</IsLoggedIn>
	);
};

export const VillagerFooter = connect(mapStateToProps, mapDispatchToProps)(VillagerFooterComponent);
export default VillagerFooter;
