const Koa = require("koa");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const ObjectID = require("mongodb").ObjectID;

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

router.post("/people", async ctx => {
  ctx.body = await app.people.insert(ctx.request.body);
});

router.get("/people/:id", async ctx => {
  ctx.body = await app.people.findOne({ _id: ObjectID(ctx.params.id) });
});

router.put("/people/:id", async ctx => {
  let documentQuery = { _id: ObjectID(ctx.params.id) };
  let valuesToUpdate = ctx.request.body;
  ctx.body = await app.people.updateOne(documentQuery, {
    $set: valuesToUpdate
  });
});

router.delete("/people/:id", async ctx => {
  let documentQuery = { _id: ObjectID(ctx.params.id) };
  ctx.body = await app.people.deleteOne(documentQuery);
});

app.use(router.routes()).use(router.allowedMethods());

console.log(`Listening on :${APP_PORT}`);
app.listen(APP_PORT);
