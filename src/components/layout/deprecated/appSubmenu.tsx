import React, { Component } from 'react';
import classNames from 'classnames';

interface Props {
	className: string;
	items: any[];
	root: boolean;
	menuActive: boolean;
	parentMenuItemActive: boolean;
}

interface State {
	activeIndex: number;
}

class AppSubMenu extends Component<Props, State> {
	static defaultProps = {
		className: null,
		items: null,
		root: false,
		layoutMode: null,
		menuActive: false,
		parentMenuItemActive: false
	};

	constructor(props) {
		super(props);
		this.state = {
			activeIndex: null
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.parentMenuItemActive === false) {
			return {
				activeIndex: null
			};
		}

		return null;
	}

	onMenuItemClick(event, item, index) {
		//avoid processing disabled items
		if (item.disabled) {
			event.preventDefault();
			return true;
		}

		// if(this.props.root && this.props.onRootItemClick) {
		//     this.props.onRootItemClick({
		//         originalEvent: event,
		//         item: item
		//     });
		// }

		//execute command
		if (item.command) {
			item.command({ originalEvent: event, item: item });
		}

		if (index === this.state.activeIndex) this.setState({ activeIndex: null });
		else this.setState({ activeIndex: index });

		// if(this.props.onMenuItemClick) {
		//     this.props.onMenuItemClick({
		//         originalEvent: event,
		//         item: item
		//     });
		// }
	}

	renderLinkContent(item) {
		let submenuIcon = item.items && <i className="fa fa-fw fa-angle-down layout-menuitem-toggler" />;
		let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>;

		return (
			<React.Fragment>
				<i className={item.icon} />
				<span>{item.label}</span>
				{submenuIcon}
				{badge}
			</React.Fragment>
		);
	}

	renderLink(item, i) {
		let content = this.renderLinkContent(item);

		return (
			<a
				href={item.url}
				onClick={(e) => this.onMenuItemClick(e, item, i)}
				target={item.target}
				onMouseEnter={(e) => {}}
				className={item.styleClass}
			>
				{content}
			</a>
		);
	}

	render() {
		const items =
			this.props.items &&
			this.props.items.map((item, i) => {
				let active = this.state.activeIndex === i;
				let styleClass = classNames(item.badgeStyleClass, { 'active-menuitem': active });
				let tooltip = this.props.root && (
					<div className="layout-menu-tooltip">
						<div className="layout-menu-tooltip-arrow" />
						<div className="layout-menu-tooltip-text">{item.label}</div>
					</div>
				);

				return (
					<li className={styleClass} key={i}>
						{item.items && this.props.root === true && <div className="arrow" />}
						{this.renderLink(item, i)}
						{tooltip}
						<AppSubMenu
							items={item.items}
							menuActive={this.props.menuActive}
							parentMenuItemActive={active}
						/>
					</li>
				);
			});

		return items ? <ul className={this.props.className}>{items}</ul> : null;
	}
}

export default AppSubMenu;
