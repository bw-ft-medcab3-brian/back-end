const router = require("express").Router();
const fetch = require("node-fetch");

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
            console.log(users)
            res.json(users);
        })
        .catch(err => res.status(404).json({err}));
});

router.get("/all-strains", (req, res) => {
    fetch("https://medcab-3.herokuapp.com/strains.json")
        .then(async response => {
            // console.log(await response.json())
            res.json(await response.json())
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: error })
        })
})

router.get("/strains", (req, res) => {
    return (res.status(200).json(dummy))
});

router.get("/:id/fav-reviews", validateUserId, (req, res) => {
    const { id } = req.params;

    Users.findReview(id)
    .then(review => {
        if (review.length) {
            res.json(review)
        } else {
            res.status(404).json({ message: "can not find reviews for user" });
        }
    })    
})

router.post("/:id/fav-reviews", validateUserId, (req, res) => {
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
        .catch(error => {
            console.log(error);
            res.status(500).json({error})
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Failed to create new review" });
    })
});

router.put("/:id/fav-reviews/:reviewid", validateUserId, (req, res) => {
    const id = req.params.id;
    const reviewId = req.params.reviewid;
    const changes = req.body;
    console.log('id', id, 'reviewId', reviewId);

    Users.findReview(id)
    .then(review => {
        if (review.length) {
            Users.updateReview(changes, reviewId)
            .then(updated => {
                console.log('updated', updated)
                res.status(200).json(updated.changes)
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "failed to update post" })
            })
        } else {
            res.status(404).json({ message: "Could not find reviews for given user" })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: "failed to retrieve reviews" });
    })
})

router.delete("/:id/fav-reviews/:reviewid", validateUserId, (req, res) => {
    const id = req.params.id;
    const reviewId = req.params.reviewid;
    console.log('id', id, 'reviewId', reviewId);

    Users.findReview(id)
        .then(review => {
            if (review.length) {
                Users.deleteReview(reviewId)
                    .then(count => {
                        res.status(200).json(count);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ error: "failed to delete the user's post" });
                    });
            } else {
                res.status(404).json({ message: 'Could not find reviews for given user' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Failed to get the review' });
        });
})

function validateUserId(req, res, next) {
    const { id } = req.params;

    Users.findById(id)
    .then(user => {
        next()
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error });
    })
}

module.exports = router;
