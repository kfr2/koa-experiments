const Koa = require("koa");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");

const APP_PORT = 8000;

const app = new Koa();
const router = new Router();

app.use(BodyParser());

require("./mongo")(app);

router.get("/", async ctx => {
  let name = ctx.request.query.name || "World";
  let body = ctx.request.body.name || "N/A";
  ctx.body = { message: `Hello, ${name}!`, body };
});

router.get("/people", async ctx => {
  ctx.body = await app.people.find().toArray();
});

app.use(router.routes()).use(router.allowedMethods());

console.log(`Listening on :${APP_PORT}`);
app.listen(APP_PORT);
