const router = require("express").Router();

const Users = require("./user-model.js");
const dummy = [
    {
        id: 1,
        strain_description: "",
        strain_flavor_profile: "",
        strain_image: "",
        strain_name: "13 Dawgs",
        strain_nearest_neighbors: "",
        strain_relief_profile: "",
        strain_review_key: "",
        strain_terpene_profile: "",
        strain_type: ""
    },
    {
        id: 2,
        strain_description: "",
        strain_flavor_profile: "",
        strain_image: "",
        strain_name: "91 Krypt",
        strain_nearest_neighbors: "",
        strain_relief_profile: "",
        strain_review_key: "",
        strain_terpene_profile: "",
        strain_type: ""
    },
    {
        id: 3,
        strain_description: "",
        strain_flavor_profile: "",
        strain_image: "",
        strain_name: "White Widow",
        strain_nearest_neighbors: "",
        strain_relief_profile: "",
        strain_review_key: "",
        strain_terpene_profile: "",
        strain_type: "Hybrid"
    },
    {
        id: 4,
        strain_description: "",
        strain_flavor_profile: "",
        strain_image: "",
        strain_name: "OG Kush",
        strain_nearest_neighbors: "",
        strain_relief_profile: "",
        strain_review_key: "",
        strain_terpene_profile: "",
        strain_type: ""
    }
];

router.get("/", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        console.log(Users)
        .catch(err => res.send(err));
});

router.get("/strains", (req, res) => {
    return (res.status(200).json(dummy))
});

router.post("/:id/fav-reviews", (req, res) => {
    const reviewData = req.body;
    const { id } = req.params;
    reviewData.user_id = id;
    console.log(reviewData);
    
    Users.findById(id)
    .then(user => {
        Users.addReview(reviewData, id)
        .then(review => {
            console.log("review", review, user)
            res.status(201).json(user.review)
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Failed to create new review" });
    })
})

module.exports = router;
