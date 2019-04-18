import db from '../config/connection';
import Helper from '../helpers/helper';


class Parties {
  // newParty
  static async createParty(req, res) {
    const checkInputs = [];

    checkInputs.push(Helper.name(req.body.name, true));
    checkInputs.push(Helper.name(req.body.hqaddress, true));

    for (let i = 0; i < checkInputs.length; i += 1) {
      if (checkInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkInputs[i].error,
        });
      }
    }
    const alreadyExist = "SELECT * FROM parties WHERE name=$1 ";
    const query = await db.query(alreadyExist, [req.body.name]);
    if (query.rowCount>0){
        return res.status(400).json({
            status: 422,
            error: 'party already registered',
          });
    }
    const text = `INSERT INTO
            parties("name", "hqaddress", "logourl")
            VALUES($1, $2, $3)
            returning id, "name", "hqaddress", "logourl"`;
    const values = [
      req.body.name,
      req.body.hqaddress,
      req.body.logourl,
    ];

    try {
      const {
        rows
      } = await db.query(text, values);

      if (rows.length > 0) {
        return res.status(201).json({
          status: 201,
          data: rows[0],
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'party not registered',
      });
    }
  }

  // Get all Parties
  static async allParties(req, res) {
    try {
      const {
        rows,
      } = await db.query('SELECT * FROM parties');
      if (rows.length > 0) {
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: 'party not found!',
      });
    }
  }

  static async deleteParty (req, res) {
    const { rows } = await db.query(`SELECT * FROM parties WHERE id = ${req.params.partyId}`);
    if(rows.length<=0){
      return res.status(404).send({status:404, message: `party ${req.params.partyId} does not exist`});
    }

    const sql = `DELETE FROM parties WHERE id = ${req.params.partyId}`;
    try{
      await db.query(sql);
      return res.status(202).send({status:202, message: `party number ${req.params.partyId} is deleted`});
    }
    catch(error){
      return res.status(404).send({status:404, message: error});
    }
  }

}
export default Parties;
