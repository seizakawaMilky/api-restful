const db = require('../models');

const Product = db.products
const Category = db.categories;
const Order = db.orders;

const addProduct = async (req, res) => {
    let info = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        categoryId: req.body.categoryId
    }

    const product = await Product.create(info)
    res.status(200).send(product)
}

const getAllProducts = async (req, res) => {
    let products = await Product.findAll({})
    res.status(200).send(products)
}

const getSingleProduct = async (req, res) => {
    let id = req.params.id
    let product = await Product.findOne({ where: { id: id } })
    res.status(200).send(product)
}

const updateProduct = async (req, res) => {
    let id = req.params.id
    const product = await Product.update(req.body, { where: { id: id } })
    res.status(200).send(product)
}

const deleteProduct = async (req, res) => {
    let id = req.params.id
    await Product.destroy({ where: { id: id } })
    res.status(200).send('Produto deletado')
}

module.exports = {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}