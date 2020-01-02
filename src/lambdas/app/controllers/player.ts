import { Context } from 'koa';
import { Players } from '../models/players';

export class PlayerController {
	async get(ctx: Context) {
		const { googleId } = ctx.params;

		const results = await Players.findOne({
			GoogleId: googleId
		});

		if (results) {
			ctx.body = results.toObject();
		} else {
			ctx.throw(404, `User with ID ${googleId} not found`);
		}
	}

	async create(ctx: Context) {
		const { playerName, townName, googleId } = ctx.request.body;

		const data = {
			GoogleId: googleId,
			Name: playerName,
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
					Furniture: [],
					Clothing: [],
					Fishes: [],
					Bugs: [],
					Art: [],
					Fossils: []
				}
			},
			NewHorizons: {
				TownName: townName,
				Villagers: [],
				Museum: {
					Fishes: [],
					Bugs: [],
					Art: [],
					Fossils: []
				},
				Catalogued: {
					Furniture: [],
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
		const { googleId } = ctx.params;

		const results = await Players.findOne({
			GoogleId: googleId
		});

		if (results) {
			ctx.body = await results.update(ctx.request.body);
		} else {
			ctx.throw(400, `User with ID ${googleId} not found`);
		}
	}
}
