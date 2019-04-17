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
}

export default Office;
