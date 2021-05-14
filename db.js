var spicedPg = require("spiced-pg");

const {
    DATABASE_USERNAME,
    DATABSE_PASSWORD,
    DATABASE_NAME,
} = require("./secrets.json");

function getDatabaseURL() {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    return `postgres:${DATABASE_USERNAME}:${DATABSE_PASSWORD}@localhost:5432/${DATABASE_NAME}`;
}

const db = spicedPg(getDatabaseURL());
const DEFAULT_LIMIT = 4;

function getImages({ last_id, limit }) {
    if (last_id) {
        return db
            .query(
                `SELECT * FROM images WHERE id < $1 ORDER BY id desc LIMIT $2`,
                [last_id, limit || DEFAULT_LIMIT]
            )
            .then((results) => results.rows);
    }
    return db
        .query(`SELECT * FROM images ORDER BY id DESC LIMIT $1`, [
            limit || DEFAULT_LIMIT,
        ])
        .then((results) => results.rows);
}

function createImage({ url, username, title, description }) {
    return db
        .query(
            `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) returning *`,
            [url, username, title, description]
        )
        .then((result) => result.rows[0]);
}

function getImageByID(id) {
    return db
        .query(
            `SELECT images.*,
(SELECT MAX(id) FROM images WHERE id < $1) AS prev, (SELECT MIN(id) FROM images WHERE id > $1) AS next FROM images WHERE id = $1;`,
            [id]
        )
        .then((result) => result.rows[0]);
}

function getCommentsByImageId(image_id) {
    return db
        .query(`SELECT * FROM comments WHERE image_id = $1`, [image_id])
        .then((results) => results.rows);
}

function addCommentToImage({ username, image_id, text }) {
    return db
        .query(
            `INSERT INTO comments (username, image_id, text) VALUES ($1, $2, $3) returning *`,
            [username, image_id, text]
        )
        .then((result) => result.rows[0]);
}

function deleteImageById(id) {
    return db
        .query("DELETE FROM images WHERE id = $1 RETURNING id", [id])
        .then((result) => result);
}

function deleteCommentByImageId(id) {
    return db
        .query("DELETE FROM comments WHERE image_id = $1 RETURNING id", [id])
        .then((result) => result);
}

module.exports = {
    getImages,
    createImage,
    getImageByID,
    addCommentToImage,
    getCommentsByImageId,
    deleteCommentByImageId,
    deleteImageById,
};
