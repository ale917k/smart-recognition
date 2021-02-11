const jwt = require("jsonwebtoken");
const redis = require("redis");

//Setup Redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.JWT_PSW, { expiresIn: "2 days" });
};

const setToken = (key, value) => {
  return Promise.resolve(redisClient.set(key, value));
};

const createSessions = (user) => {
  //JWT token and user data
  const { id, email } = user;
  const token = signToken(email);
  console.log(user, token);

  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token };
    })
    .catch((err) => console.log(err));
};

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  var salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => createSessions(user[0]))
          .then((user) => res.json(user));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister,
};
