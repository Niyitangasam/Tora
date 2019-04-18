import jwt from 'jsonwebtoken';
import dbCon from '../config/connection';

const Auth = {
    async verifyToken(req, res, next) {
        const token = req.headers['auth-access'];
        if (!token) {
            return res.status(401).send({ status: 401, error: 'No token was provided' });
        }
        try {
            const decoded = await jwt.verify(token, process.env.SECRET);
            const text = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await dbCon.query(text, [decoded.id]);
            if (!rows[0]) {
                return res.status(403).send({ status: 403, error: 'The token you provided is invalid' });
            }
            req.user = { id: decoded.id, firstname: decoded.firstname, lastname: decoded.lastname, role: decoded.isadmin };
            next();
        } catch (error) {
            return res.status(400).send({ status: 400, error });
        }
        return true;
    },
};

export default Auth;