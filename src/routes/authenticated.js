import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    // Get token from request headers
    const token = req.headers.authorization?.split(' ')[1];

    // Check if there is a token
    if (!token) {
        return res.status(401).send('No token, go get one.');
    }

    // TODO: Fix this lol
    const jwtSecret = process.env.JWT_SECRET || 'superspsfpssecretttkeyeeyyyy';

    // Decode and verify the token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, jwtSecret,);
    } catch (err) {
        console.log(err);
        return res.status(500).end();
    }

    // Check if there is a decoded token.. there always should be?
    if (!decodedToken) return res.status(401).send('no token? you should get one.');
};