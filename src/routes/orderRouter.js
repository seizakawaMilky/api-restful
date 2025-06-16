const express = require('express')
const orderController = require('../controllers/orderController.js')
const authenticateToken = require ('../middlewares/authConfig.js');

const router = require('express').Router()

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Rotas de pedidos
 */

/**
 * @swagger
 * /api/orders/addOrder:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_product:
 *                       type: integer
 *                       example: 2
 *                     quant:
 *                       type: integer
 *                       example: 3
 *     responses:
 *       200:
 *         description: Pedido criado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.post('/addOrder', authenticateToken.verifyJWT, orderController.addOrder)

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Procura um pedido usando ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/:id', orderController.getOrder)

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancela um pedido usando ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pedido não encontrado
 */
router.delete('/:id', orderController.cancelOrder)

module.exports = router