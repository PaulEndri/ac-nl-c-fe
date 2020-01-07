import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { CalenderService } from 'ac-nl-sdk';
import { Panel } from 'primereact/components/panel/Panel';
import { Feed, FeedItem } from '../../components/feed';
import { getGlobalDate } from '../../store/global/selectors';
import { setModal } from '../../store/modals/actions';
import NatureIcon from '../../components/natureIcon';
import VillagerIcon from '../../components/villagerIcon';
import { IS_MOBILE } from '../../components/helpers/isMobile';
import { MODAL_OPTIONS } from '../../store/modals/reducer';
import { getUserData } from '../../store/user/selectors';
import { IUserState } from '../../store/user/reducer';
import IsLoggedIn from '../../components/helpers/isLoggedIn';
import { NatureSource } from '../../types/nature';

interface DashboardProps {
	date: string;
	setModal: Function;
	userData: IUserState;
}

const mapStateToProps = (state) => ({
	date: getGlobalDate(state),
	userData: getUserData(state)
});

const mapDispatchToProps = {
	setModal
};

interface DashboardNaturePanelProps {
	iconKey: NatureSource;
	modal: MODAL_OPTIONS;
	title: string;
	data: any[];
}
const DashboardNaturePanel = ({ title, iconKey, data, modal }: DashboardNaturePanelProps) => {
	const dispatch = useDispatch();

	if (data.length === 0) {
		return null;
	}

	return (
		<div className="p-col-12 p-md-4 p-lg-3">
			<Panel header={title} toggleable={IS_MOBILE} className="dashboard-card card">
				<Feed>
					{data.map((f) => (
						<FeedItem key={f.Name} onClick={() => dispatch(setModal(modal, f.Name))}>
							<NatureIcon Type={iconKey} Name={f.Name} Size="Small" />
							<div style={{ marginLeft: '8px' }}>{f.Name}</div>
						</FeedItem>
					))}
				</Feed>
			</Panel>
		</div>
	);
};
const Dashboard = ({ date, setModal, userData }: DashboardProps) => {
	const service = new CalenderService(date);
	const { Bugs, Fishes, Villagers, Events, DeepSea } = service.getAll(true);
	const cardClasses = 'dashboard-card card p-col-12';

	return (
		<div className="p-grid p-justify-even">
			<div className="p-col-12 p-md-3 p-lg-3">
				<div className="p-grid" style={{ padding: '7px' }}>
					<Panel header="Today's Birthdays" className={cardClasses}>
						<Feed>
							{Villagers.map((f, i) => (
								<FeedItem onClick={() => setModal(MODAL_OPTIONS.Villager, f.Name)} key={f.Name}>
									<div>
										<VillagerIcon villager={f} size="small" />
									</div>
									<div> {f.Name}</div>
								</FeedItem>
							))}
						</Feed>
					</Panel>
					<Panel header="Today's Events" className={cardClasses}>
						<Feed>{Events.map((f) => <FeedItem key={f.Name}>{f.Name}</FeedItem>)}</Feed>
					</Panel>
				</div>
			</div>
			<IsLoggedIn>
				<DashboardNaturePanel
					title="Available Uncaught Fishes"
					data={Fishes.filter((f) => !userData.NewLeaf.Catalogued.Fishes.includes(f.Name))}
					iconKey="fish"
					modal={MODAL_OPTIONS.Fish}
				/>
				<DashboardNaturePanel
					title="Available Uncaught Bugs"
					data={Bugs.filter((f) => !userData.NewLeaf.Catalogued.Bugs.includes(f.Name))}
					iconKey="bug"
					modal={MODAL_OPTIONS.Bug}
				/>
				<DashboardNaturePanel
					title="Available Uncaught Deep Sea Finds"
					data={DeepSea.filter((f) => !userData.NewLeaf.Catalogued.DeepSea.includes(f.Name))}
					iconKey="deepsea"
					modal={MODAL_OPTIONS.DeepSea}
				/>
			</IsLoggedIn>
			<DashboardNaturePanel
				title="Today's Mainland Fishes"
				data={Fishes.filter((f) => f.Location !== 'Island')}
				iconKey="fish"
				modal={MODAL_OPTIONS.Fish}
			/>
			<DashboardNaturePanel
				title="Today's Mainland Bugs"
				data={Bugs.filter((b) => b.Location.indexOf('Island') < 0)}
				iconKey="bug"
				modal={MODAL_OPTIONS.Bug}
			/>
			<DashboardNaturePanel
				title="Today's Deep Sea Finds"
				data={DeepSea}
				iconKey="deepsea"
				modal={MODAL_OPTIONS.DeepSea}
			/>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
