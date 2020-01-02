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

interface DashboardProps {
	date: string;
	setModal: Function;
}

const mapStateToProps = (state) => ({
	date: getGlobalDate(state)
});

const mapDispatchToProps = {
	setModal
};

interface DashboardNaturePanelProps {
	iconKey: 'bug' | 'fish';
	modal: MODAL_OPTIONS;
	title: string;
	data: any[];
}
const DashboardNaturePanel = ({ title, iconKey, data, modal }: DashboardNaturePanelProps) => {
	const dispatch = useDispatch();

	return (
		<Panel header={title} toggleable={IS_MOBILE} className="dashboard-card card p-col-12 p-md-4 p-lg-3">
			<Feed>
				{data.map((f) => (
					<FeedItem key={f.Name} onClick={() => dispatch(setModal(modal, f.Name))}>
						<NatureIcon Type={iconKey} Name={f.Name} Size="Small" />
						<div>{f.Name}</div>
					</FeedItem>
				))}
			</Feed>
		</Panel>
	);
};
const Dashboard = ({ date, setModal }: DashboardProps) => {
	const service = new CalenderService(date);
	const { Bugs, Fishes, Villagers, Events } = service.getAll(true);
	const cardClasses = 'dashboard-card card p-col-12';

	return (
		<div className="p-grid p-justify-even">
			<div className="p-col-12 p-md-3 p-lg-3">
				<div className="p-grid">
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
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
