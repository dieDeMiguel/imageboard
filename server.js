const express = require("express");
const app = express();
const path = require("path");
const { uploader } = require("./upload");
const {
    getImages,
    createImage,
    getImageByID,
    addCommentToImage,
    getCommentsByImageId,
    deleteImageById,
    deleteCommentByImageId,
} = require("./db");
app.use(express.urlencoded({ extended: false }));
const { s3upload, getURLFromFilename } = require("./s3");
// const { Bucket } = require("./config.json");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/images", (request, response) => {
    getImages({
        last_id: request.query.last_id,
        limit: request.query.limit,
    })
        .then((images) => {
            response.json(images);
        })
        .catch((error) => {
            console.log("Error getting images", error);
            response.sendStatus(500);
        });
});

app.get("/images/:id", (request, response) => {
    const _id = request.params.id;
    getImageByID(_id)
        .then((result) => {
            response.json(result);
        })
        .catch((error) =>
            response.status(500).send("error getting the image by id: ", error)
        );
});

app.post("/images", uploader.single("file"), s3upload, (request, response) => {
    const url = getURLFromFilename(request.file.filename, Bucket);
    createImage({ url, ...request.body })
        .then((image) => response.json(image))
        .catch((error) => {
            console.log("Imageboard error saving Image: ", error);
            response.sendStatus(500);
        });
});

app.get("/images/:image_id/comments", (request, response) => {
    const image_id = request.params.image_id;
    getCommentsByImageId(image_id)
        .then((results) => {
            return response.json(results);
        })
        .catch((error) => {
            console.log("Error getting image comments: ", error);
            response.sendStatus(500);
        });
});

app.post("/images/:image_id/comments", (request, response) => {
    addCommentToImage({ ...request.body })
        .then((comment) => {
            response.json(comment);
        })
        .catch((error) => {
            console.log("Error while adding comment to image: ", error);
            response.sendStatus(500);
        });
});

app.delete("/images/:id", (request, response) => {
    const _id = request.params.id;
    Promise.all([deleteCommentByImageId(_id), deleteImageById(_id)])
        .then((results) => {
            console.log("results of deleting image with id: ", results);
            return response.json(results);
        })
        .catch((error) => {
            response.status(500).send("Error while delelting image: ", error);
        });
});

app.listen(process.env.PORT || 8080, () => {
    console.log("imageboard project up and running");
});
