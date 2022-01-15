import express from 'express'
import routes from './routes'

const app = express()

app.use(routes);






app.listen(3333, () => {
  console.log("🚀 Server started in http://localhost:3333/")

}).on("error", (e) => {
   console.log("Error to start server!", e.message)
});