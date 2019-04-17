import dbCon from './connection';

const dropAllTables = async () => {
  const client = await dbCon.connect();
  try {
    const dropTables = 'DROP TABLE IF EXISTS votes, candidates, parties, offices, users';
    await client.query(dropTables);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
const Parties = async () => {
  const client = await dbCon.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS parties
    (
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(150) NOT NULL,
      hqAddress VARCHAR(150) NOT NULL,
      logoUrl VARCHAR(500) NOT NULL
    );`;
    await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
const Offices = async () => {
  const client = await dbCon.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS offices
    (
      id SERIAL PRIMARY KEY NOT NULL,
      type VARCHAR(150) NOT NULL,
      name VARCHAR(150) NOT NULL
    );`;
    await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};
const Users = async () => {
  const client = await dbCon.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS users
    (
      id SERIAL PRIMARY KEY NOT NULL,
      firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      othername VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      isAdmin BOOLEAN
    );`;
    await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const Candidates = async () => {
  const client = await dbCon.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS candidates
    (
      id SERIAL NOT NULL UNIQUE, 
      office_id INTEGER REFERENCES  offices(id) ON DELETE CASCADE,
      party_id INTEGER REFERENCES parties(id) ON DELETE CASCADE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      PRIMARY KEY (user_id ,office_id)
    );`;
    await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};

const Votes = async () => {
  const client = await dbCon.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS votes 
    (
   id  SERIAL NOT NULL,
   createdOn  Date ,
   createdBy  INTEGER REFERENCES users(id) ON DELETE CASCADE,
   office  INTEGER REFERENCES offices(id) ON DELETE CASCADE,
   candidate INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
   PRIMARY KEY (office ,createdBy)
    );`;
    await client.query(query);
  } catch (error) {
    throw error;
  } finally {
    client.release();
  }
};


(async () => {
  await dropAllTables();
  await Parties();
  await Users();
  await Offices();
  await Candidates();
  await Votes();
  console.log('tables created');
})().catch((err) => {
  console.log(err);
});