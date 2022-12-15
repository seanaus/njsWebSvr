const bcrypt = require("bcrypt");

const compare = async (raw, encrypted) => {
    try {
        if (await bcrypt.compare(raw, encrypted)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};
const hash = async (password, salt = undefined) => {
    try {
        if (salt === undefined) {
            salt = await genSalt();  
        }
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
        return false;
    }
};
const genSalt = async (saltRounds = 10) => {
    try {
        return await bcrypt.genSalt(saltRounds);
    } catch (error) {
        console.log(error);
        return false;
    }
};
module.exports = {
    compare,
    genSalt,
    hash
}