const bcrypt = require('bcrypt');


const originalPassword = 'password123';


bcrypt.hash(originalPassword, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }
    console.log('original password:', originalPassword)
    console.log('Hashed password:', hashedPassword);

    const loginAttempt = 'password123';

    bcrypt.compare(loginAttempt, hashedPassword, (err, result) => {
        if (err) {
            console.error('Error comparing passwords:', err);
            return;
        }

        if (result) {
            console.log('Password is correct.');
        } else {
            console.log('Password is incorrect.');
        }
    });
});
