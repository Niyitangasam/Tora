import dbCon from '../config/connection';
import moment from 'moment';

export default class vote {

  constructor(data = null) {
    this.data = data;
    this.result = null;
    this.error = null;
  }

  async voteCandidate() {
    const {
    createdBy, office, candidate,
    } = this.data;
    const values = [moment().format('YYYY-MM-DD'), createdBy, office, candidate];
    try {
     
      const { rows } = await dbCon.query('INSERT INTO votes(createdOn, createdBy, office, candidate) VALUES($1, $2, $3, $4) returning office, candidate, createdBy As voter', values);
      this.result = rows;
      return true;
    } catch (error) {
      this.error = error;
      return false;
    }
  }
}