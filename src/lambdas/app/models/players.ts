import { Document, Schema, Model, model } from 'mongoose';
import { PlayerSchema, IPlayerModel } from '../schemas/player';

export const Players: Model<IPlayerModel> = model<IPlayerModel>('players', PlayerSchema);

export default Players;
