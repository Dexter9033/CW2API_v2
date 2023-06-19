import Router, { RouterContext } from "koa-router"
import bodyParser from "koa-bodyparser"

//load local file
import * as model from '../models/cats'
import { basicAuth } from "../controllers/auth"

//create router path
const router = new Router({ prefix: '/api/v1/cats' })

const getAll = async (ctx: RouterContext) => {
  const articles = await model.getAll()
  if (articles.length) {
    ctx.body = articles
  } else {
    ctx.body = {}
  }
}

const getById = async (ctx: RouterContext) => {
  const id = ctx.params.id
  const article = await model.getById(id)
  if (article.length) {
    ctx.body = article[0]
  } else {
    ctx.status = 404
  }
}

async function createArticle(ctx) {
  const body = ctx.request.body
  const result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  }
}

async function deleteArticle(ctx) {
  const id = ctx.params.id
  const result = await model.deleteById(id)
  if (result) {
    ctx.status = 201
    ctx.body = `Article with id ${id} deleted`
  }
}

async function updateArticle(ctx) {
  const body = ctx.request.body
  const id = ctx.params.id
  const result = await model.update(body, id)
  if (result) {
    ctx.status = 201
    ctx.body = `Article with id ${id} updated`
  }
}


router.get('/', getAll)
router.get('/:id([0-9]{1,})', getById)
router.post('/', bodyParser(), createArticle)
router.del('/:id([0-9]{1,})', deleteArticle)
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle)

export { router }