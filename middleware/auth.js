const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            return res.status(401).json({message:"unauthorized user",success:false})
        }
        else {
            console.log(data);
            req.body.userId = data.id;
            next();
        }
     })
    
}
module.exports = authenticate;