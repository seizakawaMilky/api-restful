const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('Conectado ao banco de dados')
})
.catch(err => {
    console.log('Erro: ' + err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.categories = require('./categoryModel.js')(sequelize, DataTypes)
db.orders = require('./orderModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('Sincronização completada')
})

db.categories.hasMany(db.products, {
    foreignKey: 'categoryId',
    as: 'products'
})
db.products.belongsTo(db.categories, {
    foreignKey: 'categoryId',
    as: 'category'
})

db.products.belongsToMany(db.orders, {
    through: 'OrderProducts',
    foreignKey: 'productId',
    otherKey: 'orderId',
    onDelete: 'CASCADE'
})
db.orders.belongsToMany(db.products, {
    through: 'OrderProducts',
    foreignKey: 'orderId',
    otherKey: 'productId',
    as: 'products',
    onDelete: 'CASCADE'
})

db.users.hasMany(db.orders, {
    foreignKey: 'userId',
    as: 'orders'
})
db.orders.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user'
})

module.exports = db