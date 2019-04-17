import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/users';
import candidates from './routes/candidates';
import parties from './routes/parties.routes';
import voteRoutes from './routes/vote.routes';
import officeRoutes from './routes/office.routes';


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// PORT
const port = process.env.PORT || 3000;

app.use('/api/v1/votes', voteRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1', candidates);
app.use('/api/v1/parties', parties);
app.use('/api/v1/offices', officeRoutes);


app.use('*', (req, res) => res.status(404).send({
  status: 404,
  message: 'URL NOT FOUND!',
}));
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
