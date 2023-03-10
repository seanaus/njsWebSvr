INSTALL
npm install express
npm install serve-favicon
npm install material-icons@latest
npm install @fontsource/material-icons
npm install express-handlebars --save
npm install dotenv
npm install -g nodemon
npm install bcrypt
npm init (Creates Package.json) add in "start": "nodemon app.js" 
npm install method-override (ensure post etc work)
npm i jsonwebtoken
npm install cookie-parser

***************************************************************************************************************************************
** TO CREATE JSON WEB TOKEN SECRET KEYS **
***************************************************************************************************************************************
** Type 'node' in terminal to get the $node terminal and execute the below code twice to generate the 2 secret keys. **
>> require('crypto').randomBytes(64).toString('hex')
>> Add resulting keys to .env cofig file.
********************************************************* EXAMPLE *********************************************************************
ACCESS_TOKEN_SECRET = d603e5c17377687c8d12fb130258c14df301fffbd466140c0e165ec994e4b9f343202bc68a922f815df27876b542d8b4578dfd2c55b3e8fed405dab1984041b5
REFRESH_TOKEN_SECRET = 41f990fa73c74624cab1299f6ebf915d69b52f5c039a244d29f74327c11bbe2d82b4fbcf8bf5d637cdc9f7ec44683afaabf4550756ee9d1142db1fa9cecb5af6
***************************************************************************************************************************************

** TO RUN **
node app.js || npm start if added to package.json for scripts - "start": "nodemon app.js" (npm install nodemon)

***************************************************************************************************************************************
*                                                                                                                                     *
*                                                                                                                                     *
***************************************************************************************************************************************
admin user = admin01@googlemail.com
admin password = Aus25031549
bcrypt - site to encrypt passwords (for testing purposes)
https://www.browserling.com/tools/bcrypt

GET END POINTS:
** Select Users **
http://localhost:8080/users
** Select User **
http://localhost:8080/user/gBsjs6d8SnOJScqU58d5Py5DXwC2


POST END POINTS:
****************************************************
**             IN POSTMAN FOR FORMS               **
****************************************************
**                  SELECT POST                   **
**                     BODY                       **
**                     RAW                        **
**                     JSON   (IMPORTANT!!)       **
****************************************************
* JSON STRING MUST START WITH '{' AND END WITH '}' *
****************************************************


** Register new User **
http://localhost:8080/register
{
    "forename" : "Dave",
    "surname" : "Jones",
    "email" : "webaddress02@googlemail.com",
    "password" : "p9nMuuwHFAwk23B8dsOPeDfDDaIuYQK",
    "salt" : "$2a$10$.w2JLSmTZNQFMPykVvqeIe"
}
** Sign In With existing User **
http://localhost:8080/signIn
{
    "email" : "webaddress02@googlemail.com",
    "password" : "$2a$10$.w2JLSmTZNQFMPykVvqeIep9nMuuwHFAwk23B8dsOPeDfDDaIuYQK"
}

**************
** get cart **
**************
http://localhost:8080/cart?id=
Example (http://localhost:8080/cart?id=WamM8j32VjvS4w9GM0KV)

http://localhost:8080/cart?id=&uId=
Example (http://localhost:8080/cart?id=&uId=Jtz6S5EpgZfjdSQaTaWdOs5ELXE2)

http://localhost:8080/cart?id=&uId=&appId=
Example (http://localhost:8080/cart?id=&uId=Jtz6S5EpgZfjdSQaTaWdOs5ELXE2&appId=APPID01)

************************************
** Update cart with delivery Info **
************************************
http://localhost:8080/editCart/deliveryDetails/
Example (http://localhost:8080/editCart/deliveryDetails/CQmv2poW1GE9Pw15NKOm)
{
    "deliveryInfo" : {
        "forename" : "Sean",
        "surname" : "Austin",
        "address1" : "17 Dawn Ave",
        "address2" : "High Lane",
        "town" : "Burslem",
        "city" : "Stoke On Trent",
        "county" : "Staffordshire",
        "postcode" : "ST67JS",
        "email" : "webaddress01@googlemail.com",
        "telephone" : "01782660675",
        "shippingOption" : "0"
    }
}

************************************
** Update cart with payment Info **
************************************
http://localhost:8080/editCart/paymentDetails/
Example (http://localhost:8080/editCart/paymentDetails/CQmv2poW1GE9Pw15NKOm)
{
	"paymentInfo" :  {
		"cardNo" : "1234123412341234",
		"nameOnCard" : "Mr S Austin",
		"csv" : "349",
		"expiryDate" : "05/11/2029",
		"completed" : "21/01/2023"
	}
}

*****************
** add to cart **
*****************
http://localhost:8080/addCartItem/:cartId/:productId
Examples
    ** Add Item01 **
    http://localhost:8080/addCartItem/WamM8j32VjvS4w9GM0KV/57eY6zpRLJIrRYir1h33

    ** Add Item02 **
    http://localhost:8080/addCartItem/WamM8j32VjvS4w9GM0KV/99JiazVXiPqn6GOBdZRh

*******************
** del from cart **
*******************
http://localhost:8080/delCartItem/:cartId/:productId
Example
    ** Remove Item01 **
    http://localhost:8080/delCartItem/WamM8j32VjvS4w9GM0KV/57eY6zpRLJIrRYir1h33

    ** Remove Item02 **
    http://localhost:8080/delCartItem/WamM8j32VjvS4w9GM0KV/99JiazVXiPqn6GOBdZRh





