# JWT Authentication API
A JWT based user registration and authentication system using Node.js and MongoDB

## Installation
Clone this project in local machine and Install dependencies with npm as follows:

```bash
  > git clone https://github.com/awaldeepak/JWTAuthAPI.git
  > cd JWTAuthAPI
  > npm install
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_PORT`

`DEBUG_MODE`

`DB_URL`

`JWT_SECRET`

`REFRESH_SECRET`
## Run Locally
Start the server using command:

```bash
  npm run start
```
## Running Tests on POSTMAN
* API 1 - Register a user
URL – http://localhost:3000/api/register

Method - POST

Description – API to register a user.

For input and output, refer screenshot provided in below path in this repo

test_images/Register.PNG


* API 2 - Login user
URL – http://localhost:3000/api/login

Method - POST

Description – API to Login a user.

For input and output, refer screenshot provided in below path in this repo

test_images/Login.PNG


* API 3 - Refresh token
URL – http://localhost:3000/api/refresh

Method - POST

Description – API to generate a refresh token for security.

For input and output, refer screenshot provided in below path in this repo

test_images/Generate refresh token.PNG


* API 4 - Get user details
URL – http://localhost:3000/api/users/<registered_user_contact>

Method - GET

Description – API to fetch user details.

For input and output, refer screenshot provided in below path in this repo

test_images/User details.PNG


* API 5 - Logout user
URL – http://localhost:3000/api/logout

Method - POST

Description – API to Logout a user.

For input and output, refer screenshot provided in below path in this repo

test_images/Logout.PNG
## Appendix

Thank you for visiting!

  