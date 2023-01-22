
/**
 * @swagger
 * /api/users/signup:
 *    post:
 *       tags:
 *         - users
 *       description: send a new message
 *       summary: send a new message
 *       operationId: signup
 *       requestBody:
 *         description: new user information
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                    - username
 *                    - email
 *                    - password
 *                 properties:
 *                    username:
 *                      type: string
 *                      example: test3
 *                    email:
 *                      type: string
 *                      example: test3@email.com
 *                    password:
 *                      type: string
 *                      example: Benn@123
 *       responses:
 *         '200':
 *           description: successful operation
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 */

/**
 * @swagger
 * /api/users/login:
 *    post:
 *       tags:
 *         - users
 *       description: log into your account
 *       summary: log into your account
 *       operationId: login
 *       requestBody:
 *         description: user information
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                    - email
 *                    - password
 *                 properties:
 *                    email:
 *                      type: string
 *                      example: test3@email.com
 *                    password:
 *                      type: string
 *                      example: Benn@123
 *       responses:
 *         '200':
 *           description: successful operation
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 */

/**
 * @swagger
 * /api/users/user:
 *    get:
 *       tags:
 *         - users
 *       description: get information of the logged in user
 *       summary: logged user info
 *       operationId: getuser
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
 *         - {}
 *         - bearerAuth: []
 *  
 */

/**
 * @swagger
 * /api/users/{email}:
 *    get:
 *       tags:
 *         - users
 *       description: get information of the user by using email
 *       summary: user info by email
 *       operationId: getuserbyemail
 *       parameters:
 *         - name: email
 *           in: path
 *           required: true
 *           description: email of requested user
 *           schema:
 *              type: string
 *       responses:
 *         '200':
 *           description: successful operation
 *         '204':
 *           description: no content
 *         '500':
 *           description: Internal server error
 *  
 */

/**
 * @swagger
 * /api/users/user:
 *    patch:
 *       tags:
 *         - users
 *       description: change information of the logged in user
 *       summary: change user info
 *       operationId: edituser
 *       requestBody:
 *         description: updated entities
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *       responses:
 *         '202':
 *           description: successful operation
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 *       security:
 *         - {}
 *         - bearerAuth: []
 *  
 */

/**
 * @swagger
 * /api/users/user:
 *    delete:
 *       tags:
 *         - users
 *       description: here the user can terminate his or her account
 *       summary: delete logged user
 *       operationId: deleteuser
 *       requestBody:
 *         description: logged user password
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                    - password
 *                 properties:
 *                    password:
 *                      type: string
 *                      example: Benn@123
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
 *         - {}
 *         - bearerAuth: []
 *  
 */

/**
 * @swagger
 * /api/users/{email}:
 *    delete:
 *       tags:
 *         - users
 *       description: here admins can terminate the account
 *       summary: delete user by using email
 *       operationId: deleteuserbyemail
 *       parameters:
 *         - name: email
 *           in: path
 *           required: true
 *           description: email of requested user
 *           schema:
 *              type: string
 *       requestBody:
 *         description: logged user password
 *         content:
 *           application/json:
 *              schema:
 *                 type: object
 *                 required:
 *                    - password
 *                 properties:
 *                    password:
 *                      type: string
 *                      example: Benn@123
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
 *         - {}
 *         - bearerAuth: []
 *  
 */
