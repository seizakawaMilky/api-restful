module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define("order_products", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    })

    return OrderProduct
}