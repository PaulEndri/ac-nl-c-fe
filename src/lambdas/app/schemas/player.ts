import { Document, Schema } from 'mongoose';
import { IPlayer } from '../interfaces/IPlayer';
const { Types } = Schema;

export interface IPlayerModel extends IPlayer, Document {}

export const SaveDataSchema = new Schema({
	TownName: Types.String,
	Villagers: [ Types.String ],
	Museum: {
		Fishes: [ Types.String ],
		Bugs: [ Types.String ],
		Art: [ Types.String ],
		Fossils: [ Types.String ],
		DeepSea: [ Types.String ]
	},
	Catalogued: {
		Furniture: {
			Furniture: [ Types.String ],
			Gyroids: [ Types.String ],
			Wallpapers: [ Types.String ],
			Flooring: [ Types.String ],
			Paper: [ Types.String ]
		},
		Clothing: [ Types.String ],
		Fishes: [ Types.String ],
		Bugs: [ Types.String ],
		Art: [ Types.String ],
		Fossils: [ Types.String ],
		DeepSea: [ Types.String ]
	}
});

export const PlayerSchema: Schema = new Schema({
	GoogleId: {
		type: Types.String,
		unique: true
	},
	Name: Types.String,
	Email: Types.String,
	NewLeaf: SaveDataSchema
});
