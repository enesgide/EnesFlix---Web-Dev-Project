module.exports = (sequelize, DataTypes) => {

    const Movies = sequelize.define("Movies", {
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
    });

    Movies.associate = (models) => {
        Movies.belongsToMany(models.Users, { through: 'WatchList' });
    };

    return Movies;
};