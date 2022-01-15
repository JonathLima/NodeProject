import express from 'express'
import path from 'path'
import routes from './routes'

const app = express()

app.use(routes);

// rota estática para imagens na pasta raiz uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333, () => {
  console.log("🚀 Server started in http://localhost:3333/")

}).on("error", (e) => {
   console.log("Error to start server!", e.message)
});