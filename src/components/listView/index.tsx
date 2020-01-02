import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IS_MOBILE } from '../helpers/isMobile';

interface Props {
	data: any[];
	userRecords: string[];
	addRecord: Function;
	removeRecord: Function;
	saveTitle?: string;
	title: string;
	paginator?: boolean;
	columns: any[];
}

const SavedIcon = () => <i className="i fas fa-check-square" style={{ color: '#6ebc3b' }} />;
const NotSavedIcon = () => <i className="i far fa-square" style={{ color: '#ed3c39' }} />;

export const ListView = ({
	data,
	userRecords,
	addRecord,
	removeRecord,
	saveTitle,
	title,
	columns,
	paginator
}: Props) => (
	<DataTable
		value={data.map((item) => ({
			...item,
			SavedIcon: userRecords.indexOf(item.Name) >= 0 ? <SavedIcon /> : <NotSavedIcon />,
			saved: userRecords.indexOf(item.Name) >= 0
		}))}
		paginator={paginator}
		rows={paginator ? 20 : 999}
		paginatorPosition="both"
		selectionMode="single"
		header={title}
		responsive={true}
		onSelectionChange={(event) => {
			if (event.value.saved) {
				removeRecord(event.value.Name);
			} else {
				addRecord(event.value.Name);
			}
		}}
	>
		{saveTitle && (
			<Column
				field="SavedIcon"
				header={saveTitle}
				sortField="saved"
				sortable={true}
				excludeGlobalFilter={true}
				style={{ textAlign: IS_MOBILE ? 'start' : 'center', width: '10%' }}
			/>
		)}

		{columns.map((col, i) => <Column key={i} {...col} />)}
	</DataTable>
);
export default ListView;
