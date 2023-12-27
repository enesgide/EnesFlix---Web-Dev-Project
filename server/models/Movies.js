module.exports = (sequelize, DataTypes) => {

    const Movie = sequelize.define("Movie", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        trailer: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    Movie.associate = (models) => {
        Movie.belongsToMany(models.Category, { through: 'MovieCategory' });
        Movie.belongsToMany(models.User, { through: 'WatchList' });
    };

    return Movie;
};