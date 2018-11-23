const Koa = require("koa");
const Router = require("koa-router");

const APP_PORT = 8000;

const app = new Koa();
const router = new Router();

router.get("/", async ctx => {
  ctx.body = { message: "Hello, world!" };
});

app.use(router.routes()).use(router.allowedMethods());

console.log(`Listening on :${APP_PORT}`);
app.listen(APP_PORT);
