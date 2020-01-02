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
		Fossils: [ Types.String ]
	},
	Catalogued: {
		Furniture: [ Types.String ],
		Clothing: [ Types.String ],
		Fishes: [ Types.String ],
		Bugs: [ Types.String ],
		Art: [ Types.String ],
		Fossils: [ Types.String ]
	}
});

export const PlayerSchema: Schema = new Schema({
	GoogleId: {
		type: Types.String,
		unique: true
	},
	Name: Types.String,
	NewLeaf: SaveDataSchema,
	NewHorizons: SaveDataSchema
});
