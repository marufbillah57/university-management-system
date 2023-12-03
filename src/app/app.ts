import express, { Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler'
import router from './routes'
import notFound from './middleware/notFound'

const app = express()

// parsers
app.use(express.json())

app.use(cors())

// application routes
app.use('/api/v1', router)

const test = (req: Request, res: Response) => {
  const a = 10

  res.send(a)
}
app.get('/', test)

app.use(globalErrorHandler)

// Not Found
app.use(notFound)

export default app
