import React from 'react';
import { connect } from 'react-redux';
import { CalenderService } from 'ac-nl-sdk';
import { Panel } from 'primereact/components/panel/Panel';
import { Feed, FeedItem, FeedNatureItem } from '../../components/feed';
import { getGlobalDate } from '../../store/global/selectors';

interface DashboardProps {
	date: string;
}

const mapStateToProps = (state): DashboardProps => ({
	date: getGlobalDate(state)
});

const Dashboard = ({ date }: DashboardProps) => {
	const service = new CalenderService(date);
	const { Bugs, Fishes, Villagers, Events } = service.getAll();
	const cardClasses = 'dashboard-card card';
	// p-col-5 p-md-3 p-lg-2
	return (
		<div className="p-grid p-justify-even">
			<div className="p-col-12 p-md-2 p-lg-3">
				<div className="p-grid">
					<Panel header="Today's Birthdays" className={`${cardClasses} p-col-6 p-sm-12`}>
						<Feed>{Villagers.map((f) => <FeedItem key={f.Name}>{f.Name}</FeedItem>)}</Feed>
					</Panel>
					<Panel header="Today's Events" className={`${cardClasses} p-col-6 p-sm-12`}>
						<Feed>{Events.map((f) => <FeedItem key={f.Name}>{f.Name}</FeedItem>)}</Feed>
					</Panel>
				</div>
			</div>
			<Panel header="Today's Fishes" className={`${cardClasses} p-col-12 p-md-3 p-lg-4`}>
				<Feed>{Fishes.map((f) => <FeedNatureItem item={f} type="fish" key={f.Name} />)}</Feed>
			</Panel>
			<Panel header="Today's Bugs" className={`${cardClasses} p-col-12 p-md-3 p-lg-4`}>
				<Feed>{Bugs.map((f) => <FeedNatureItem item={f} type="bug" key={f.Name} />)}</Feed>
			</Panel>
		</div>
	);
};

export default connect(mapStateToProps)(Dashboard);
