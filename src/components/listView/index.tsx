import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IS_MOBILE } from '../helpers/isMobile';
import CollectibleFilterView from '../filterView/collectibleFilterView';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { Panel } from 'primereact/components/panel/Panel';
import { InputText } from 'primereact/inputtext';

interface Props {
	data: any[];
	userRecords: string[];
	userData: IPlayer;
	addRecord: Function;
	removeRecord: Function;
	saveTitle?: string;
	title: string;
	paginator?: boolean;
	columns: any[];
}

const SavedIcon = () => <i className="i fas fa-check-square" style={{ color: '#6ebc3b' }} />;
const NotSavedIcon = () => <i className="i far fa-square" style={{ color: '#ed3c39' }} />;

const getFilters = (columns: any[]) => {
	const records = columns.filter((c) => c.field !== 'Price').map((c) => c.field);

	return records;
};
export const ListView = ({
	data,
	userRecords,
	addRecord,
	removeRecord,
	userData,
	saveTitle,
	title,
	columns,
	paginator
}: Props) => (
	<CollectibleFilterView userData={userData} data={data} filters={getFilters(columns)}>
		{(state, data, update) => (
			<div>
				<Panel header="Additional Filters" toggleable={true}>
					<div className="p-grid p-fluid">
						{columns.filter((c) => c.field !== 'Price').map((column) => (
							<div className="p-col-6 p-md-3" key={column.field}>
								<h3>Filter by {column.field}</h3>
								<InputText
									className="width-full"
									value={state.filterValues[column.field]}
									onChange={(e) => update(column.field, e.currentTarget.value)}
								/>
							</div>
						))}
					</div>
				</Panel>
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

					{columns.map((col, i) => <Column key={i} {...col} filter={false} />)}
				</DataTable>
			</div>
		)}
	</CollectibleFilterView>
);
export default ListView;
