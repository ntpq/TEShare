module.exports = (sequelize, dataType) => {
  const model = sequelize.define(
    "Shareholder",
    {
      name: { type: dataType.STRING, unique: true },
    },
    {
      timestamps: false,
    }
  );
  model.associate = (models) => {
    model.belongsToMany(models.Stock, {
      through: models.ShareholderHasStock,
      foreignKey: "shareholder_id",
    });
  };
  return model;
};
