const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.users
const Order = db.orders

const addUser = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    let info = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: hash
    }
    const user = await User.create(info)
    res.status(200).send(user)
}

const logUser = async (req, res) => {
    let email = req.body.email
    let userMatch = await User.findOne({ where: { email: email } })
    let passwordMatch = await bcrypt.compare(req.body.password, userMatch.password)
    console.log("User Match:", passwordMatch)
    let userJwt = null
    let id = userMatch.id
    if (passwordMatch) {
         userJwt = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300
      });
    }
    res.status(200).send({ auth: passwordMatch, token: userJwt })
}

const getUser = async (req, res) => {
    let id = req.params.id
    let user = await User.findOne({ where: { id: id } })
    res.status(200).send(user)
}

const editUser = async (req, res) => {
    let id = req.params.id
    const user = await User.update(req.body, { where: { id: id } })
    res.status(200).send(user)
}

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id
        const user = await User.findByPk(id, {
            include: [{
                model: Order,
                as: 'orders'
            }]
        })
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado' })
        }
        if (user.orders && user.orders.length > 0) {
            for (const order of user.orders) {
                await order.destroy()
            }
        }
        await user.destroy()
        res.status(200).send({ message: 'Usuário e pedidos associados deletados com sucesso' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao deletar usuário', error: error.message })
    }
}

const getUserOrders = async (req, res) => {
    const data = await User.findAll({
        include: [{
            model: Order,
            as: 'orders'
        }],
        where: { id: req.params.id }
    })
    res.status(200).send(data)
}

module.exports = {
    addUser,
    logUser,
    getUser,
    editUser,
    deleteUser,
    getUserOrders
}