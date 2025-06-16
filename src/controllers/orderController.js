const db = require('../models')

const Product = db.products
const Order = db.orders
const User = db.users

const addOrder = async (req, res) => {
    try {
        const { userId, productIds } = req.body
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' })
        }
        const order = await user.createOrder({})
        if (productIds && productIds.length > 0) {
            const products = await Product.findAll({
                where: {
                    id: productIds
                }
            })

            if (products.length !== productIds.length) {
                return res.status(400).send({ message: 'Um ou mais produtos não encontrados' })
            }

            await order.addProducts(products)
        }
        res.status(200).send(order)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao criar pedido', error: error.message })
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.id },
            include: [{
                model: Product,
                as: 'products',
                through: { attributes: [] }
            }]
        })
        if (!order) return res.status(404).send({ message: "Pedido não encontrado" })
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({ error: "Erro ao buscar pedido", details: err.message });
    }
}

const cancelOrder = async (req, res) => {
    let id = req.params.id
    await Order.destroy({ where: { id: id } })
    res.status(200).send('Pedido cancelado')
}

module.exports = {
    addOrder,
    getOrder,
    cancelOrder
}