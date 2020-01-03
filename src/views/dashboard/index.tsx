import React from 'react';
import { Panel } from 'primereact/components/panel/Panel';
import { getUserData } from '../../store/user/selectors';
import { IPlayer } from '../../lambdas/app/interfaces/IPlayer';
import { connect } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
	Fishes,
	Bugs,
	Fossils,
	Art,
	Clothing,
	Furnitures,
	Wallpapers,
	Flooring,
	Gyroids,
	Papers,
	Villagers as AllVillagers
} from 'ac-nl-sdk';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import VillagerIcon from '../../components/villagerIcon';
import { setModal } from '../../store/modals/actions';
import { MODAL_OPTIONS } from '../../store/modals/reducer';

interface Props {
	userData: IPlayer;
	setModal: Function;
}

const mapStateToProps = (state) => ({
	userData: getUserData(state)
});

const mapDispatchToProps = {
	setModal
};

interface PanelProps {
	currentValue: number;
	totalValue: number;
	title: string;
}

const PANEL_COLORS = [
	'white',
	'darkred',
	'red',
	'orangered',
	'darkorange',
	'orange',
	'yellow',
	'gold',
	'yellowgreen',
	'limegreen',
	'green'
];
const DashboardViewPanel = ({ currentValue, totalValue, title }: PanelProps) => {
	const percentage = currentValue / totalValue;
	const colorIndex = Math.ceil(percentage * 10);
	const color = PANEL_COLORS[colorIndex];

	return (
		<div className="p-col-6 p-md-3 text-align-center">
			<Panel header={title}>
				<CircularProgressbar
					value={percentage * 100}
					text={`${currentValue}/${totalValue}`}
					styles={buildStyles({
						pathColor: color,
						textColor: color
					})}
				/>
			</Panel>
		</div>
	);
};

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const DashboardViewComponent = ({ userData, setModal }: Props) => {
	if (!userData) {
		return null;
	}

	const { NewLeaf: { Museum, Villagers, Catalogued } } = userData;
	const Furniture: any = Catalogued ? Catalogued.Furniture : {};

	const getVillagers = (villagerList: string[]) => {
		if (!villagerList) {
			return [];
		}

		return villagerList.map((villagerName) => AllVillagers.find(({ Name }) => Name === villagerName));
	};

	return (
		<div className="p-grid">
			<div className="p-col-12">
				<Panel toggleable={true} header="My Villagers">
					{getVillagers(Villagers).map((v) => (
						<div
							className="dashboard-villager"
							key={v.Name}
							onClick={() => setModal(MODAL_OPTIONS.Villager, v.Name)}
						>
							<VillagerIcon size="small" villager={v} />
						</div>
					))}
				</Panel>
			</div>
			<DashboardViewPanel
				totalValue={Fishes.length}
				currentValue={Catalogued ? Catalogued.Fishes.length : 0}
				title="Fishes Caught"
			/>
			<DashboardViewPanel
				totalValue={Fishes.length}
				currentValue={Museum ? Museum.Fishes.length : 0}
				title="Fishes Donated"
			/>
			<DashboardViewPanel
				totalValue={Bugs.length}
				currentValue={Catalogued ? Catalogued.Bugs.length : 0}
				title="Bugs Caught"
			/>
			<DashboardViewPanel
				totalValue={Bugs.length}
				currentValue={Museum ? Museum.Bugs.length : 0}
				title="Bugs Donated"
			/>
			<DashboardViewPanel
				totalValue={Fossils.length}
				currentValue={Museum ? Museum.Fossils.length : 0}
				title="Fossils Donated"
			/>
			<DashboardViewPanel
				totalValue={Art.length}
				currentValue={Museum ? Museum.Art.length : 0}
				title="Artwork Donated"
			/>
			<DashboardViewPanel
				totalValue={Clothing.length}
				currentValue={Catalogued ? Catalogued.Clothing.length : 0}
				title="Clothing Collected"
			/>
			<DashboardViewPanel
				totalValue={Furnitures.length}
				currentValue={Furniture.Furniture ? Furniture.Furniture.length : 0}
				title="Furniture Collected"
			/>
			<DashboardViewPanel
				totalValue={Wallpapers.length}
				currentValue={Furniture.Wallpapers ? Furniture.Wallpapers.length : 0}
				title="Wallpaper Collected"
			/>
			<DashboardViewPanel
				totalValue={Flooring.length}
				currentValue={Furniture.Flooring ? Furniture.Flooring.length : 0}
				title="Flooring Collected"
			/>
			<DashboardViewPanel
				totalValue={Gyroids.length}
				currentValue={Furniture.Gyroids ? Furniture.Gyroids.length : 0}
				title="Gyroids Collected"
			/>
			<DashboardViewPanel
				totalValue={Papers.length}
				currentValue={Furniture.Paper ? Furniture.Paper.length : 0}
				title="Paper Collected"
			/>
		</div>
	);
};

const DashboardView = connect(mapStateToProps, mapDispatchToProps)(DashboardViewComponent);
export default DashboardView;
