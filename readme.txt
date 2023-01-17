INSTALL
npm install express
npm install ejs 
npm install dotenv
npm install -g nodemon
npm install bcrypt
npm init (Creates Package.json) add in "start": "nodemon app.js" 
npm install method-override (ensure post etc work)

TO RUN
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
** Register new User **
http://localhost:8080/register
{
    "forename" : "Sean",
    "surname" : "Austin",
    "email" : "webaddress2@googlemail.com",
    "password" : "Aus25031549"
}
** Sign In With existing User **
http://localhost:8080/signIn/option (firebase || google, currenty only the 'firebase' option works, http://localhost:8080/signIn/firebase)
{
    "email" : "webaddress01@googlemail.com",
    "password" : "Aus25031549"
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

*****************
** add to cart **
*****************
http://localhost:8080/cart-add/:cartId/:productId
Examples
    ** Add Item01 **
    http://localhost:8080/cart-add/WamM8j32VjvS4w9GM0KV/57eY6zpRLJIrRYir1h33

    ** Add Item02 **
    http://localhost:8080/cart-add/WamM8j32VjvS4w9GM0KV/99JiazVXiPqn6GOBdZRh

*******************
** del from cart **
*******************
http://localhost:8080/cart-remove/:cartId/:productId
Example
    ** Remove Item01 **
    http://localhost:8080/cart-remove/WamM8j32VjvS4w9GM0KV/57eY6zpRLJIrRYir1h33

    ** Remove Item02 **
    http://localhost:8080/cart-remove/WamM8j32VjvS4w9GM0KV/99JiazVXiPqn6GOBdZRh
"





