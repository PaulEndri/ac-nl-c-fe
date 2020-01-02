import { IPlayerModel } from '../lambdas/app/schemas/player';

export class ApiService {
	private static BASE_URL = '/.netlify/functions/server/player';

	static async getPlayer(googleId: string): Promise<IPlayerModel> {
		return fetch(`${ApiService.BASE_URL}/${googleId}`).then((res) => res.json());
	}

	static async updatePlayer(googleId: string, data: IPlayerModel): Promise<IPlayerModel> {
		return await fetch(`${ApiService.BASE_URL}/${googleId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then((res) => res.json());
	}

	static async createPlayer(
		googleId: string,
		email: string,
		townName: string,
		playerName: string
	): Promise<IPlayerModel> {
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
