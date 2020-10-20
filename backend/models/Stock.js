module.exports = (sequelize, dataType) => {
  const model = sequelize.define(
    "Stock",
    {
      code: {
        type: dataType.STRING,
        unique: true,
      },
      name: {
        type: dataType.STRING,
      },
      market: {
        type: dataType.STRING,
      },
      industry: {
        type: dataType.STRING,
      },
    },
    { timestamps: false }
  );
  model.associate = (models) =>
    model.belongsToMany(models.Shareholder, {
      through: models.ShareholderHasStock,
      foreignKey: "stock_id",
    });
  return model;
};
