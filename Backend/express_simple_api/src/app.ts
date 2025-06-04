import express from 'express'
import { characterRouter } from './character/character.routes.js'

const app = express()
app.use(express.json())

app.use('/api/characters', characterRouter)

app.use((_, res) =>{
  res.status(404).json({ message: 'Resource not Found' })
  return
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})