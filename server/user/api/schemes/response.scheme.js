/**
 * @swagger
 * components:
 *   responses:
 *     LoginOk:
 *       type: object
 *       required:
 *         - code
 *         - message
 *         - user
 *       properties:
 *         code:
 *           type: number
 *           description: Code of the response
 *         message:
 *           type: string
 *           description: Message of the response
 *         user:
 *           description: User information
 *           $ref: '#/components/schemas/UserSignUpBody'
 *         token:
 *           type: string
 *           description: Authentication token
 *       example:
 *         code: 200
 *         message: OK
 *         user:
 *           id: 5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b
 *           name: John Doe
 *           username: johndoe
 *           email: johndoe@mail.com
 *           additionalInfo:
 *             address: "Fake street 1234"
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzgwMTk1NzQ4MjUwNzUyIiwiaWF0IjoxNjYzNjQ4MjUwLCJleHAiOjE2NjM2NDY2NTA
 *     OK:
 *       type: object
 *       required:
 *         - code
 *         - message
 *         - user
 *       properties:
 *         code:
 *           type: number
 *           description: Code of the response
 *         message:
 *           type: string
 *           description: Message of the response
 *         user:
 *           description: User information
 *           $ref: '#/components/schemas/UserSignUpBody'
 *       example:
 *         code: 200
 *         message: OK
 *         user:
 *           id: 5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b
 *           name: John Doe
 *           username: johndoe
 *           email: johndoe@mail.com
 *           additionalInfo:
 *             address: "Fake street 1234"
 *     Error:
 *       type: object
 *       required:
 *         - code
 *         - message
 *         - error
 *       properties:
 *         code:
 *           type: number
 *           description: Code of the response
 *         message:
 *           type: string
 *           description: Message of the response
 *         error:
 *           type: string
 *           description: Internal error message
 *       example:
 *         code: 400
 *         message: BAD_REQUEST
 *         error: MISSING_INFO
 */
