const db = require("../models");
const getAllStock = async (req, res) => {
  const allStock = await db.Stock.findAll();
  res.status(200).send(allStock);
};
const createStock = async (req, res) => {
  const { code, name, market, industry } = req.body;
  const newStock = await db.Stock.create({
    code: code,
    name: name,
    market: market,
    industry: industry,
  });
  res.status(201).send(newStock);
};

const createShareholderInStock = async (req, res) => {
  const { stockID, shareholderID, share, percent_c } = req.body;
  // console.log(shareholderID, stockID, share, percent_c);
  const newShareholderInStock = await db.ShareholderHasStock.create({
    share: share,
    percent_c: parseFloat(percent_c),
    shareholder_id: shareholderID,
    stock_id: stockID,
  }).catch(async (error) => {
    // console.log(error);
    if (error.original.code == "ER_DUP_ENTRY") {
      const oldData = await db.ShareholderHasStock.findOne({
        where: {
          shareholder_id: shareholderID,
          stock_id: stockID,
        },
      });
      let newData = await oldData.increment({
        share: share,
        percent_c: parseFloat(percent_c),
      });
      res.status(201).send(newData);
      // console.log(newData);
      // process.exit();
    }
    // process.exit();
  });
  res.status(201).send(newShareholderInStock);
};
const getStockById = async (req, res) => {
  const { id } = req.body;
  const stock = await db.Stock.findOne({ where: { id: id } });
  res.status(200).send(stock);
};
const getStockByCode = async (req, res) => {
  const { code } = req.body;
  const stock = await db.Stock.findOne({ where: { code: code } });
  res.status(200).send(stock);
};
module.exports = {
  getAllStock,
  createStock,
  createShareholderInStock,
  getStockById,
  getStockByCode,
};
