import { IPlayer } from '../lambdas/app/interfaces/IPlayer';

export class ApiService {
	private static BASE_URL = `/.netlify/functions/server/player`;

	static async getPlayer(email: string): Promise<Partial<IPlayer>> {
		const url = `${ApiService.BASE_URL}/${email}`;
		try {
			const response = await fetch(url);
			return await response.json();
		} catch (e) {
			console.log(e);
			return {
				Name: 'Offline User',
				Email: 'nobody@knows',
				GoogleId: '666',
				NewLeaf: {
					TownName: 'BlackHole',
					Projects: [],
					Villagers: [],
					Museum: {
						Fishes: [],
						DeepSea: [],
						Bugs: [],
						Art: [],
						Fossils: []
					},
					Catalogued: {
						Furniture: {
							Furniture: [],
							Wallpapers: [],
							Flooring: [],
							Paper: [],
							Gyroids: []
						},
						Clothing: [],
						Fishes: [],
						Bugs: [],
						Art: [],
						Fossils: [],
						DeepSea: [],
						Songs: []
					}
				}
			};
		}
	}

	static async updatePlayer(email: string, data: IPlayer): Promise<IPlayer> {
		return await fetch(`${ApiService.BASE_URL}/${email}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((res) => res.json());
	}

	static async createPlayer(googleId: string, email: string, townName: string, playerName: string): Promise<IPlayer> {
		return await fetch(`${ApiService.BASE_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				playerName,
				email,
				townName,
				googleId
			})
		}).then((res) => res.json());
	}
}

export default ApiService;
