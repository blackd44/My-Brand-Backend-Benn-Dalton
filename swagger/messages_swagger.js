/**
 * 
 * @swagger
 * /api/messages:
 *    get:
 *       tags:
 *         - Messages
 *       description: Get all messages
 *       summary: Get all messages
 *       operationId: getMessages
 *       responses:
 *         '200':
 *           description: successful operation
 *         '204':
 *           description: No messages found
 *         '500':
 *           description: Internal server error
 * 
 *    post:
 *       tags:
 *         - Messages
 *       description: send a new message
 *       summary: send a new message
 *       consumes:
 *         - application/json
 *       required:
 *         - email
 *         - content
 *       parameters:
 *         - in: body
 *           name: Message
 *           description: Message to send
 *           schema:
 *              type: object
 *              properties:
 *                email:
 *                   type: string
 *                   example: test@email.com
 *                content:
 *                   type: string
 *                   example: this is testing of the content
 *       responses:
 *         '201':
 *           description: successful operation
 *         '422':
 *           description: Unprocessable Entities
 *         '500':
 *           description: Internal server error
 *      
 */