const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const createShareholder = async (req, res) => {
  const { name } = req.body;
  const newShareholder = await db.Shareholder.create({
    name: name,
  }).catch((error) => console.log(error));
  res.status(201).send(newShareholder);
};
const getShareholderByName = async (req, res) => {
  const { name } = req.body;
  const shareholder = await db.Shareholder.findOne({ where: { name: name } });
  res.status(200).send(shareholder);
};
const searchName = async (req, res) => {
  const { name } = req.body;
  const shareholder = await db.Shareholder.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
  });
  res.status(200).send(shareholder);
};
module.exports = {
  createShareholder,
  getShareholderByName,
  searchName,
};
