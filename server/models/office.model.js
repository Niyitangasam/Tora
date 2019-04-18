import dbCon from '../config/connection';

class Office {
  constructor(data = null) {
    this.data = data;
    this.result = null;
    this.error = null;
  }

  async createOffice() {
    const {
        type, name,
    } = this.data;

    const values = [type, name];

    try {
      const { rows } = await dbCon.query('INSERT INTO offices(type, name) VALUES ($1, $2) returning name, type', values);
      this.result = rows;
      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  async getResults() {
    const value = this.data;
    const dataToReturn = [];
    try {
      const { rows } = await dbCon.query('SELECT  office ,candidate, CAST(COUNT(*)AS Int) AS result FROM votes  GROUP BY candidate, office ');
      for (let votes = 0; votes < rows.length; votes += 1) {
        if (rows[votes].office === parseInt(value, 10)) {
          dataToReturn.push(rows[votes]);
        }
      }
      this.result = dataToReturn;
       return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  async findAll() {
    try {
      const { rows } = await dbCon.query('SELECT * FROM offices', []);
      this.result = rows;
      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  async findByName() {
    const value = this.data;
    try {
      const { rows } = await dbCon.query('SELECT * FROM offices WHERE name=$1', [value]);
      this.result = rows;
      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }
}

export default Office;
