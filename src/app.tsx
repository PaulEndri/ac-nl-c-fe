import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';
import Home from './views/home/';
import Layout from './components/layout';
import VillagersView from './views/villagers';
import FishesView from './views/fishes';

function App() {
	return (
		<Layout>
			<Route exact path="/" component={Home} />
			<Route exact path="/villagers" component={VillagersView} />
			<Route exact path="/fishes" component={FishesView} />
			{/* <Route exact path="/house/:house" component={HouseView} />
                <Route exact path="/house/:house/character/:character" component={CharacterView} />
                <Route exact path="/about" component={About} />
                <Route exact path="/characters" component={CharactersView} />
                <Route exact path="/classes" component={ClassesView} />
                <Route exact path="/recruitment" component={RecruitmentTable} />
                <Route exact path="/lostItems" component={LostItemsView} />
                <Route exact path="/characterPlanner" component={CharacterPlanner} /> */}
		</Layout>
	);
}

export default App;
