import React from 'react';
import { INature } from 'ac-nl-sdk';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/components/panel/Panel';
import { ScrollPanel } from 'primereact/scrollpanel';
import { IS_MOBILE } from '../../helpers/isMobile';
import { MONTHS } from '../../../consts';

/**
 * @todo this file is hot garbage. Fix it.
 */

interface Props {
	data: INature;
}

export const NatureTimeTable = ({ data }: Props) => {
	let rowObject: any = {};

	if (data.Months[0].length === 12 && data.Times[0].length === 24) {
		return (
			<Panel header="Availability" className="card">
				{data.Name} are always available
			</Panel>
		);
	}

	const presentIcon = (
		<div className="nature-table-icon text-align-center">
			<i className="fas fa-check" />
		</div>
	);
	data.Months.forEach((monthRange, index) => {
		const timeRange = data.Times[index];

		monthRange.forEach((month) => {
			timeRange.forEach((time) => {
				if (!rowObject[month]) {
					rowObject[month] = {
						month: MONTHS[month - 1]
					};
				}
				if (!rowObject[month][time]) {
					rowObject[month][time] = presentIcon;
				}
			});
		});
	});

	let columns: any = Object.keys(
		Object.entries(rowObject)
			.map(([ key, values ], i) => {
				if (Object.keys(values).length >= 24) {
					const newObject = {
						month: (values as any).month,
						All_Day: presentIcon
					};
					rowObject[key] = newObject;

					return newObject;
				}

				return values;
			})
			.reduce((sum: any, cur: any) => {
				return {
					...cur,
					...sum
				};
			}, {})
	);

	const allMonths = Object.keys(rowObject).map((v: any) => {
		const record = { ...Object.keys(rowObject[v]) };

		return record;
	});

	const allMonthsMatch =
		allMonths.length === 12 &&
		allMonths.every((v) => Object.values(v).join(',') === Object.values(allMonths[0]).join(','));

	if (allMonthsMatch) {
		rowObject = {
			0: {
				...rowObject[1],
				month: 'All Months'
			}
		};
	}

	const formatNumber = (formattingNumber: number) => {
		if (formattingNumber < 12) {
			return `${formattingNumber} AM`;
		} else if (formattingNumber === 24) {
			return `12 AM`;
		} else {
			return `${formattingNumber - 12} PM`;
		}
	};

	if (columns.length <= 7) {
		return (
			<DataTable value={Object.values(rowObject)} header="Availability">
				<Column field="month" header="Month" />
				{columns
					.filter((col) => col !== 'month')
					.map((col, index) => <Column field={col.toString()} header={col.replace('_', ' ')} key={col} />)}
			</DataTable>
		);
	} else if (IS_MOBILE && columns.length >= 14) {
		return (
			<ScrollPanel style={{ height: IS_MOBILE ? '30vh' : 'auto' }}>
				<DataTable
					value={Object.values(rowObject)}
					header="Early Morning Availability"
					style={{ marginTop: '10px' }}
				>
					<Column field="month" header="Month" />
					{columns
						.filter((col) => col !== 'month' && +col <= 6)
						.map((col, index) => <Column field={col.toString()} header={formatNumber(+col)} key={index} />)}
				</DataTable>
				<DataTable value={Object.values(rowObject)} header="Morning Availability" style={{ marginTop: '10px' }}>
					<Column field="month" header="Month" />
					{columns
						.filter((col) => col !== 'month' && +col <= 12 && +col > 6)
						.map((col, index) => <Column field={col.toString()} header={formatNumber(+col)} key={index} />)}
				</DataTable>
				<DataTable
					value={Object.values(rowObject)}
					header="Afternoon Availability"
					style={{ marginTop: '10px' }}
				>
					<Column field="month" header="Month" />
					{columns
						.filter((col) => col !== 'month' && +col <= 18 && +col > 12)
						.map((col, index) => <Column field={col.toString()} header={formatNumber(+col)} key={index} />)}
				</DataTable>
				<DataTable value={Object.values(rowObject)} header="Evening Availability" style={{ marginTop: '10px' }}>
					<Column field="month" header="Month" />
					{columns
						.filter((col) => col !== 'month' && +col > 18)
						.map((col, index) => <Column field={col.toString()} header={formatNumber(+col)} key={index} />)}
				</DataTable>
			</ScrollPanel>
		);
	} else {
		return (
			<ScrollPanel style={{ height: IS_MOBILE ? '50vh' : 'auto', maxHeight: '50vh' }}>
				<DataTable value={Object.values(rowObject)} header="Morning Availability">
					<Column field="month" header="Month" />
					{columns
						.filter((col) => col !== 'month' && +col <= 12)
						.map((col, index) => <Column field={col.toString()} header={formatNumber(+col)} key={index} />)}
				</DataTable>
				<DataTable value={Object.values(rowObject)} header="Evening Availability" style={{ marginTop: '10px' }}>
					<Column field="month" header="Month" />
					{columns
						.filter((col) => col !== 'month' && +col > 12)
						.map((col, index) => <Column field={col.toString()} header={formatNumber(+col)} key={index} />)}
				</DataTable>
			</ScrollPanel>
		);
	}
};

export default NatureTimeTable;
