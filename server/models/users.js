import dbCon from '../config/connection';
import Helper from '../helpers/helper';

export default class user {

  constructor(data = null) {
    this.data = data;
    this.result = null;
    this.error = null;
  }

  async createUser() {
    const {
    firstname, lastname, othername, email, password, isadmin
    } = this.data;
    const hashedPassword = Helper.hashPassword(password);
    const values = [firstname, lastname, othername, email, hashedPassword, isadmin];
    try {
     
      const { rows } = await dbCon.query('INSERT INTO users(firstname, lastname, othername, email, password, isadmin) VALUES($1, $2, $3, $4, $5, $6) returning id, firstname, lastname, othername, email, isadmin', values);
      this.result = rows;
      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }
}