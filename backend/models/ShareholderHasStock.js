module.exports = (sequelize, dataType) => {
  const model = sequelize.define(
    "ShareholderHasStock",
    {
      share: { type: dataType.DOUBLE },
      percent_c: { type: dataType.FLOAT },
    },
    {
      timestamps: false,
    }
  );
  model.associate = (models) => {
    model.hasMany(models.Shareholder, { foreignKey: "id" });
    model.hasMany(models.Stock, { foreignKey: "id" });
  };
  return model;
};
