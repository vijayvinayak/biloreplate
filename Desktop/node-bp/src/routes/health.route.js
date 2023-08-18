const express = require('express');

const { HealthController } = require('../controllers');

const healthController = new HealthController();
const router = express.Router();

router.get('/health', healthController.health.bind(healthController));
router.get('/version', healthController.version.bind(healthController));

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Unprotected
 *   description: Check health endpoint
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check health endpoint
 *     description: Check health endpoint.
 *     tags: [Unprotected]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                   example: 21.000001
 *                 message:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: integer
 *                   example: 1643276000000
 */
