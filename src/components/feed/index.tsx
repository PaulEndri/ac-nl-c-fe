import React, { FunctionComponent } from 'react';
import iNature from 'ac-nl-sdk/dist/interfaces/iNature';

interface FeedNatureItemProps {
	item: iNature;
	type: 'bug' | 'fish';
}

export const Feed: FunctionComponent = ({ children }) => (
	<ul className="acc-feed-container">
		{React.Children.map(children, (child, key) => <React.Fragment key={key}>{child}</React.Fragment>)}
	</ul>
);

export const FeedItem: FunctionComponent = ({ children }) => <li>{children}</li>;

export const FeedNatureItem = ({ item, type }: FeedNatureItemProps) => (
	<FeedItem>
		<div className="acc-feed-nature-item flex-container">
			<span className="acc-feed-icon">
				<img src={`/assets/${type}/${item.Name}.png`} style={{ height: '36px', width: '36px' }} />
			</span>
			<div>{item.Name}</div>
		</div>
	</FeedItem>
);
