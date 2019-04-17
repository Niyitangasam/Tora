import express from 'express';
import bodyParser from 'body-parser';
import voteRoutes from './routes/voteRoutes';
import userRoutes from './routes/users';
const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// PORT
const port = process.env.PORT || 3000;

app.use('/api/v1/votes', voteRoutes);
app.use('/api/v1/auth', userRoutes);

app.use('*', (req, res) => res.status(404).send({
  status: 404,
  message: 'URL NOT FOUND!',
}));
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;