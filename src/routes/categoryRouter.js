const express = require('express')
const categoryController = require('../controllers/categoryController.js')

const router = require('express').Router()

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Rotas de categorias
 */

/**
 * @swagger
 * /api/categories/addCategory:
 *   post:
 *     summary: Adiciona uma categoria nova
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Frutas
 *     responses:
 *       200:
 *         description: Categoria criada com sucesso
 *       500:
 *         description: Erro ao criar categoria
 */
router.post('/addCategory', categoryController.addCategory)

/**
 * @swagger
 * /api/categories/AllCategories:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *       500:
 *         description: Erro ao buscar categorias
 */
router.get('/allCategories', categoryController.getAllCategories)

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Altera uma categoria usando ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Legumes
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.put('/:id', categoryController.updateCategory)

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Deleta uma categoria usando ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
router.delete('/:id', categoryController.deleteCategory)

/**
 * @swagger
 * /api/categories/getCategoryProducts/{id}:
 *   get:
 *     summary: Procura os produtos de uma categoria usando ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/getCategoryProducts/:id', categoryController.getCategoryProducts)

module.exports = router