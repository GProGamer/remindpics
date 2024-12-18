import jwt from "jsonwebtoken";

const secret = process.env.SECRET_JWT;

const auth = async (req, res, next) => {
  try {

    console.log("req", req);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log("Hubo un error", error);
    res.status(401).json({ message: "No autorizado" });
  }
};

export default auth;
