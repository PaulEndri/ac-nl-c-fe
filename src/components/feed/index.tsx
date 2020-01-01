import React from 'react';
import INature from 'ac-nl-sdk/dist/interfaces/INature';
import classNames from 'classnames';

interface FeedNatureItemProps {
	item: INature;
	type: 'bug' | 'fish';
}

interface FeedItemProps {
	onClick?: Function;
}
export const Feed: React.FC = ({ children }) => (
	<ul className="acc-feed-container">
		{React.Children.map(children, (child, key) => <React.Fragment key={key}>{child}</React.Fragment>)}
	</ul>
);

export const FeedItem: React.FC<FeedItemProps> = ({ children, onClick }) => (
	<li
		className={classNames('flex-container', { 'acc-selectable': !!onClick })}
		onClick={() => (onClick ? onClick() : null)}
	>
		<div className="flex-container">{children}</div>
		{onClick && (
			<span className="margin-auto">
				<i className="fas fa-external-link-square-alt" />
			</span>
		)}
	</li>
);

export const FeedNatureItem = ({ item, type }: FeedNatureItemProps) => (
	<FeedItem>
		<div className="acc-feed-nature-item ">
			<span className="acc-feed-icon">
				<img src={`/assets/${type}/${item.Name}.png`} style={{ height: '36px', width: '36px' }} />
			</span>
			<div>{item.Name}</div>
		</div>
	</FeedItem>
);
