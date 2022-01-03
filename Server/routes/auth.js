const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'tes+^%+^&+%/ta^+sda%^sd&&%68adasdad_131ı4u3128++!as28+%dsa%+dasd';

router.get('/', function (req, res, next) {
    res.send('auth test');
});

router.post('/login', async function(req, res, next) {
    const { email, password } = req.body;
	const user = await User.findOne({ email }).lean()

    if (!(user && password && email)) {
        return res.json({ status: 'error', error: 'Invalid email/password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the email, password combination is successful

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            JWT_SECRET
        )

        return res.json({ status: 'ok', data: token });
    }

    res.json({ status: 'error', error: 'Invalid email/password' });
});

router.post('/register', function (req, res, next) {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.json({ error: 'Bilgileri Girmelisiniz.' });
    }

    try {
        bcrypt.hash(req.body.password, 10, (error, result) => {
            const user = new User({
                email: email,
                password: result
            });

            user.save((err, data) => {
                if (err)
                    res.json(err);

                res.json({ status: 'ok' });
            });
        });
    }
    catch (error) {
        res.json({ error: error });
    }
});


module.exports = router;

