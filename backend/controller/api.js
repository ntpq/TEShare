const db = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  const { name } = req.body;
  const shareholder = await db.Shareholder.findOne({
    where: { name: name },
  });
  const data = await db.ShareholderHasStock.findAll({
    where: { shareholder_id: shareholder.id },
    include: [{ model: db.Shareholder }],
  });

  res.status(200).send(data);
};
const regis = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await db.User.findOne({ where: { email: email } });
  if (user) {
    res.status(400).send("This email already used");
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashPassword = bcryptjs.hashSync(password, salt);
    await db.User.create({
      email: email,
      password: hashPassword,
      name: name,
    });
    res.status(200).send("success");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where: { email: email } });
  if (!user) {
    res.status(400).send("user or password wrong");
  } else {
    const isCorrectPassword = bcryptjs.compareSync(password, user.password);
    if (isCorrectPassword) {
      const payload = {
        email: user.email,
      };
      const token = jwt.sign(payload, "NTPQ", { expiresIn: 3600 });
      res
        .status(200)
        .send({ token: token, message: "Login successful", name: user.name });
    } else {
      res.status(400).send("user or password wrong");
    }
  }
};
module.exports = {
  getAll,
  regis,
  login,
};
