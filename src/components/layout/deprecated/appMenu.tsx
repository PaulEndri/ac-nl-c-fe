import React, { Component } from 'react';
import AppSubMenu from './appSubmenu';

interface Props {
	model: any[];
	active: boolean;
}

export class AppMenu extends Component<Props> {
	static defaultProps = {
		model: null,
		active: false
	};

	render() {
		return (
			<AppSubMenu
				items={this.props.model}
				className="layout-menu layout-main-menu clearfix"
				menuActive={this.props.active}
				root={true}
				parentMenuItemActive={true}
			/>
		);
	}
}
