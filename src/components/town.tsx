import React, { createRef } from 'react';
import { Panel } from 'primereact/components/panel/Panel';
import { IPlayer } from '../lambdas/app/interfaces/IPlayer';
import { useDispatch } from 'react-redux';
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
	Villagers as AllVillagers,
	Songs
} from 'ac-nl-sdk';
import VillagerIcon from './villagerIcon';
import { MODAL_OPTIONS } from '../store/modals/reducer';
import { InputText } from 'primereact/inputtext';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import classNames from 'classnames';
import { IS_MOBILE } from './helpers/isMobile';
import { setModal } from '../store/modals/actions';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

interface Props {
	disabled: boolean;
	userData: IPlayer;
	setUserData: Function;
}

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

const TownPanel = ({ currentValue, totalValue, title }: PanelProps) => {
	const percentage = currentValue / totalValue;
	const colorIndex = Math.ceil(percentage * 10);
	const color = PANEL_COLORS[colorIndex];

	return (
		<div className="p-col-6 p-md-3 text-align-center">
			<Panel header={title} className="card">
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

export const Town = ({ userData, setUserData, disabled }: Props) => {
	const dispatch = useDispatch();
	let growl: any = createRef();
	let href: any = createRef();

	if (!userData) {
		return null;
	}

	const setVillagerModal = (v) => dispatch(setModal(MODAL_OPTIONS.Villager, v));
	const { NewLeaf: { Museum, Villagers, Catalogued } } = userData;
	const Furniture: any = Catalogued ? Catalogued.Furniture : {};
	const inputClassName = classNames('acc-dashboard-input', {
		'mobile-adjust': IS_MOBILE
	});

	const getVillagers = (villagerList: string[]) => {
		if (!villagerList) {
			return [];
		}

		return villagerList.map((villagerName) => AllVillagers.find(({ Name }) => Name === villagerName));
	};

	const copyToClipboard = (e) => {
		href.select();
		document.execCommand('copy');
		e.target.focus();
		growl.current.show({
			severity: 'success',
			summary: 'Copied',
			detail: 'Copied address to clipboard'
		});
	};
	return (
		<div className="p-grid">
			<Growl ref={growl} />
			<div className="p-col-12">
				<Panel className="card" header="My Details">
					<div className="p-grid">
						<div className={`p-col-6 p-md-3 ${inputClassName}`}>
							<h1>Mayor Name</h1>
							<Inplace closable={true} disabled={disabled}>
								<InplaceDisplay>
									{userData.Name} {!disabled && <i className="fas fa-pencil-alt" />}
								</InplaceDisplay>
								<InplaceContent>
									<InputText
										id="MayorName"
										value={userData.Name || ''}
										onChange={(e) => setUserData({ Name: e.currentTarget.value })}
									/>
								</InplaceContent>
							</Inplace>
						</div>
						<div className={`p-col-6 p-md-3 ${inputClassName}`}>
							<h1>Town Name </h1>
							<Inplace closable={true} disabled={disabled}>
								<InplaceDisplay>
									{userData.NewLeaf.TownName} {!disabled && <i className="fas fa-pencil-alt" />}
								</InplaceDisplay>
								<InplaceContent>
									<InputText
										id="TownName"
										value={userData.NewLeaf.TownName || ''}
										onChange={(e) =>
											setUserData({
												NewLeaf: { ...userData.NewLeaf, TownName: e.currentTarget.value }
											})}
									/>
								</InplaceContent>
							</Inplace>
						</div>
						<div className={`p-col-12 p-md-6 ${inputClassName}`}>
							<h1>Friend Code</h1>
							<Inplace closable={true} disabled={disabled}>
								<InplaceDisplay>
									{userData.NewLeaf.FriendCode || 'Unknown'}{' '}
									{!disabled && <i className="fas fa-pencil-alt" />}
								</InplaceDisplay>
								<InplaceContent>
									<InputText
										id="friendCode"
										value={userData.NewLeaf.FriendCode || ''}
										type="text"
										onChange={(e) =>
											setUserData({
												NewLeaf: { ...userData.NewLeaf, FriendCode: e.currentTarget.value }
											})}
									/>
								</InplaceContent>
							</Inplace>
						</div>
					</div>
				</Panel>
			</div>

			<div className="p-col-12">
				<Panel header="Shareable Link" className="card">
					<p>
						Want to share your town? The link below will allow people to look at a read only verison of this
						page!
					</p>
					<div>
						<InputText
							style={{ width: IS_MOBILE ? '100%' : '90%', marginTop: '10px' }}
							disabled
							value={`https://newleaf.accompanion.net/town/${userData.GoogleId}`}
						/>
						<input
							ref={(el) => (href = el)}
							style={{ display: 'none' }}
							value={`https://newleaf.accompanion.net/town/${userData.GoogleId}`}
						/>
						{document.queryCommandSupported && (
							<Button
								style={{ marginTop: IS_MOBILE ? '3px' : '-3px', width: IS_MOBILE ? '100%' : 'auto' }}
								icon="fas fa-clipboard-check"
								label={IS_MOBILE ? 'Copy to Clipboard' : ''}
								onClick={copyToClipboard}
							/>
						)}
					</div>
				</Panel>
			</div>
			<div className="p-col-12">
				<Panel toggleable={true} header="My Villagers" className="card">
					{getVillagers(Villagers).map((v) => (
						<div className="dashboard-villager" key={v.Name} onClick={() => setVillagerModal(v.Name)}>
							<VillagerIcon size="small" villager={v} />
						</div>
					))}
				</Panel>
			</div>
			<TownPanel
				totalValue={Fishes.length}
				currentValue={Catalogued ? Catalogued.Fishes.length : 0}
				title="Fishes Caught"
			/>
			<TownPanel
				totalValue={Fishes.length}
				currentValue={Museum ? Museum.Fishes.length : 0}
				title="Fishes Donated"
			/>
			<TownPanel
				totalValue={Bugs.length}
				currentValue={Catalogued ? Catalogued.Bugs.length : 0}
				title="Bugs Caught"
			/>
			<TownPanel totalValue={Bugs.length} currentValue={Museum ? Museum.Bugs.length : 0} title="Bugs Donated" />
			<TownPanel
				totalValue={Fossils.length}
				currentValue={Museum ? Museum.Fossils.length : 0}
				title="Fossils Donated"
			/>
			<TownPanel totalValue={Art.length} currentValue={Museum ? Museum.Art.length : 0} title="Artwork Donated" />
			<TownPanel
				totalValue={Songs.length}
				currentValue={Catalogued ? Catalogued.Songs.length : 0}
				title="Songs Collected"
			/>
			<TownPanel
				totalValue={Clothing.length}
				currentValue={Catalogued ? Catalogued.Clothing.length : 0}
				title="Clothing Collected"
			/>
			<TownPanel
				totalValue={Furnitures.length}
				currentValue={Furniture.Furniture ? Furniture.Furniture.length : 0}
				title="Furniture Collected"
			/>
			<TownPanel
				totalValue={Wallpapers.length}
				currentValue={Furniture.Wallpapers ? Furniture.Wallpapers.length : 0}
				title="Wallpaper Collected"
			/>
			<TownPanel
				totalValue={Flooring.length}
				currentValue={Furniture.Flooring ? Furniture.Flooring.length : 0}
				title="Flooring Collected"
			/>
			<TownPanel
				totalValue={Gyroids.length}
				currentValue={Furniture.Gyroids ? Furniture.Gyroids.length : 0}
				title="Gyroids Collected"
			/>
			<TownPanel
				totalValue={Papers.length}
				currentValue={Furniture.Paper ? Furniture.Paper.length : 0}
				title="Paper Collected"
			/>
		</div>
	);
};

export default Town;
