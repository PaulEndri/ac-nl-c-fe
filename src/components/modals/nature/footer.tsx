import React from 'react';
import {
	addCatalogRecord,
	removeCatalogRecord,
	addMuseumRecord,
	removeMuseumRecord
} from '../../../store/user/actions';
import { getUserDonationsByType, getUserCatalogByType } from '../../../store/user/selectors';
import { connect } from 'react-redux';
import { Button } from 'primereact/button';
import IsLoggedIn from '../../helpers/isLoggedIn';
import classNames from 'classnames';

interface NatureFooterProps {
	name: string;
	recordKey: string;
	addCatalogRecord: Function;
	removeCatalogRecord: Function;
	addMuseumRecord: Function;
	removeMuseumRecord: Function;
	museumData: string[];
	catalogData: string[];
}

const mapStateToProps = (state, props) => ({
	museumData: getUserDonationsByType(props.recordKey)(state),
	catalogData: getUserCatalogByType(props.recordKey)(state)
});

const mapDispatchToProps = {
	addCatalogRecord,
	removeCatalogRecord,
	addMuseumRecord,
	removeMuseumRecord
};

export const NatureFooterComponent = ({
	name,
	recordKey,
	addCatalogRecord,
	removeCatalogRecord,
	addMuseumRecord,
	removeMuseumRecord,
	museumData,
	catalogData
}: NatureFooterProps) => {
	const donatedRecord = museumData.some((n) => n === name);
	const caughtRecord = catalogData.some((n) => n === name);

	const onClick = (source: 'museum' | 'catalog') => () => {
		switch (source) {
			case 'museum':
				if (donatedRecord) {
					removeMuseumRecord(recordKey, name);
				} else {
					addMuseumRecord(recordKey, name);
				}
				break;
			case 'catalog':
				if (caughtRecord) {
					removeCatalogRecord(recordKey, name);
				} else {
					addCatalogRecord(recordKey, name);
				}
				break;
			default:
				console.log('error');
		}
	};

	return (
		<IsLoggedIn>
			<Button
				className={classNames({
					'p-button-danger': donatedRecord
				})}
				label={`${donatedRecord ? 'Remove from' : 'Donate to'} my town`}
				icon={`pi pi-${donatedRecord ? 'minus' : 'plus'}`}
				onClick={onClick('museum')}
			/>
			<Button
				className={classNames({
					'p-button-danger': caughtRecord
				})}
				label={caughtRecord ? "I haven't caught this" : 'I caught this!'}
				icon={`pi pi-${caughtRecord ? 'minus' : 'plus'}`}
				onClick={onClick('catalog')}
			/>
		</IsLoggedIn>
	);
};

export const NatureFooter = connect(mapStateToProps, mapDispatchToProps)(NatureFooterComponent);
export default NatureFooter;
