import React from 'react';
import { connect } from 'react-redux';
import { CalenderService } from 'ac-nl-sdk';
import { Panel } from 'primereact/components/panel/Panel';
import { Feed, FeedItem, FeedNatureItem } from '../../components/feed';
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

const Dashboard = ({ date, setModal }: DashboardProps) => {
	const service = new CalenderService(date);
	const { Bugs, Fishes, Villagers, Events } = service.getAll(true);
	const cardClasses = 'dashboard-card card p-col-12';

	// p-col-5 p-md-3 p-lg-2
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
			<Panel header="Today's Fishes" toggleable={IS_MOBILE} className={`${cardClasses} p-md-3 p-lg-4`}>
				<Feed>
					{Fishes.map((f) => (
						<FeedItem key={f.Name} onClick={() => setModal(MODAL_OPTIONS.Fish, f.Name)}>
							<NatureIcon Type="fish" Name={f.Name} Size="Small" />
							<div>{f.Name}</div>
						</FeedItem>
					))}
				</Feed>
			</Panel>
			<Panel header="Today's Bugs" toggleable={IS_MOBILE} className={`${cardClasses} p-md-3 p-lg-4`}>
				<Feed>
					{Bugs.map((f) => (
						<FeedItem key={f.Name}>
							<NatureIcon Type="bug" Name={f.Name} Size="Small" />
							<div>{f.Name}</div>
						</FeedItem>
					))}
				</Feed>
			</Panel>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
