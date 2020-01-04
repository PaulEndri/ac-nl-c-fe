import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Home from './views/home/';
import Layout from './components/layout';
import VillagersView from './views/villagers';
import FishesView from './views/fishes';
import BugsView from './views/bugs';
import FossilsView from './views/fossils';
import ArtView from './views/art';
import Persistance from './components/persistance';
import ClothingView from './views/clothing';
import FurnitureView from './views/furniture';
import PaperView from './views/paper';
import FlooringView from './views/flooring';
import WallpaperView from './views/wallpaper';
import GyroidView from './views/gyroids';
import DashboardView from './views/dashboard';
import AboutView from './views/about';
import AccountView from './views/account';
import DeepSeaView from './views/deepsea';
import SongView from './views/songs';
import ProjectsView from './views/projects';
import TownView from './views/town';

const App = () => (
	<Layout>
		<Route exact path="/" component={Home} />
		<Route exact path="/villagers" component={VillagersView} />
		<Route exact path="/fishes" component={FishesView} />
		<Route exact path="/bugs" component={BugsView} />
		<Route exact path="/fossils" component={FossilsView} />
		<Route exact path="/art" component={ArtView} />
		<Route exact path="/clothing" component={ClothingView} />
		<Route exact path="/furniture" component={FurnitureView} />
		<Route exact path="/paper" component={PaperView} />
		<Route exact path="/flooring" component={FlooringView} />
		<Route exact path="/wallpaper" component={WallpaperView} />
		<Route exact path="/gyroids" component={GyroidView} />
		<Route exact path="/town" component={DashboardView} />
		<Route exact path="/about" component={AboutView} />
		<Route exact path="/account" component={AccountView} />
		<Route exact path="/deepSea" component={DeepSeaView} />
		<Route exact path="/songs" component={SongView} />
		<Route exact path="/projects" component={ProjectsView} />
		<Route exact path="/town/:id" component={TownView} />

		<Persistance />
	</Layout>
);

export default App;
