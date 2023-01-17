/**
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
 *           description: No message found
 *         '500':
 *           description: Internal server error
 * 
 *    post:
 *       tags:
 *         - Messages
 *       description: send a new message
 *       summary: send a new message
 *       requestBody:
 *         description: new message here
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                    - email
 *                    - content
 *                 properties:
 *                    email:
 *                      type: string
 *                      example: test@email.com
 *                    content:
 *                      type: string
 *                      example: this is testing of the content
 *       responses:
 *         '201':
 *           description: successful operation
 *         '422':
 *           description: Unprocessable Entities
 *         '500':
 *           description: Internal server error
 *      
 */

/**
 * @swagger
 * /api/messages/{id}:
 *    get:
 *       tags:
 *          - Messages
 *       description: Get all messages
 *       summary: Get all messages
 *       operationId: getOneMessage
 *       parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: get ID for the message
 *          schema:
 *              type: string
 *              format: objectId
 *       responses:
 *          '200':
 *              description: successful operation
 *          '204':
 *              description: message not found
 *          '500':
 *              description: Internal server error
 * 
 *    patch:
 *       tags:
 *         - Messages
 *       description: Update a new message
 *       summary: Update a new message
 *       parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: get ID for the message
 *          schema:
 *              type: string
 *              format: objectId
 *       requestBody:
 *          description: Updates for message
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          content:
 *                              type: string
 *                              example: updated test message
 *       responses:
 *         '200':
 *           description: successful operation
 *         '204':
 *           description: Message nots found
 *         '500':
 *           description: Internal server error
 *    delete:
 *       tags:
 *          - Messages
 *       description: Delete a messages
 *       summary: Delete a messages
 *       operationId: deleteOneMessage
 *       parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: get ID for the message
 *          schema:
 *              type: string
 *              format: objectId
 *       responses:
 *          '202':
 *              description: successful operation
 *          '204':
 *              description: message not found
 *          '500':
 *              description: Internal server error
 */