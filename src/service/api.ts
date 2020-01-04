import { IPlayer } from '../lambdas/app/interfaces/IPlayer';

export class ApiService {
	private static BASE_URL = `/.netlify/functions/server/player`;

	static async getTown(id: string): Promise<IPlayer> {
		const url = `${ApiService.BASE_URL}/town/${id}`;
		try {
			const response = await fetch(url);
			return await response.json();
		} catch (e) {
			console.log(e);
			return {
				GoogleId: '110912679983683131652',
				Name: 'Paul Endri',
				Email: 'abrecan.eyndrill@gmail.com',
				NewLeaf: {
					FriendCode: 'test',
					Museum: {
						Fishes: [ 'Bitterling', 'Crucian Carp', 'Koi', 'Carp', 'Dace', 'Barbel Steed', 'Goldfish' ],
						Bugs: [ 'Bagworm', 'Fruit Beetle' ],
						Art: [
							'Great Sculpture',
							'Motherly Sculpture',
							'Robust Sculpture',
							'Valiant Sculpture',
							'Moving Painting',
							'Nice Painting',
							'Beautiful Statue',
							'Ancient Statue',
							'Moody Painting',
							'Jolly Painting',
							'Graceful Painting',
							'Mystic Sculpture',
							'Gallant Sculpture',
							'Neutral Painting',
							'Perfect Painting',
							'Proper Painting',
							'Quaint Painting',
							'Scary Painting',
							'Serene Painting',
							'Scenic Painting',
							'Solemn Painting',
							'Warm Painting',
							'Wistful Painting',
							'Wild Painting',
							'Worthy Painting'
						],
						Fossils: [],
						DeepSea: [ 'Oyster', 'Red King Crab' ]
					},
					Catalogued: {
						Furniture: { Furniture: [], Gyroids: [], Wallpapers: [], Flooring: [], Paper: [] },
						Clothing: [
							'Basketball Shoes',
							'Ballet Slippers',
							'Armor Shoes',
							'Argyle Tights',
							'Daisy Umbrella',
							'Busted Umbrella',
							'Blue Dot Parasol',
							'Beach Umbrella',
							'Forest Umbrella',
							'Gelatto Umbrella',
							'Gracie Umbrella',
							'Green Umbrella',
							'Blue Frames',
							"Big Bro's Mustache",
							'Bandage',
							'Ballroom Mask',
							"Bad Bro's Stache",
							"Doctor's Mirror",
							'Facial Mask',
							'Blue Dotted Dress',
							'Butterfly Dress',
							'Casual Outfit',
							'Blossoming Dress',
							'Bathrobe',
							'Alpinist Dress',
							'Black Rain Boots',
							'Blue Sneakers',
							'Bobby Socks',
							'Climbing Shoes',
							'Callie Tights',
							'Callie Shoes',
							'Flower Loafers',
							'Gladiator Sandals',
							'Dress Socks',
							'Colorful Socks',
							'Coloful Sneakers',
							'Clogs',
							'Cinnamoroll Shoes',
							'Checkered Socks',
							'Pompompurin Shoes',
							'My Melody Shoes',
							'Marie Tights',
							'Marie Shoes',
							'Ninja Sandals'
						],
						Fishes: [
							'Bitterling',
							'Crucian Carp',
							'Koi',
							'Stringfish',
							'Carp',
							'Black Bass',
							'Horse Mackerel',
							'Red Snapper',
							'Freshwater Goby',
							'Dace',
							'Barbel Steed',
							'Goldfish'
						],
						Bugs: [
							'Dung Beetle',
							'Wharf Roach',
							'Mole Cricket',
							'Pill Bug',
							'Hermit Crab',
							'Fly',
							'Bee',
							'Ant',
							'Bagworm',
							'Fruit Beetle'
						],
						Art: [],
						Fossils: [],
						DeepSea: [ 'Oyster', 'Turban Shell', 'Acorn Barnacle', 'Seaweed', 'Red King Crab' ],
						Songs: []
					},
					Villagers: [ 'Admiral', 'Alfonso', 'Amelia', 'Apollo', 'Apple', 'Anicotti', 'Ankha', 'Bam' ],
					Projects: [ 'Café', 'Campsite' ],
					TownName: 'Aidyn'
				}
			};
		}
	}

	static async getPlayer(email: string): Promise<Partial<IPlayer>> {
		const url = `${ApiService.BASE_URL}/${email}`;
		try {
			const response = await fetch(url);
			return await response.json();
		} catch (e) {
			console.log(e);
			return null;
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
