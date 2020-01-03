import React from 'react';
import { Panel } from 'primereact/components/panel/Panel';

export const AboutView = () => (
	<div className="p-grid">
		<div className="p-col-12 p-md-8">
			<Panel header="About the Site" style={{ height: '150px' }}>
				Hi! Thanks for stopping by, this is an Animal Crossing Companion app for New Leaf: Welcome Amiibo. It's
				meant to be a one stop shop for core information such as Villager likes and dislikes, tracking museum
				information, catalog information, and more. The goal is to get this site fully functional so I can
				retrofit it and get a New Horizons site ready on launch!
			</Panel>
		</div>
		<div className="p-col-12 p-md-4 p-lg-3">
			<Panel header="Need help?" style={{ height: '150px' }}>
				Need some help? Want to let me know about a bug? Found something missing you feel must be here? We have
				a discord server, feel free to drop by!
				<a href="https://discord.gg/Fm5m9CC">
					<i className="fab fa-discord" style={{ marginLeft: '8px' }} />Our discord server!
				</a>
			</Panel>
		</div>

		<div className="p-col-6 p-md-4">
			<Panel header="Tech stack" style={{ height: '150px' }}>
				This site runs on React, Node, Typescript, Koa, and such. Hosted entirely on Netlify because I am not a
				dev ops guy :D Feel free to check out the source code at{' '}
				<a href="https://github.com/PaulEndri/ac-nl-c-fe">
					<i className="fab fa-github-square" /> Github
				</a>
			</Panel>
		</div>
		<div className="p-col-6 p-md-4">
			<Panel header="About the Author" style={{ height: '150px' }}>
				I've been developing professionally for five plus years, working in all sorts of industries and jobs. I
				love NodeJS and gaming and often find myself with one leading into the other and here we end up. This
				very much a passion project, but I have more! Feel free to check out another of my projects:{' '}
				<a href="https://fe3h.paulendri.com">A Fire Emblem: Three Houses Companion App</a>
			</Panel>
		</div>
		<div className="p-col-6 p-md-3">
			<Panel header="Coffee?" style={{ height: '150px' }}>
				This site was built on several galloons of caffeine, feel free to donate a{' '}
				<a href="https://www.buymeacoffee.com/608LHcl">
					<i className="fas fa-coffee" />cup of coffee!
				</a>{' '}
				to keep me going!
			</Panel>
		</div>
	</div>
);

export default AboutView;
