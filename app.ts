import Koa from 'koa'
import serve from 'koa-static'
import cors from 'koa-cors'

import { router as users } from './routes/users'
import { router as cats } from './routes/cats'

const app = new Koa()

app.use(cors())
app.use(users.routes())
app.use(cats.routes())
app.use(serve('./docs'))

export default app