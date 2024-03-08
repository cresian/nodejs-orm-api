const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false},
        quantity: { type: DataTypes.INTEGER, allowNull: false},
        image: { type: DataTypes.STRING, allowNull: false}
    };

    const options = {
        defaultScope: {
            // Exclude any sensitive data here if needed
        },
        // Additional scopes can be defined here if needed
    };

    return sequelize.define('Product', attributes, options);
}
