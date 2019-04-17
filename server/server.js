import express from 'express';
import bodyParser from 'body-parser';
import voteRoutes from './routes/voteRoutes';
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// PORT
const port = process.env.PORT || 3000;

app.use('/api/v1/votes', voteRoutes);

app.use('*', (req, res) => res.status(404).send({
  status: 404,
  message: 'URL NOT FOUND!',
}));
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;