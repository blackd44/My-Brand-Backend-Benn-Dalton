/**
 * @swagger
 * /api/blogs/{blogId}/comments/:
 *    get:
 *       tags:
 *          - comments
 *       description: Will return all comments in blog
 *       summary: get all comments
 *       operationId: getComments
 *       parameters:
 *          - name: blogId
 *            in: path
 *            required: true
 *            description: ID for the blog
 *            schema:
 *               type: string
 *               format: objectId
 *       responses:
 *         '200':
 *           description: successful operation
 *         '500':
 *           description: Internal server error
 * 
 *    post:
 *       tags:
 *          - comments
 *       description: post a comment in the blog and Will return that posted comment and all comments in blog
 *       summary: post a comments
 *       operationId: postComments
 *       parameters:
 *          - name: blogId
 *            in: path
 *            required: true
 *            description: ID for the blog
 *            schema:
 *               type: string
 *               format: objectId
 *       requestBody:
 *          description: add the comment message
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: swagger test comment
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400': 
 *           description: bad request
 *         '401':
 *           description: not authorized
 *         '500':
 *           description: Internal server error
 *       security:
 *         - []
 *         - bearerAuth: []
 * 
 * /api/blogs/{commentId}/reply/:
 *    post:
 *       tags:
 *          - comments
 *       description: post a reply in the comment and Will return that posted reply and that replied comment
 *       summary: post a reply
 *       operationId: postComments
 *       parameters:
 *          - name: commentId
 *            in: path
 *            required: true
 *            description: ID for the comment
 *            schema:
 *               type: string
 *               format: objectId
 *       requestBody:
 *          description: add the reply message
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: swagger test comment
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400': 
 *           description: bad request
 *         '401':
 *           description: not authorized
 *         '500':
 *           description: Internal server error
 *       security:
 *         - []
 *         - bearerAuth: []
 * 
 */