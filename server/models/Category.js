module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    Category.associate = (models) => {
        Category.belongsToMany(models.Movie, { through: 'MovieCategory' });
    };

    return Category;
};