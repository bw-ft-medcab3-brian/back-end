const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/user-model.js");
const secrets = require("../api/secrets.js");

router.post("/register", (req, res) => {
    let user = req.body;
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

        Users.add(user)
            .then(reg => {
                const token = generateToken(user);
                res.status(201).json({ ...reg, token });
            })
            .catch(error => {
                console.log(error, "whats goin on");
                res.status(500).json({ errorMessage: error.message, user: user });
            })
});

router.post("/login", (req, res) => {
    let { email, password } = req.body;

    Users.findBy({ email })
        .then(([user]) => {
            console.log(user);
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: "Welcome back!", token, user });
            } else {
                res.status(401).json({ message: "Username or password incorrect" })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "You shall not pass!" })
        })
});

router.get("/landing", (req, res) => {
    return (res.status(200).json(display))
});

function generateToken(user) {
    // the data
    const payload = {
        userId: user.id,
        email: user.email,
    };
    const secret = secrets.jwtSecret;
    const options = {
        expiresIn: "1d",
    };

    return jwt.sign(payload, secret, options);
}

const display = [
    {
        strain_name: "OG Kush",
        strain_type: "Hybrid",
        description: "OG Kush is a balanced hybrid strain that has a slight favor to the sativa characteristics. It comes from the parent cannabis strain Hindu Kush. Since its cultivation in the early 90's, OG Kush has since become a worldwide staple in the cannabis community."
    },
    {
        strain_name: "Blue Hawaiian",
        strain_type: "Sativa",
        description: "Known for its light green buds covered in rich orange and red hairs, Blue Hawaiian was bred from Blueberry and Hawaiian Sativa. Blue Hawaiian has a delicious aroma that is full of berry, sweet, and earthy scents."
    },
    {
        strain_name: "Brand X",
        strain_type: "Indica",
        description: "Brand X is a timeless strain traced back to Michigan some 5+ decades ago. Also known as The Ostipow Indica, this strain presents an earthy, piney aroma and is known for inducing a heavy full-body relaxation."
    }
]

module.exports = router;