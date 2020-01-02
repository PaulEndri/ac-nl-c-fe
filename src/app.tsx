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
import Persistance from './components/persistanceComponent';
import ClothingView from './views/clothing';
import FurnitureView from './views/furniture';
import PaperView from './views/paper';
import FlooringView from './views/flooring';
import WallpaperView from './views/wallpaper';
import GyroidView from './views/gyroids';

function App() {
	return (
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

			{/* <Route exact path="/house/:house" component={HouseView} />
                <Route exact path="/house/:house/character/:character" component={CharacterView} />
                <Route exact path="/about" component={About} />
                <Route exact path="/characters" component={CharactersView} />
                <Route exact path="/classes" component={ClassesView} />
                <Route exact path="/recruitment" component={RecruitmentTable} />
                <Route exact path="/lostItems" component={LostItemsView} />
                <Route exact path="/characterPlanner" component={CharacterPlanner} /> */}
			<Persistance />
		</Layout>
	);
}

export default App;
