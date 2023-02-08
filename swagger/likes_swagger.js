/**
 * @swagger
 * /api/likes/blogs/{blogId}:
 *    post:
 *       tags:
 *          - likes
 *          - blogs
 *       description: this route will like or unlike the blog if the you fetch on it with the token of the user
 *       summary: like/unlike blog
 *       operationId: likeBlog
 *       parameters:
 *          - name: blogId
 *            in: path
 *            required: true
 *            description: ID for the blog to be liked/unliked
 *            schema:
 *               type: string
 *               format: objectId
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400':
 *           description: bad request may be in the blog id
 *         '500':
 *           description: Internal server error
 *       security:
 *         - []
 *         - bearerAuth: []
 * 
 * @swagger
 * /api/likes/comments/{commentId}:
 *    post:
 *       tags:
 *          - likes
 *          - comments
 *       description: this route will like or unlike the comment if the you fetch on it with the token of the user
 *       summary: like/unlike comment
 *       operationId: likeComments
 *       parameters:
 *          - name: commentId
 *            in: path
 *            required: true
 *            description: ID for the comment to be liked/unliked
 *            schema:
 *               type: string
 *               format: objectId
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400':
 *           description: bad request may be in the comment id
 *         '500':
 *           description: Internal server error
 *       security:
 *         - []
 *         - bearerAuth: []
 * 
 */