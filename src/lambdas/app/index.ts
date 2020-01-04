import Koa from 'koa';
import mongoose from 'mongoose';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import { PlayerController } from './controllers/player';

dotenv.config();

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING || '');
mongoose.connection.on('error', console.error);

const app = new Koa();
const router = new KoaRouter({
	prefix: '/.netlify/functions/server'
});
const controller = new PlayerController();

// Only four routes, we can handle it for now.
router
	.get('/', (ctx) => (ctx.body = 'HELLO'))
	.get('/player/town/:id', controller.getById)
	.get('/player/:email', controller.get)
	.post('/player', controller.create)
	.put('/player/:email', controller.update);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

// if (process.env.NODE_ENV === 'local') {
// 	app.listen(process.env.PORT, () => {
// 		console.log(`App succesfully started on http://localhost:${process.env.PORT}`);
// 	});
// }

export default app;
