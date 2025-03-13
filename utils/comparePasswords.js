const bcrypt = require('bcryptjs');

const comparePasswords = async (enteredPassword, storedHashedPassword) => {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
};

module.exports = comparePasswords;