import dbCon from '../config/connection';

class Candidate {
    constructor(data){
        this.data = data;
        this.result = null;
        this.error = null;
    }

    async createcandidate() {
        const { officeId, partyId, userId } = this.data;
        const values = [officeId, partyId, userId];
        const sql = `
        INSERT INTO candidates(office_id, party_id, user_id)
        VALUES($1, $2, $3)
        returning *
        `;

        try {
            const { rows } = await dbCon.query(sql, values);
            this.result = rows;
            return true;
        }
        catch(error) {
            this.error = error;
            return false;
        }
    }
}

export default Candidate;