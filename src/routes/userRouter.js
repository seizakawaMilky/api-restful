const express = require('express')
const userController = require('../controllers/userController.js')

const router = require('express').Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas de usuários
 */

/**
 * @swagger
 * /api/users/addUser:
 *   post:
 *     summary: Cadastra um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jonas
 *               email:
 *                 type: string
 *                 example: jonas@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.post('/addUser', userController.addUser)

/**
 * @swagger
 * /api/users/logUser:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: jonas@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 */
router.post('/logUser', userController.logUser)

/**
 * @swagger
 * /api/users/getUserOrders/{id}:
 *   get:
 *     summary: Procura os pedidos de um usuário usando ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de pedidos do usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/getUserOrders/:id', userController.getUserOrders)

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Mostra um usuário usando ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', userController.getUser)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Altera um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jonas Carvalho
 *               email:
 *                 type: string
 *                 example: jonasnovo@gmail.com
 *               password:
 *                 type: string
 *                 example: 654321
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', userController.editUser)

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário usando ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', userController.deleteUser)

module.exports = router