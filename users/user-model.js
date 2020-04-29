const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    addReview,
};

function find() {
    return db("users").select("id", "email", "password");
}

function findBy(filter) {
    return db("users").where(filter);
}

async function add(user) {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
}

function addReview(review) {
    return db("reviews")
    .join("users", "users.id", "reviews.user_id")
    .insert(review, "id");
}

function findById(id) {
    return db("users").where({ id }).first();
}
