const express = require('express');

const { helloService } = require('../dependency');
const { HelloController } = require('../controllers');

const helloController = new HelloController(helloService);
const router = express.Router();

router.get('/', helloController.getHello.bind(helloController));

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Demo
 *   description: Demonstrates template features
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns Hello World
 *     description: Hello World.
 *     tags: [Demo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Hello'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
