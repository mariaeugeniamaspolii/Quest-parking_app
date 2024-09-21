/**
 * @swagger
 * components:
 *   schemas:
 *     UserModel:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         username:
 *           type: string
 *           description: Unique per user
 *         email:
 *           type: string
 *           description: Unique email per user
 *         password:
 *           type: string
 *           description: Password for user
 *         additionalInfo:
 *           type: object
 *           description: Available object to save any data
 *       example:
 *         id: 5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b
 *         name: John Doe
 *         username: johndoe
 *         email: johndoe@mail.com
 *         password: "123456"
 *         additionalInfo: { address: "Fake street 1234" }
 *     UserSignUpBody:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         username:
 *           type: string
 *           description: Unique per user
 *         email:
 *           type: string
 *           description: Unique email per user
 *         password:
 *           type: string
 *           description: Password for user
 *         additionalInfo:
 *           type: object
 *           description: Available object to save any data
 *       example:
 *         name: John Doe
 *         username: johndoe
 *         email: johndoe@mail.com
 *         password: "123456"
 *         additionalInfo: { address: "Fake street 1234" }
 *     UserSignInBody:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Unique per user
 *         email:
 *           type: string
 *           description: Unique email per user
 *         password:
 *           type: string
 *           description: Password for user
 *       example:
 *         email: johndoe@mail.com
 *         password: "123456"
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: Name of the user
 *         username:
 *           type: string
 *           description: Unique per user
 *         email:
 *           type: string
 *           description: Unique email per user
 *         additionalInfo:
 *           type: object
 *           description: Available object to save any data
 *       example:
 *         id: 5be8:dde9:7f0b:d5a7:bd01:b3be:9c69:573b
 *         name: John Doe
 *         username: johndoe
 *         email: johndoe@mail.com
 *         additionalInfo: { address: "Fake street 1234" }
 *     UserUpdateBody:
 *       type: object
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         password:
 *           type: string
 *           description: Password for user
 *         additionalInfo:
 *           type: object
 *           description: Available object to save any data
 *       example:
 *         name: John Moe
 *         additionalInfo: { address: "Other street 1234" }
 *     UserDeleteBody:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           description: Password for user
 *       example:
 *         password: "123456"
 */
