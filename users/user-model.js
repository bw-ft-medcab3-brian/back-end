const db = require("../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    addReview,
    findReview,
    updateReview,
    deleteReview
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

function findReview(id) {
    return db("reviews")
    .join("users", "users.id", "reviews.user_id")
    .select("reviews.*")
    .where("user_id", id);
}

function addReview(review) {
    return db("reviews")
    .join("users", "users.id", "reviews.user_id")
    .insert(review, "id");
}

function updateReview(changes, id) {
    return db("reviews")
    .where({ id })
    .update(changes);
}

function deleteReview(id) {
    return db("reviews")
    .where({ id })
    .del();
}

function findById(id) {
    return db("users").where({ id }).first();
}
