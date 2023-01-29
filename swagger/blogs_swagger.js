/**
 * @swagger
 * /api/blogs:
 *    get:
 *       tags:
 *          - blogs
 *       description: Will return all blogs in batabase
 *       summary: get all blogs
 *       operationId: getBlogs
 *       responses:
 *         '200':
 *           description: successful operation
 *         '204':
 *           description: No blog found
 *         '500':
 *           description: Internal server error
 *    post:
 *       tags:
 *          - blogs
 *       description: add the blog properties and will return the blog information if successfully posted
 *       summary: post a blogs
 *       operationId: postBlogs
 *       requestBody:
 *          description: add the blog properties
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                          title:
 *                              type: string
 *                              example: swagger blog
 *                          content:
 *                              type: string
 *                              example: swagger test blog
 *              
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 *       security:
 *          - {}
 *          - bearerAuth: []
 * 
 * /api/blogs/{id}:
 *    get:
 *       tags:
 *         - blogs
 *       description: Will return blog in batabase with a specific ID
 *       summary: get blog
 *       operationId: getBlog
 *       parameters: 
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID for the blog
 *           schema:
 *              type: string
 *              format: objectId
 *       responses:
 *         '200':
 *              description: successful operation
 *         '204':
 *              description: No blog found
 *         '500':
 *              description: Internal server error
 * 
 *    patch:
 *       tags:
 *         - blogs
 *       description: Will return blog in batabase with a that is changed
 *       summary: get blog
 *       operationId: updateBlog
 *       parameters: 
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID for the blog
 *           schema:
 *              type: string
 *              format: objectId
 *       requestBody:
 *          description: add the blog properties to be changed
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                          title:
 *                              type: string
 *                          content:
 *                              type: string
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 *       security:
 *          - {}
 *          - bearerAuth: []
 * 
 *    delete:
 *       tags:
 *         - blogs
 *       description: Will return blog in batabase with a specific ID
 *       summary: get blog
 *       operationId: deleteBlog
 *       parameters: 
 *         - name: id
 *           in: path
 *           required: true
 *           description: ID for the blog
 *           schema:
 *              type: string
 *              format: objectId
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 *       security:
 *          - {}
 *          - bearerAuth: []
 * 
 */