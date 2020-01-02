import { Context } from 'koa';
import { Players } from '../models/players';

export class PlayerController {
	async get(ctx: Context) {
		const { email } = ctx.params;

		const results = await Players.findOne({
			Email: email
		});

		if (results) {
			ctx.body = results.toObject();
		} else {
			ctx.throw(404, `User with ID ${email} not found`);
		}
	}

	async create(ctx: Context) {
		const { playerName, townName, googleId, email } = ctx.request.body;

		const data = {
			GoogleId: googleId,
			Name: playerName,
			Email: email,
			NewLeaf: {
				TownName: townName,
				Villagers: [],
				Museum: {
					Fishes: [],
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
					Fossils: []
				}
			}
		};

		const result = await Players.create(data);

		if (result) {
			ctx.body = result.toObject();
		} else {
			ctx.throw(400, 'Unknown error creating player');
		}
	}

	async update(ctx: Context) {
		const { email } = ctx.params;

		const results = await Players.findOne({
			Email: email
		});

		if (results) {
			ctx.body = await results.update(ctx.request.body);
		} else {
			ctx.throw(400, `User with ID ${email} not found`);
		}
	}
}
