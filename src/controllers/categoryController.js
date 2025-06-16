const db = require('../models')

const Product = db.products
const Category = db.categories

const addCategory = async (req, res) => {
    let info = {
        id: req.body.id,
        name: req.body.name
    }

    const category = await Category.create(info)
    res.status(200).send(category)
}

const getAllCategories = async (req, res) => {
    let categories = await Category.findAll({})
    res.status(200).send(categories)
}

const updateCategory = async (req, res) => {
    let id = req.params.id
    const category = await Category.update(req.body, { where: { id: id } })
    res.status(200).send(category)
}

const deleteCategory = async (req, res) => {
    let id = req.params.id
    const confirm = req.query.confirm === 'true'
    const category = await Category.findByPk(id, {
        include: [{
            model: Product,
            as: 'products'
        }]
    })
    if (!category) {
        return res.status(404).send({ message: 'Categoria não encontrada' });
    }
    if (!confirm) {
        return res.status(200).send({
            message: 'A categoria possui os seguintes produtos e será deletada junto com eles. Confirme a exclusão com ?confirm=true',
            category: {
                id: category.id,
                name: category.name
            },
            products: category.products
        })
    }
    await Product.destroy({ where: { categoryId: id } })
    await Category.destroy({ where: { id: id } })
    res.status(200).send('Categoria e produtos associados deletados com sucesso')
}

const getCategoryProducts = async (req, res) => {
    const data = await Category.findAll({
        include: [{
            model: Product,
            as: 'products'
        }],
        where: { id: req.params.id }
    })
    res.status(200).send(data)
}

module.exports = {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryProducts
}