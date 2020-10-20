module.exports = (sequelize, dataType) => {
  const model = sequelize.define(
    "User",
    {
      email: {
        type: dataType.STRING,
        unique: true,
      },
      password: {
        type: dataType.STRING,
      },
      name: {
        type: dataType.STRING,
      },
    },
    { timestamps: false }
  );
  return model;
};
